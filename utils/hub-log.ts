// Ship structured events to the life-os log hub (POST /v1/logs). SERVER-SIDE ONLY —
// reads LIFEOS_INGEST_TOKEN, which must NEVER reach the browser. Best-effort: never
// throws, and no-ops when the token is unset (e.g. local dev / preview without the env).
const HUB_URL = process.env.LIFEOS_HUB_URL ?? 'https://einars-macbook-pro.tail5588b1.ts.net'
const TOKEN = process.env.LIFEOS_INGEST_TOKEN
const PROJECT = 'einargudni.com'

type Level = 'info' | 'warn' | 'error'
export interface HubEvent {
  event: string
  level?: Level
  ts?: number
  fields?: Record<string, unknown>
}

export const logToHub = async (events: HubEvent | HubEvent[]): Promise<void> => {
  if (!TOKEN) return
  const list = (Array.isArray(events) ? events : [events]).map((e) => ({ level: 'info' as Level, ts: Date.now(), ...e }))
  try {
    await fetch(`${HUB_URL}/v1/logs`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ project: PROJECT, events: list }),
      signal: AbortSignal.timeout(3000),
    })
  } catch {
    // swallow — logging must never break the app
  }
}
