import { createFileRoute } from "@tanstack/react-router";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "einargudnig@gmail.com";
// Resend's shared sender works without a verified domain, but only delivers to
// the address that owns the Resend account. Set CONTACT_FROM_EMAIL once a
// domain is verified so replies and deliverability come from einargudni.com.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

const MAX_PER_WINDOW = 3;
const WINDOW_MS = 10 * 60 * 1000;

// Best-effort throttle. Worker isolates don't share memory, so this stops
// casual hammering rather than a determined flood. Only delivery attempts count
// against it — a typo'd email shouldn't lock anyone out.
const sends = new Map<string, number[]>();

function recentSends(ip: string) {
  const recent = (sends.get(ip) ?? []).filter((at) => Date.now() - at < WINDOW_MS);
  sends.set(ip, recent);
  return recent;
}

function recordSend(ip: string) {
  sends.set(ip, [...recentSends(ip), Date.now()]);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function fail(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

// Cloudflare sets CF-Connecting-IP itself and it cannot be spoofed by the
// client, unlike the x-forwarded-for this read before the move to Workers.
function clientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

async function handleContact(request: Request) {
  const ip = clientIp(request);

  if (recentSends(ip).length >= MAX_PER_WINDOW) {
    return fail("Too many messages. Try again in a little while.", 429);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return fail("Malformed request.", 400);
  }

  const body = payload as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  // Hidden field. Humans leave it empty; bots fill it in.
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";

  if (honeypot) {
    // Pretend it worked so the bot doesn't retry with a different shape.
    recordSend(ip);
    return Response.json({ ok: true });
  }

  if (!name || name.length > 100) {
    return fail("Please add your name.", 400);
  }
  if (!isEmail(email) || email.length > 200) {
    return fail("That email address doesn't look right.", 400);
  }
  if (message.length < 10 || message.length > 5000) {
    return fail("Please write a message between 10 and 5000 characters.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return fail(`Mail isn't configured right now — email ${TO_EMAIL} directly.`, 503);
  }

  recordSend(ip);

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `einargudni.com <${FROM_EMAIL}>`,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Work enquiry from ${name}`,
        text: [`From: ${name} <${email}>`, "", message].join("\n"),
      }),
    });
  } catch (cause) {
    console.error("[contact] Resend unreachable:", cause);
    return fail(`Couldn't send that — email ${TO_EMAIL} directly.`, 502);
  }

  if (!response.ok) {
    console.error("[contact] Resend responded %d: %s", response.status, await response.text());
    return fail(`Couldn't send that — email ${TO_EMAIL} directly.`, 502);
  }

  return Response.json({ ok: true });
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: ({ request }) => handleContact(request),
    },
  },
});
