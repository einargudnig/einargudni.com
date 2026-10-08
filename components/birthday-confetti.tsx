import { useEffect, useRef, useState } from "react";

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

function isBirthday() {
  const now = new Date();
  return now.getMonth() === 2 && now.getDate() === 24; // March 24
}

export function BirthdayConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!isBirthday()) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Check if already dismissed this session
    const key = `birthday-confetti-${new Date().getFullYear()}`;
    if (sessionStorage.getItem(key)) return;

    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || dismissed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 150;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create initial burst of particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height * 0.5,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        shape: (["square", "circle", "strip"] as const)[Math.floor(Math.random() * 3)],
        opacity: 1,
      });
    }

    let elapsed = 0;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      elapsed++;

      // Fade out after ~8 seconds (480 frames at 60fps)
      const fadeStart = 420;
      const fadeDuration = 120;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // gravity
        p.vx *= 0.999; // air resistance
        p.rotation += p.rotationSpeed;

        // Wobble effect
        p.x += Math.sin(p.rotation) * 0.5;

        // Fade out
        if (elapsed > fadeStart) {
          p.opacity = Math.max(0, 1 - (elapsed - fadeStart) / fadeDuration);
        }

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
      }

      if (elapsed < fadeStart + fadeDuration) {
        animationId = requestAnimationFrame(animate);
      } else {
        setDismissed(true);
        const key = `birthday-confetti-${new Date().getFullYear()}`;
        sessionStorage.setItem(key, "true");
      }
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [show, dismissed]);

  if (!show || dismissed) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
        <p
          className="animate-birthday-float select-none text-4xl font-bold drop-shadow-lg md:text-6xl"
          style={{
            background: "linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "birthday-float 3s ease-in-out infinite, birthday-fade 9s ease-in forwards",
          }}
        >
          🎂 It&apos;s my birthday! 🎉
        </p>
      </div>
      <style>{`
        @keyframes birthday-float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-16px) rotate(1deg); }
        }
        @keyframes birthday-fade {
          0% { opacity: 0; }
          10% { opacity: 1; }
          75% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </>
  );
}
