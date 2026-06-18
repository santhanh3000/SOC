# OwlSOC — marketing site

A high-converting marketing site for **OwlSOC**, an AI Security Operations Center (SOC)
as a service. It plugs into the security tools a company already runs (Microsoft
Sentinel, Microsoft Defender, AWS) and investigates every alert in under two minutes,
24/7. Humans approve every action.

Built as a fast, static, single-page site with separate legal pages. Dark "Night Watch"
aesthetic: deep ink, amber owl-iris, teal pupil. Instrument Serif (display) + Manrope
(body) + JetBrains Mono (technical detail).

---

## Stack

- **Next.js 14** (App Router) with `output: 'export'` — ships as pure static HTML/CSS/JS
- **TypeScript**, **Tailwind CSS**, **Framer Motion**
- Self-hosted fonts via `next/font` (no third-party font requests)
- No backend. The lead form posts to a managed form provider.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

`npm run build` writes the deployable static site to `./out`.

---

## Page / section structure

Single page (`app/page.tsx`) composed of:

1. **Hero** — owl mark, "Every alert, investigated. In under two minutes.", primary CTA, live alert ticker
2. **Problem** — alert overload, the nights/weekends gap, the cost of a real SOC team
3. **How it works** — Connect → Investigate → Report → Approve
4. **Demo** (centerpiece) — interactive sample investigation: pick a synthetic alert, watch a brief "investigating" reveal, then see the verdict + confidence, evidence-linked timeline, MITRE ATT&CK mapping, affected entities, and recommended actions (Approve / Defer / Reject are interactive). Clearly labelled **synthetic / illustrative**.
5. **Features** — bento grid of capabilities, benefit-led
6. **Comparison** — vs hiring a SOC team, vs doing nothing, vs traditional MDR
7. **Pricing** — Standalone £495 / Core £1,495 (most popular) / Compliance £2,995, per environment, refundable pilot highlighted
8. **Trust** — four written promises + an honest validation note and certification status
9. **FAQ** — accordion
10. **Final CTA + contact form** — the lead-capture form (the conversion endpoint)
11. **Footer** + sticky mobile CTA bar

Separate pages: `/privacy/`, `/terms/`, and a branded `404`.

---

## How the demo works

The demo is a real-product-style UI driven by synthetic data in `lib/demo-data.ts`
(three scenarios: impossible-travel sign-in, encoded-PowerShell execution, and a mass
SharePoint download that resolves to a false positive). Selecting an alert plays a short
"investigating" sequence (skipped for `prefers-reduced-motion`) and then renders the
analyst-grade report. Everything is labelled **illustrative / synthetic** — no real
customer data, no fabricated results. The underlying AI model/provider is never named
(presented only as "OwlSOC's AI"); please keep it that way in any future content.

---

## Where to plug in your real endpoints

All placeholders live in **`lib/site.ts`**:

| Constant | What it is | Action before launch |
|---|---|---|
| `FORM_ENDPOINT` | Lead-form POST target (Formspree-style) | Replace `YOUR_FORM_ID` with the real form id. The form fails gracefully to an email fallback until you do. |
| `FORM_ORIGIN` | Form provider origin used in the CSP allow-list | Keep in sync with `vercel.json` + `public/_headers` if you change provider. |
| `BOOKING_URL` | Optional calendar link, shown only **after** a successful submit | Set the real scheduling link, or leave as-is to hide it. |
| `CONTACT_EMAIL` / `SECURITY_EMAIL` / `PRIVACY_EMAIL` / `LEGAL_EMAIL` | Role addresses | Point at real inboxes. |
| `SITE_URL` | Canonical origin (used in metadata, sitemap, robots) | Set to the production domain. |

The contact form (`components/PilotForm.tsx`) handles **idle / validating / loading /
success / error** states and includes a honeypot field for spam. If `FORM_ENDPOINT` is
still the placeholder, it logs a dev warning and shows the email fallback rather than a
silent dead submit.

Privacy Policy (`/privacy/`) and Terms (`/terms/`) are real, brand-matched placeholder
pages — replace the body copy with legal-reviewed text before going live. Both are linked
from the footer.

---

## Security

The site itself is hardened (it's a security product — its own site has to be):

- **Security headers** are delivered by the host (Next's `headers()` does nothing under
  static export), so they're provided **both** ways:
  - `vercel.json` (Vercel)
  - `public/_headers` (Netlify / Cloudflare Pages)
  - Includes a tuned **Content-Security-Policy**, HSTS (preload), `X-Frame-Options: DENY`,
    `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP.
  - The CSP allow-lists the form provider origin under `form-action` and `connect-src`.
    **If you change the form provider, update the CSP in both files.**
- `public/.well-known/security.txt` (RFC 9116) for vulnerability reporting.
- Self-hosted fonts (no Google Fonts runtime request), no third-party scripts, no secrets
  in the repo, and the AI provider name appears nowhere.

> **Dependency note:** `npm audit` reports 2 advisories in **Next.js's bundled
> build-time PostCSS**. PostCSS runs at build only and is not part of the shipped static
> output, so it does not affect the deployed site. The only `npm audit fix --force`
> remedy is a breaking `next@16` upgrade — **don't** run it casually. The shipped static
> assets carry no runtime dependency vulnerabilities.

---

## Accessibility

- Skip-to-content link, semantic landmarks, labelled nav and disclosures
- `prefers-reduced-motion` honoured (CSS guard + an SSR-safe Framer `MotionConfig`)
- WCAG-tuned contrast tokens; visible focus states; ≥44px tap targets
- The demo's preview controls and the moving ticker are handled for assistive tech

---

## Brand assets

The official OwlSOC asset pack (`owlsoc-brand/`) is wired through **`lib/site.ts` →
`BRAND`** (the single source for logo paths, the OG card, and the theme color) and
rendered by `components/Brand.tsx` (`BrandLockup` / `BrandMark`).

Asset → destination mapping (re-copy here to update the brand):

| Pack file | Destination | Served at |
|---|---|---|
| `mark/owlsoc-mark.svg` | `public/brand/owlsoc-mark.svg` | `/brand/owlsoc-mark.svg` |
| `mark/owlsoc-mark-darkbg.svg` | `public/brand/` + `app/icon.svg` | `/icon.svg` (SVG favicon) |
| `lockup/owlsoc-horizontal.svg` | `public/brand/owlsoc-horizontal.svg` | header/footer lockup |
| `lockup/owlsoc-horizontal-on-light.svg` | `public/brand/` | (for future light surfaces) |
| `lockup/owlsoc-stacked.svg` | `public/brand/owlsoc-stacked.svg` | (available, unused) |
| `favicon/favicon.ico` | `app/favicon.ico` | `/favicon.ico` |
| `favicon/apple-touch-icon.png` | `app/apple-icon.png` | `/apple-icon.png` |
| `favicon/icon-192.png`, `icon-512.png` | `public/` | manifest icons |
| `social/owlsoc-og-card.png` | `public/owlsoc-og-card.png` | OG/Twitter card |

Not copied on purpose: `favicon/site.webmanifest` (the manifest is generated by
`app/manifest.ts` from `BRAND` — same values, one source); `icon-16/32/48.png`
(already inside the multi-size `favicon.ico`); the raster lockup PNGs (vectors win).

---

## Deploy

It's a static export — deploy `./out` anywhere.

**Vercel** (recommended; `vercel.json` headers apply automatically):
```bash
npm i -g vercel && vercel --prod
```

**Netlify / Cloudflare Pages** (`public/_headers` applies automatically):
- Build command: `npm run build`
- Publish directory: `out`

**Any static host** (S3 + CloudFront, Nginx, etc.): upload `./out`, and configure the
security headers from `vercel.json` / `public/_headers` at the CDN/server layer.

Full launch-readiness review (adjudicated findings, deploy + owlsoc.com DNS steps):
see **`OWLSOC_WEBSITE_LAUNCH_REVIEW.md`**.

### Launch checklist
- [ ] Set `FORM_ENDPOINT`, `BOOKING_URL`, role emails, and `SITE_URL` in `lib/site.ts`
- [ ] Confirm the form provider origin matches the CSP in `vercel.json` and `public/_headers`
- [ ] Replace `/privacy/` and `/terms/` body copy with legal-reviewed text
- [ ] Fill in the real founder details / validation scenario count where noted
- [ ] After deploy: `curl -sI https://yourdomain | grep -i content-security-policy`
