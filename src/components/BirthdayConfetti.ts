import { Mount, Subscription, UiSchema } from "@effect/ui";
import { Html } from "@effect/ui/html";
import { Effect, Schema, Stream } from "effect";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: "square" | "circle" | "strip";
  opacity: number;
}

const COLORS = [
  "#ff6b6b",
  "#feca57",
  "#48dbfb",
  "#ff9ff3",
  "#54a0ff",
  "#5f27cd",
  "#01a3a4",
  "#ff6348",
  "#2ed573",
  "#ffa502",
];

const PARTICLE_COUNT = 150;

const isBirthday = () => {
  const now = new Date();
  return now.getMonth() === 2 && now.getDate() === 24; // March 24
};

const sessionKey = () => `birthday-confetti-${new Date().getFullYear()}`;

const shouldCelebrate = () => {
  if (!isBirthday()) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Check if already dismissed this session
  try {
    return !sessionStorage.getItem(sessionKey());
  } catch {
    return true;
  }
};

const createParticles = (width: number, height: number): Array<Particle> =>
  Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: -Math.random() * height * 0.5,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#ff6b6b",
    size: Math.random() * 8 + 4,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.2,
    shape: (["square", "circle", "strip"] as const)[Math.floor(Math.random() * 3)] ?? "square",
    opacity: 1,
  }));

const drawParticle = (ctx: CanvasRenderingContext2D, p: Particle) => {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  switch (p.shape) {
    case "square":
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      break;
    case "circle":
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "strip":
      ctx.fillRect(-p.size / 4, -p.size, p.size / 2, p.size * 2);
      break;
  }
  ctx.restore();
};

// The burst is frame-counted physics on a full-screen canvas, so it runs as
// a mount on the overlay. It ends after ~9 seconds and remembers, for this
// session, that the confetti has been thrown.
const ThrowConfetti = Mount.make("ThrowConfetti", {}, (node: HTMLElement) =>
  Effect.callback<void>((resume) => {
    const canvas = node.querySelector("canvas");
    const ctx = canvas?.getContext("2d");
    const message = node.querySelector("p");
    message?.animate(
      [
        { transform: "translateY(0px) rotate(-1deg)" },
        { transform: "translateY(-16px) rotate(1deg)" },
        { transform: "translateY(0px) rotate(-1deg)" },
      ],
      { duration: 3000, easing: "ease-in-out", iterations: Infinity },
    );
    message?.animate(
      [
        { opacity: 0, offset: 0 },
        { opacity: 1, offset: 0.1 },
        { opacity: 1, offset: 0.75 },
        { opacity: 0, offset: 1 },
      ],
      { duration: 9000, easing: "ease-in", fill: "forwards" },
    );
    if (!canvas || !ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = createParticles(canvas.width, canvas.height);
    // Fade out after ~8 seconds (480 frames at 60fps)
    const fadeStart = 420;
    const fadeDuration = 120;
    let elapsed = 0;
    let animationId = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      elapsed++;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // gravity
        p.vx *= 0.999; // air resistance
        p.rotation += p.rotationSpeed;
        // Wobble effect
        p.x += Math.sin(p.rotation) * 0.5;
        if (elapsed > fadeStart) {
          p.opacity = Math.max(0, 1 - (elapsed - fadeStart) / fadeDuration);
        }
        drawParticle(ctx, p);
      }
      if (elapsed < fadeStart + fadeDuration) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      window.removeEventListener("resize", resize);
      try {
        sessionStorage.setItem(sessionKey(), "true");
      } catch {}
      resume(Effect.void);
    };
    animationId = requestAnimationFrame(animate);

    return Effect.sync(() => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    });
  }),
);

const BirthdayConfettiMessage = UiSchema.TaggedEnum({
  DetectedBirthday: {},
  CompletedThrowConfetti: {},
});

// The date is the visitor's, so the prerender shows nothing and the client
// checks it.
export const BirthdayConfetti = Html.component({
  name: "BirthdayConfetti",
  model: Schema.Struct({ show: Schema.Boolean, dismissed: Schema.Boolean }),
  message: BirthdayConfettiMessage,
  restore: false,
}).make({
  init: () => ({ show: false, dismissed: false }),
  update: ($, message) =>
    BirthdayConfettiMessage.match(message, {
      DetectedBirthday: () => $.evolve({ show: true }),
      CompletedThrowConfetti: () => $.evolve({ dismissed: true }),
    }),
  subscriptions: () => [
    Subscription.make(
      "check-date",
      Stream.unwrap(
        Effect.sync(() =>
          shouldCelebrate()
            ? Stream.make(BirthdayConfettiMessage.DetectedBirthday())
            : Stream.empty,
        ),
      ),
    ),
  ],
  view: (h, { show, dismissed }) =>
    !show || dismissed
      ? h.text("")
      : h.div
          .onMount(
            ThrowConfetti().pipe(Mount.map(() => BirthdayConfettiMessage.CompletedThrowConfetti())),
          )
          .children(
            h.canvas.class("pointer-events-none fixed inset-0 z-50").attr("aria-hidden", "true"),
            h.div
              .class("pointer-events-none fixed inset-0 z-50 flex items-center justify-center")
              .children(
                h.p
                  .class(
                    "animate-birthday-float select-none text-4xl font-bold drop-shadow-lg md:text-6xl",
                  )
                  .style({
                    background:
                      "linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)",
                    webkitBackgroundClip: "text",
                    webkitTextFillColor: "transparent",
                    opacity: "0",
                  })
                  .children("🎂 It's my birthday! 🎉"),
              ),
          ),
});
