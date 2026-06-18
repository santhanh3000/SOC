# OwlSOC website — launch-readiness review

**Date:** 10 June 2026
**Method:** 7 adversarial reviewer agents (Completeness, Links & Navigation, SEO, Conversion & Copy, Performance & Responsive, Accessibility, Deploy) ran independently against the source **and the actual built output** (`out/`), producing 53 raw findings. A skeptical adjudication pass then re-verified proofs against the built pages, de-duplicated to 38 unique findings, rejected nothing (all proofs held), and rated severity against one bar: *does this block a public launch at owlsoc.com?* Every "fixed" row below was re-verified against a fresh build after the fix.

---

## Executive summary

**Verdict: `READY-WITH-LAUNCH-INPUTS`.**

The site is complete, fast, accessible, honestly written, fully rebranded to OwlSOC, and deploys cleanly as a static export. **All 32 engineering findings have been fixed and re-verified in this pass.** What remains is exactly five launch inputs that only the business can supply — most critically the real form endpoint, without which the primary CTA cannot capture a lead (it degrades gracefully to an email fallback, but that is not a launch posture).

| Severity (38 unique findings, post-adjudication) | Count | Fixed now | Launch input | Deferred |
|---|---|---|---|---|
| Critical | 1 | — | 1 | — |
| High | 9 | 7 | 2 | — |
| Medium | 12 | 10 | 2 | — |
| Low | 16 | 15 | — | 1 |
| **Total** | **38** | **32** | **5** | **1** |

Rejected: 0 (every verified proof reproduced). Unverified: 1 reviewer item (role mailboxes' existence — unknowable from the repo; adjudicated as a launch input, listed below).

**Top "missing before launch" items (all user inputs, in order):**
1. Real Formspree form ID → `lib/site.ts:15` *(critical — the only true blocker)*
2. Counsel-reviewed Privacy/Terms text; then delete the visible placeholder banner
3. Create the four `@owlsoc.com` role mailboxes (hello, security, privacy, legal)
4. Optional: real booking/calendar URL → `lib/site.ts:21`
5. Founder names / company registration number for the About answer & footer

---

## What was verified clean (spot-checked against built pages)

- **Completeness:** all ten sections (`#top #problem #how #demo #features #vs #pricing #trust #faq #contact`) exist with substantive content in `out/index.html`; real `/privacy/`, `/terms/`, branded 404 with home link; no Lorem Ipsum, no TODO/stub text in any built page.
- **Brand:** `grep -ri deowls out/` → **zero matches**. All wordmarks, OG image, icons, manifest, security.txt, emails and copy read OwlSOC. (The repo *folder* name still carries the old name — harmless, invisible to visitors, rename at your leisure.)
- **Links:** deterministic crawl of every `href` on all four built pages: **120 internal references, 0 dead** (anchors verified against element ids; paths verified against files on disk). Nav/footer anchors are home-absolute (`/#how`) so they work from the legal pages too.
- **Honesty:** no unverifiable absolutes (the bare "100%" stat, the "4 tenants" pill, and the unconditional 48-hour promise were all reworded); demo labelled "Synthetic sample" + "Illustrative data" + "(illustrative)" on confidence; **the underlying AI model/provider is never named** (case-insensitive grep across `out/`: zero hits).
- **No secrets:** pattern scan (`sk-`, `AKIA`, `ghp_`, `pk_live`, private keys, bearer/password) across repo and `out/` → zero real credentials. Fonts self-hosted; **zero third-party requests** of any kind in the built site.
- **Build:** `next build` exits 0; 12/12 static pages; first-load JS 148 kB gzip (lean for a motion-heavy page); single 8.7 kB CSS file; all `_next` asset references resolve to files.

---

## Findings — adjudicated and FIXED in this pass (32)

Proof = what was observed in the built page/source before the fix; all fixes re-verified against a fresh build.

| ID | Sev | Role | Finding (location) | Fix applied |
|----|-----|------|--------------------|-------------|
| F-01 | high | Perf | Hero shipped `style="opacity:0"` until 147 kB JS hydrated — delayed mobile LCP, invisible without JS (`components/Hero.tsx`, built `<h1>`) | Hero converted to a **server component with pure CSS entrances** (`hero-rise/scale/fade` keyframes); built `<h1>` now carries no opacity gate; staggers preserved |
| F-02 | med | Perf | No `<noscript>` fallback; 37 below-fold elements invisible with JS off (`out/index.html`) | `<noscript><style>` override in `app/layout.tsx` restores all `opacity:0`-gated elements |
| F-03 | low | Perf/A11y | Mount-time entrances bypassed `prefers-reduced-motion` before hydration; CSS guard didn't reset `animation-delay` | Hero now CSS-driven and the global reduced-motion guard zeroes `animation-delay` too (`app/globals.css`) |
| F-04 | high | Links | Nav/footer anchors (`#how`…) dead on `/privacy/` and `/terms/` (8 dead anchors per page, found independently by deterministic crawl) | All shared-nav/footer anchors now home-absolute `/#…`; re-crawl: 0 dead |
| F-05 | med | Links/A11y | 404 skip link targeted `#main` but the 404 `<main>` had no id | `id="main" tabIndex={-1}` on `app/not-found.tsx` main |
| F-06 | med | Process | `out/` was stale relative to source (3 findings traced to it) | Fresh build is now the verified artifact; **rule: always `npm run build` immediately before deploy** |
| F-07 | high | A11y | Form fields' `focus:outline-none` beat the global `:focus-visible` — no visible keyboard focus (PilotForm input/select/textarea) | Removed; global amber focus ring now applies |
| F-08 | high | A11y | `bone-faint #717784` text failed 4.5:1 on every surface (27 usages, worst 3.56:1 on the featured pricing card) | Token lightened to `#858B9A` (≥5.05:1 on elevated, verified) |
| F-09 | med | A11y | `sev-crit #E5484D` small text 4.40:1 on elevated surfaces (form errors, Critical badges) | New `sev-crit-hi #F2716F` token (6.04:1) for error copy + small badges; `#E5484D` kept for fills/borders |
| F-10 | med | A11y | `role="status"` regions mounted *with* their content — decisions/success might never announce (Demo ActionRow, PilotForm) | Always-mounted live regions; text swaps in (both components) |
| F-11 | low | A11y | Dangling `aria-controls`: collapsed FAQ panels & closed mobile menu unmounted from DOM | FAQ panels now **always mounted** (height-animated); ids always real |
| F-12 | med | SEO | 10 of 11 FAQ answers absent from static HTML (client-only render) — invisible to crawlers, incl. the About/company and data-handling answers | Same fix as F-11: all answers now in the prerendered HTML (verified `faq-panel-1/5/10` present in `out/index.html`) |
| F-13 | low | A11y | FAQ triggers not in headings; footer link groups not landmarks; decorative SVGs missing `aria-hidden` (HowItWorks icons, Pricing star/check) | `<h3 class="contents">` wrappers; footer columns are labelled `<nav>`s with `h2` titles; `aria-hidden="true"` added |
| F-14 | low | A11y | Required fields not programmatically required; failed submit didn't move focus | `aria-required` on name/email/company/stack; first invalid field receives focus on submit |
| F-15 | high | Copy/Honesty | Hero pill claimed live operations "investigating alerts in **4 tenants**" — unverifiable traction claim | Reworded to the capability statement "Night Watch · investigating around the clock" |
| F-16 | med | Copy/Honesty | "**live** sample" + pulsing dot contradicted the adjacent "illustrative" label | Now "looping sample" |
| F-17 | med | Copy/Honesty | Demo intro "synthetic alerts running through the real product output" implied live provenance | "…shown exactly as the product reports them…" |
| F-18 | low | Copy | 48-hour go-live anchored to different events in 4 places (kickoff vs OAuth grant vs unqualified) | Standardised on the honest anchor: "48h of access" (hero badge, comparison) |
| F-19 | low | Copy | "Most teams pick this" rendered twice on the Core card (badge + footnote) | Footnote → "Billed monthly · cancel by email" |
| F-20 | low | Copy | Footer "Book a pilot" broke the consistent CTA verb family | → "Start your pilot" |
| F-21 | low | Copy | Trust promise 2 read circularly ("your logs… Not yours") | Rewritten cleanly; sub-processor commitment kept |
| F-22 | low | Copy | One leftover em-dash in HowItWorks step 3 (house style violation) | Removed |
| F-23 | med | SEO | Meta description 247 chars (SERP truncation loses the pilot CTA) | Trimmed to 150 chars with the hook + price up front |
| F-24 | low | SEO | No `/favicon.ico` (blind crawler requests 404) | Generated 32×32 PNG-ICO via `scripts/generate-images.mjs` → `app/favicon.ico`, exported to `/favicon.ico` |
| F-25 | low | SEO | No structured data | JSON-LD `Organization` added in `app/layout.tsx` |
| F-26 | low | SEO | `/privacy/` `/terms/` inherited homepage og:url/og:title; 404 inherited canonical + description | Per-page `openGraph`/`twitter` metadata; 404 gets own description, `canonical: null` |
| F-27 | low | SEO | `html lang="en"` vs `og:locale en_GB` and £/UK content | `lang="en-GB"` |
| F-28 | low | SEO | Deprecated `Host:` directive in robots.txt; legacy `meta keywords` | Both removed |
| F-29 | low | Perf/UX | Demo on mobile: selecting an alert updated a viewer below the fold with no scroll | `scrollIntoView` (reduced-motion-aware) on select below `lg` |
| F-30 | low | Deploy | `npm start` (`next start`) incompatible with `output:'export'`; `.gitignore` missed plain `.env`; obsolete `interest-cohort=()` in Permissions-Policy | `start` → `npx serve out`; `.env*`; directive removed from `vercel.json` + `_headers` |
| F-31 | low | Links | `BOOKING_CONFIGURED` substring sentinel would self-lock if the real link equalled the placeholder | Explicit convention: empty string = hidden, any URL = shown (`lib/site.ts:21-22`) |
| F-32 | med | Completeness | No About presence beyond a collapsed FAQ answer (now also crawlable per F-12) | Footer **About OwlSOC** link → stable `/#about` anchor on the "Who is behind OwlSOC?" item; answer enriched (founder-led, UK-registered, meet-the-builders). Names/registration number remain a launch input — **nothing was fabricated** |

Also fixed (self-found during verification, outside the 53): nav crowding at tablet widths after the rebrand added a sixth link — nav now collapses to the hamburger below `lg`, and the sticky mobile CTA covers tablet widths too.

## Launch inputs — the business must supply (5)

| ID | Sev | What | Where | Done when |
|----|-----|------|-------|-----------|
| L-01 | **critical** | **Real Formspree form ID** (or other provider). Today every submit shows the error state with an email fallback; the string `YOUR_FORM_ID` ships in the bundle. | `lib/site.ts:15` (CSP already allows `formspree.io` in `form-action` + `connect-src` — no header change needed) | Test submission arrives in the inbox from the deployed site |
| L-02 | high | **Counsel-reviewed Privacy & Terms.** Both pages currently display an honest "placeholder, replace before going live" banner. The drafted text is a solid starting point. | `app/privacy/page.tsx`, `app/terms/page.tsx`, banner in `components/LegalLayout.tsx` | Banner deleted; counsel sign-off |
| L-03 | high | **Four role mailboxes**: hello@, security@, privacy@, legal@owlsoc.com (aliases fine) + MX/SPF/DKIM on owlsoc.com. security.txt and the form fallback depend on them. | Mail provider + DNS | Test mail delivered to each |
| L-04 | med | **Booking link** (optional): the calendar link is hidden until set. Pricing says "book by Thursday"; if no scheduler will exist, soften that line. | `lib/site.ts:21` | Link set (or copy softened) |
| L-05 | med | **Founder names / LinkedIn / Companies House number** for the About answer and footer. Deliberately not invented. | `components/FAQ.tsx` (about item), `components/Footer.tsx` | Real details added |

## Deferred (1, post-launch)

- **P-01 (low, perf):** Adopt `LazyMotion`/`m.*` to trim ~15–20 kB gzip of framer-motion from first load. Mechanical but touches 12 files and `strict` mode turns a missed `motion.*` into a runtime error — not worth the risk the week of launch. Also worth adding post-launch: a CI step running a link-check + `npm audit` + a secret scanner, and Lighthouse/axe budgets.

---

## SEO / discoverability status

| Item | Status |
|---|---|
| Titles + meta descriptions | ✅ unique per page; home description 150 chars with CTA |
| Canonicals | ✅ absolute owlsoc.com, trailing-slash consistent; 404 excluded |
| robots.txt | ✅ allow all + sitemap pointer (deprecated Host removed) |
| sitemap.xml | ✅ `/`, `/privacy/`, `/terms/` — no phantom entries |
| Open Graph / Twitter | ✅ full set on every page; `og.png` 1200×630 with OwlSOC wordmark; `summary_large_image` |
| Favicon set | ✅ `icon.svg` + `apple-icon.png` + `favicon.ico` + web manifest (`theme_color #070910`) |
| Structured data | ✅ JSON-LD Organization |
| Indexability | ✅ public pages indexable; 404 noindex; FAQ answers now in static HTML |
| Language | ✅ `lang="en-GB"` matching content and og:locale |

## Deploy — verified build → live at owlsoc.com

The build is verified: `npm run build` exits 0, 12/12 pages, self-contained `out/` (no localhost refs, no secrets, no third-party requests). `vercel.json` carries the full security-header set (CSP, HSTS w/ preload, XFO DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP); `public/_headers` mirrors it for Netlify portability (ignored by Vercel; harmless 705-byte public file — delete once Vercel is confirmed permanent).

**1 — Push to Git** (repo is not yet git-initialised):
```bash
cd /Users/t/DeOwls-website
git init && git add -A && git commit -m "OwlSOC marketing site"
gh repo create <org>/owlsoc-website --private --source . --push
```

**2 — Import to Vercel:** vercel.com → Add New → Project → import `owlsoc-website`. Framework preset **Next.js** (auto-detected; Vercel runs `next build` and serves the static export — no settings to change). Every push to `main` now deploys; PRs get preview URLs. CLI alternative: `npx vercel --prod`.

**3 — Point owlsoc.com:** Project → Settings → Domains → add `owlsoc.com` and `www.owlsoc.com`. At your registrar either delegate to Vercel's nameservers, **or** add: apex `A @ 76.76.21.21`, plus `CNAME www cname.vercel-dns.com`. Set `owlsoc.com` as primary (www redirects). HTTPS is automatic (Let's Encrypt). Add your MX/SPF/DKIM records alongside (L-03).

**4 — Post-deploy verification (5 minutes):**
```bash
curl -sI https://owlsoc.com | grep -iE 'content-security|strict-transport|x-frame|nosniff'
curl -s https://owlsoc.com/robots.txt && curl -s https://owlsoc.com/sitemap.xml | head -5
curl -sI https://owlsoc.com/favicon.ico | head -1   # expect 200
```
Submit the pilot form once (expect the Formspree email), share the URL in Slack/LinkedIn to confirm the OG card, and run Lighthouse on the live URL. Then submit the sitemap in Google Search Console.

## Prioritised plan

**Must fix before going live:** L-01 (form ID) → L-02 (legal sign-off, remove banner) → L-03 (mailboxes) → rebuild → deploy steps 1–4 above.
**Should do at launch:** L-04 (booking link or soften copy), L-05 (founder/company details).
**Post-launch:** P-01 (LazyMotion), CI checks (link-check, audit, secret scan, Lighthouse), delete `public/_headers` if staying on Vercel, rename the repo folder.
