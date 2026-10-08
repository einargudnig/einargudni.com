# einargudni.com DNS cutover

Moving the zone from Vercel DNS to Cloudflare, then the apps that sit on it.

- **Registrar:** Name.com (expires 2027-01-22)
- **Nameservers today:** `ns1.vercel-dns.com`, `ns2.vercel-dns.com`
- **Worker already live:** <https://einar-os.einargudni.workers.dev>

> [!CAUTION]
> **Corrected 2026-09-14.** An earlier version of this file claimed the zone had
> no email and only four live hosts. Both were wrong. The method was flawed:
> "returns a Vercel 404" was treated as proof a name had no record, and MX/TXT
> were checked only at the apex. The wildcard answers _every_ name, so a 404 is
> exactly what a missing record looks like — and Resend's email lives on
> `send.einargudni.com`, not the apex.

---

## What is actually live today

Classify by **record**, not by HTTP status. A host is explicit if it has a
CNAME, or an A that differs from the wildcard's answer (`216.150.x.x`).

### Explicit records — must all be carried across

| Host                | Record                                           | State                                             |
| ------------------- | ------------------------------------------------ | ------------------------------------------------- |
| `craft`             | A `76.76.21.21`                                  | live, 200 (Vercel legacy IP)                      |
| `writing`           | A `76.76.21.21`                                  | live, 200                                         |
| `learning`          | A `66.241.124.56`                                | Fly.io — currently not responding, record is real |
| `learnings`         | CNAME `remix-workbook.fly.dev`                   | Fly.io                                            |
| `coolify`           | A `37.27.184.91`                                 | Hetzner, self-hosted                              |
| `sologbjor`         | CNAME `sol-og-bjor.pages.dev`                    | live, Cloudflare Pages                            |
| `send`              | MX `feedback-smtp.us-east-1.amazonses.com` + SPF | **Resend email**                                  |
| `resend._domainkey` | TXT                                              | **DKIM**                                          |
| `@`                 | 3× CAA                                           | letsencrypt, pki.goog, sectigo                    |

### Served _only_ by the wildcard

| Host             | State                       | After cutover                 |
| ---------------- | --------------------------- | ----------------------------- |
| `einargudni.com` | 307 → www                   | **becomes canonical**, Worker |
| `www`            | 200, the site               | **301 → apex**                |
| `posture`        | 200, Astro/static on Vercel | needs its **own** record      |
| `nido`           | 200, Next.js/SSR on Vercel  | needs its **own** record      |

> [!CAUTION]
> **The wildcard is load-bearing.** `www`, `posture` and `nido` have no records
> of their own — they resolve through `*` and are routed by Host header at
> Vercel. Either keep the wildcard, or give those three explicit records
> _before_ dropping it. Dropping it blind takes down the main site and both apps.

> [!WARNING]
> Still confirm against Vercel's domain list before dropping the wildcard.
> Enumeration by probing cannot prove a negative here.

---

## Why the zone moves before the apps

`nido` is a server-rendered Next.js app, so on Cloudflare it needs a Worker —
and per Cloudflare's docs you **cannot** create a Worker Custom Domain "on a
hostname with an existing CNAME DNS record or on a zone you do not own." It is
structurally blocked until the zone is in the account.

`posture` is static Astro and _could_ move to Pages first over external DNS, the
way `sologbjor` already does. But there is no reason to: every record you
flipped would be flipped in Vercel DNS, the system being abandoned. Move the
zone and each app migration becomes one reversible record change in the
dashboard you are keeping.

**Rollback is asymmetric, which is the real argument for this order.** Undoing
the zone move means another nameserver change and another ~24h NS TTL. Undoing
an app migration is a CNAME flip that settles in ~5 minutes at TTL 300. Do the
slow, hard-to-reverse step once and early; make the app moves cheap and
repeatable behind it.

---

## Target record set

| Type    | Name                               | Value                                        | Proxy        | Why                                                                          |
| ------- | ---------------------------------- | -------------------------------------------- | ------------ | ---------------------------------------------------------------------------- |
| —       | `@`                                | Worker custom domain                         | Proxied      | Created by attaching the Worker                                              |
| —       | `www`                              | Worker custom domain                         | Proxied      | Redirect Rule catches it first; Worker is the harmless fallback              |
| CNAME   | `posture`                          | `cname.vercel-dns.com`                       | **DNS only** | New record — was wildcard-served. Grey-cloud so Vercel keeps terminating TLS |
| CNAME   | `nido`                             | `cname.vercel-dns.com`                       | **DNS only** | New record — same                                                            |
| A       | `craft`, `writing`                 | `76.76.21.21`                                | **DNS only** | Existing Vercel apps                                                         |
| A/CNAME | `learning`, `learnings`, `coolify` | Fly.io / Hetzner                             | **DNS only** | Not Vercel; carry across as-is                                               |
| CNAME   | `sologbjor`                        | `sol-og-bjor.pages.dev`                      | Proxied      | Better: re-add as a Pages custom domain once the zone is live                |
| MX+TXT  | `send`                             | SES relay + SPF                              | n/a          | **Resend email — do not lose**                                               |
| TXT     | `resend._domainkey`                | DKIM public key                              | n/a          | **Resend DKIM — do not lose**                                                |
| CAA     | `@`                                | `letsencrypt.org`, `pki.goog`, `sectigo.com` | n/a          | Already permits Cloudflare's two issuers                                     |

`posture` and `nido` need explicit CNAMEs to `cname.vercel-dns.com` added to the
zone file before the wildcard goes; `www` and the apex are covered by attaching
the Worker.

The CNAME and CAA rows import directly: **DNS → Records → Import** →
[`infra/einargudni.com.zone`](./einargudni.com.zone). Proxy status is the one
thing a zone file cannot carry, so grey-cloud `posture` and `nido` afterwards.

---

## Sequence

Every record must be correct in Cloudflare **before** nameservers change.
During propagation both nameserver sets get queried, and whichever a resolver
picks must serve a working answer.

### 01 — Add the zone, nameservers unchanged · **you**

1. Cloudflare → **Add a site** → `einargudni.com` → Free plan.
2. Let it scan and import existing records.
3. Note the two assigned nameservers. **Stop there** — do not touch Name.com.

**Gate:** zone reads _Pending Nameserver Update_. Nothing is live, nothing has
broken; the site is still served entirely by Vercel.

### 02 — Reconcile records and attach the Worker · **you + Claude**

- Delete the imported wildcard and any stale Vercel A records.
- Import `infra/einargudni.com.zone`, then grey-cloud `posture` and `nido`.
- **Claude:** attach the Worker. This needs no dashboard — `custom_domain: true`
  creates both the custom domain and its DNS record:

  ```jsonc
  "routes": [
    { "pattern": "einargudni.com",     "custom_domain": true },
    { "pattern": "www.einargudni.com", "custom_domain": true }
  ]
  ```

- **You:** create the Redirect Rule (Rules → Redirect Rules → Create):

  ```
  When:  http.host eq "www.einargudni.com"
  Then:  Dynamic redirect
         concat("https://einargudni.com", http.request.uri.path)
         Status 301 · Preserve query string ✓
  ```

> [!NOTE]
> Wrangler's OAuth token is Workers-scoped: it cannot create the zone, edit DNS
> records or add redirect rules. A token with `Zone:Edit` + `DNS:Edit` scoped to
> this zone would let Claude do all three.

### 03 — Verify before the flip · **Claude**

```bash
./scripts/verify-dns.sh <cloudflare-nameserver>   # before the NS flip
./scripts/verify-dns.sh                           # after propagation
```

Queries the Cloudflare nameservers directly while the world still resolves via
Vercel, so the new zone is proven correct before any traffic depends on it.
Asserts every explicit record by name and value, that Resend's MX, SPF and DKIM
survive (and that the DKIM key is not truncated — it must end `IDAQAB`), and
that `www`, `posture` and `nido` still resolve however they get there. Once
nameservers have moved it also checks the live site, the www redirect, all five
app subdomains, markdown negotiation and the well-known endpoints.

Run against today's DNS it reports `18 passed, 6 failed`; the six are exactly
the things the cutover changes.

**Gate:** all record and email checks pass. Do not proceed otherwise.

### 04 — Pre-empt Vercel re-verification · **you**

> [!IMPORTANT]
> **The step that usually bites.** Vercel auto-verifies domains that use Vercel
> DNS. The moment nameservers move, `posture` and `nido` become externally
> hosted from Vercel's point of view, and Vercel may demand a `_vercel` TXT
> record before it keeps serving them.

Vercel → each project → Settings → Domains shows the `_vercel` TXT value **even
while the domain is still verified**. Create it in Cloudflare before the flip
and there is no gap at all. No `_vercel` record exists today — Vercel DNS
auto-verifies, which is exactly the crutch being removed.

### 05 — Move Worker secrets · **you**

Everything degrades gracefully without these, so none of them block the
cutover. Values are **not** recoverable from Vercel, so have them to hand:

- `LIFEOS_API_URL` and `LIFEOS_WEB_TOKEN` are stored there as write-only
  _Secret_-type variables. `vercel env pull` returns `[SENSITIVE]` placeholders
  and the dashboard will not reveal them either.
- `RESEND_API_KEY` was **never set on Vercel at all**. The contact form has been
  answering 503 in production since before this migration — verified 2026-09-22
  against `www.einargudni.com/api/contact`. Issue a fresh key at
  <https://resend.com/api-keys>; there is nothing to carry over.

`NEXT_PUBLIC_CONVEX_URL` _is_ readable and has already been carried across as
the build-time `VITE_CONVEX_URL`.

```bash
bunx wrangler secret put RESEND_API_KEY
bunx wrangler secret put LIFEOS_API_URL
bunx wrangler secret put LIFEOS_WEB_TOKEN
```

| Secret             | Missing means                                                |
| ------------------ | ------------------------------------------------------------ |
| `RESEND_API_KEY`   | Contact form returns 503 with an "email me directly" message |
| `LIFEOS_API_URL`   | Whoop numbers serve the committed snapshot                   |
| `LIFEOS_WEB_TOKEN` | Same                                                         |

### 06 — Flip nameservers at Name.com · **you**

1. Name.com → `einargudni.com` → Nameservers.
2. Replace `ns1.vercel-dns.com` / `ns2.vercel-dns.com` with the two Cloudflare
   nameservers from phase 01.
3. Save. Cloudflare emails when it detects the change.

> [!WARNING]
> **Expect a long tail, not an instant switch.** The registry NS TTL is
> ~85,795s (≈24h) and cannot be shortened in advance. Resolvers will use
> _either_ nameserver set for up to two days — which is exactly why phases
> 02–03 come first. Record TTLs are short (~1,200s now, 300s after import), so
> the records themselves settle quickly once a resolver has switched.

### 07 — Confirm the apps survived · **you**

- `posture` and `nido` still return 200 over HTTPS.
- Neither Vercel project shows an invalid-configuration warning.

### 08 — Enable Image Transformations · **you**

1. Cloudflare → the zone → **Images** → enable **Transformations**.
2. Set `VITE_CF_IMAGES=1` and redeploy.

Order matters and the flag exists precisely for this: with transformations off,
every `/cdn-cgi/image/` URL is a 404. Until the flag flips, images are served
untransformed — slower, never broken.

### 09 — Migrate `posture` → Cloudflare Pages · **Claude**

Astro, statically served (`x-vercel-cache: HIT` with `must-revalidate`). Same
shape as `sologbjor`, which already runs on Pages, so this is the easy one.

1. Build and deploy the Astro output to a Pages project.
2. Add `posture.einargudni.com` as a Pages custom domain.
3. Flip the CNAME from `cname.vercel-dns.com` to the Pages target.

Reversible: Vercel keeps serving until the record changes, and pointing the
CNAME back restores it within the record TTL — about five minutes, not a day.

### 10 — Migrate `nido` → Workers · **Claude**

Next.js with `cache-control: private, no-cache, no-store` and
`x-vercel-cache: MISS` — server-rendered on every request. This is a real
project, not a record change, and deserves its own session.

1. Port with `@opennextjs/cloudflare`, or rewrite the way this site was — the
   right call depends on how much of Next it actually leans on.
2. Attach `nido.einargudni.com` as a Worker Custom Domain. This is the step that
   was impossible before the zone moved.

---

## Rollback

Set the nameservers at Name.com back to `ns1.vercel-dns.com` and
`ns2.vercel-dns.com`. Vercel DNS keeps the zone as it is today, so this restores
the current state exactly — subject to the same ~24h NS TTL.

Because rollback is slow, **do not delete the Vercel projects** until the new
setup has run clean for a week. It costs nothing to leave them deployed, and
they are what rollback depends on.

---

## Checklist

- [ ] Confirm Vercel's domain list shows exactly: `www`, `posture`, `nido`, `sologbjor`
- [ ] Add `einargudni.com` to Cloudflare, record the two assigned nameservers
- [ ] Delete imported wildcard and stale Vercel A records
- [ ] Import `infra/einargudni.com.zone`, grey-cloud `posture` and `nido`
- [ ] Attach apex + www as Worker Custom Domains (Claude)
- [ ] Add Redirect Rule: `www` → apex, 301
- [ ] Copy `_vercel` TXT values from Vercel into Cloudflare **before** the flip
- [ ] `./scripts/verify-dns.sh <ns>` passes
- [ ] Put `RESEND_API_KEY`, `LIFEOS_API_URL`, `LIFEOS_WEB_TOKEN` as Worker secrets
- [ ] Change nameservers at Name.com
- [ ] After propagation: `./scripts/verify-dns.sh` passes, apps still 200
- [ ] Enable Image Transformations, set `VITE_CF_IMAGES=1`, redeploy
- [ ] Migrate `posture` to Pages
- [ ] Migrate `nido` to Workers via OpenNext
- [ ] One week clean — then retire the Vercel projects

---

## Reference

|                |                                                          |
| -------------- | -------------------------------------------------------- |
| Branch         | `migrate/tanstack` (PR #39)                              |
| Worker         | `einar-os` → <https://einar-os.einargudni.workers.dev>   |
| Zone file      | [`infra/einargudni.com.zone`](./einargudni.com.zone)     |
| Verify         | [`scripts/verify-dns.sh`](../scripts/verify-dns.sh)      |
| Canonical host | apex `einargudni.com` — `SITE_URL` in `lib/discovery.ts` |
