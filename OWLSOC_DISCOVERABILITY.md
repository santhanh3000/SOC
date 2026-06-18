# OwlSOC — discoverability & AI-recommendation readiness

**Date:** 10 June 2026 · **Method:** current-state audit of the built output → 5 highest-leverage fixes implemented → 3-lens adversarial gap-find (machine-readability, buyer-query extraction, trust/honesty) against the rebuilt site → verified fixes for every confirmed finding. All claims below were validated against `out/` (the actual built HTML), not just source.

---

## 1. Current-state audit (before this pass)

| Area | State before | Evidence |
|---|---|---|
| JSON-LD | Organization only — no Service, no offers, no FAQPage | 1 `ld+json` block in `out/index.html` |
| Entity naming | Consistent "OwlSOC" in copy (36×); split wordmark spans could read "Owl SOC" to naive tag-strippers (2×) | text-extraction scan |
| Quotable "what is" sentence | Hero subhead close, but spread over 4 sentences; no dedicated answer | `out/index.html` |
| Key facts in crawlable text | ✅ all present (pricing ×3 tiers, "under two minutes" ×7, connectors, pilot, approval gate) | text grep battery |
| Comparison | Pros/cons **cards** — not extractable as a table | `<table>` count: 0 |
| FAQ | 11 Q&As, all in static HTML (fixed in launch review), but none answering category queries ("what is an AI SOC") | built HTML |
| sitemap/robots/canonical/OG/meta | ✅ green (from launch-review pass) | `out/` |
| llms.txt | absent | — |
| Heading hierarchy | ✅ 1×h1, 11×h2, 36×h3, no skips | built HTML |
| CWV/mobile/a11y | ✅ green (hero CSS-rendered at first paint, 148 kB first-load JS, contrast/focus/landmarks fixed in launch review) | launch review |
| noindex | ✅ only on 404 | built HTML |

## 2. Structured data now present (validated in the built HTML)

Three blocks, all parse with `JSON.parse`, all cross-checked against visible page text. Single source of truth: [lib/schema.ts](lib/schema.ts) (Service, Organization) + [lib/faq-data.ts](lib/faq-data.ts) (FAQPage and the visible FAQ render from the same array, so parity cannot drift).

**Organization** (every page):
```json
{"@context":"https://schema.org","@type":"Organization","@id":"https://owlsoc.com/#organization",
 "name":"OwlSOC","url":"https://owlsoc.com/","logo":"https://owlsoc.com/apple-icon.png",
 "email":"hello@owlsoc.com",
 "description":"AI Security Operations Center as a service for Microsoft Sentinel, Microsoft Defender and AWS."}
```

**Service** (home; provider references the Organization `@id`; offers are the real tiers):
```json
{"@context":"https://schema.org","@type":"Service","name":"OwlSOC",
 "serviceType":"Security Operations Center as a Service (AI-powered alert investigation)",
 "url":"https://owlsoc.com/","provider":{"@id":"https://owlsoc.com/#organization"},
 "description":"OwlSOC investigates security alerts from Microsoft Sentinel, Microsoft Defender and AWS: it builds an evidence-linked timeline, maps the attack to MITRE ATT&CK, and returns a plain-language verdict with a recommended action, typically in under two minutes, 24/7. A human approves every action before it runs. Connects read-only; no agents to install. Starts with a £495 30-day refundable pilot.",
 "audience":{"@type":"BusinessAudience","audienceType":"Security and IT teams running Microsoft Sentinel, Microsoft Defender or AWS"},
 "areaServed":["GB","EU"],
 "offers":[
  {"@type":"Offer","name":"Standalone","price":"495","priceCurrency":"GBP",
   "priceSpecification":{"@type":"UnitPriceSpecification","price":"495","priceCurrency":"GBP","unitText":"per monitored environment per month"},
   "description":"Per monitored environment, per month. AI investigation on every alert, evidence-linked timelines, MITRE ATT&CK mapping, read-only client portal. 30-day refundable pilot.","url":"https://owlsoc.com/#pricing"},
  {"@type":"Offer","name":"Core","price":"1495","priceCurrency":"GBP",
   "priceSpecification":{"@type":"UnitPriceSpecification","price":"1495","priceCurrency":"GBP","unitText":"per monitored environment per month"},
   "description":"Per monitored environment, per month. Everything in Standalone plus multi-environment support, adaptive baselining, recommended actions with human approval, full audit trail and undo, Slack/Teams workflows.","url":"https://owlsoc.com/#pricing"},
  {"@type":"Offer","name":"Compliance","price":"2995","priceCurrency":"GBP",
   "priceSpecification":{"@type":"UnitPriceSpecification","price":"2995","priceCurrency":"GBP","unitText":"per monitored environment per month"},
   "description":"Per monitored environment, per month. Everything in Core plus audit-evidence packs to support SOC 2 / ISO 27001 / GDPR reporting, executive reporting, long-term log retention, 24/7 escalation channel.","url":"https://owlsoc.com/#pricing"}]}
```

**FAQPage** (home; 14 Questions — generated from the same data the visible accordion renders; the gap-find lens programmatically verified all 14 answers appear verbatim in non-script HTML). Sample entity (full block is in the built page):
```json
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
 {"@type":"Question","name":"What is OwlSOC?","acceptedAnswer":{"@type":"Answer","text":"OwlSOC is an AI-powered Security Operations Center (SOC) service that investigates security alerts from Microsoft Sentinel, Microsoft Defender and AWS. When an alert fires, OwlSOC pulls the relevant logs, builds an evidence-linked timeline, maps the attack to MITRE ATT&CK, and returns a plain-language verdict with a recommended action, typically in under two minutes, 24/7. A human on your team approves any action before it runs. It connects read-only with no agents to install, and starts with a £495 30-day refundable pilot. In practice it automates alert triage for Microsoft Sentinel, Defender and AWS: every alert is triaged and fully investigated rather than sampled."}}, "… 13 more"]}
```
No `aggregateRating`, no reviews, no fabricated anything. `</script>`-breakout escaped in the serializer.

## 3. Entity consistency

- **Canonical name: `OwlSOC`** — used in title, og:site_name, all schema `name` fields, manifest, llms.txt, security.txt, copy (36+ occurrences). Zero variants in body text. The split-span wordmark (the one place extractors could read "Owl SOC") now carries `aria-label="OwlSOC"` with the visual spans `aria-hidden`.
- **`sameAs`: intentionally absent.** OwlSOC has **no live external profiles yet** — adding placeholder LinkedIn/Crunchbase/GitHub URLs would be fabrication. `lib/schema.ts` carries a comment marking exactly where to add them the day they exist. This is the single biggest entity-signal gap and it is an **off-page** task (section 9).
- The canonical quotable sentence lives in four mutually consistent places: FAQ answer #1 (visible + FAQPage schema), Service JSON-LD description, and llms.txt.

## 4. Target query → on-page answer map

| Buyer query | Where the liftable answer lives | Status |
|---|---|---|
| "what is an AI SOC" | FAQ #2, dedicated self-contained definition incl. the human-approval gate | ✅ |
| "what is OwlSOC" | FAQ #1 (canonical sentence) + hero subhead + llms.txt | ✅ |
| "automated alert triage for Microsoft Sentinel" / "Defender alert triage" | FAQ #1 closing sentence ("In practice it automates alert triage for Microsoft Sentinel, Defender and AWS…") — added this pass after the gap-find showed 'triage' never co-occurred positively with the tool names | ✅ (fixed) |
| "Sentinel alert investigation service" / "AI security alert investigation" | FAQ #1 + hero + How-it-works step 2 | ✅ |
| "MDR alternative" | FAQ #3 + comparison table MDR column | ✅ |
| "SOC as a service pricing" | Pricing intro now names the category in visible text ("SOC-as-a-service pricing, kept simple…") + 3 tiers in text + Service offers | ✅ (fixed) |
| "do I need a 24/7 SOC team" | FAQ #3 now opens with the direct answer ("Most teams need 24/7 alert coverage; far fewer can justify a 24/7 team on payroll.") + Problem section + comparison table | ✅ (fixed) |

## 5. Content & comparison improvements made

- **Comparison cards → a real semantic `<table>`** (`thead`, `th scope="col"` ×5, `th scope="row"` ×7, sr-only caption): 7 dimensions (cost, time-to-live, alert coverage, works-with-existing-stack, contract, who approves actions, visibility into reasoning) × 4 options (hire a SOC team / do nothing / traditional MDR / OwlSOC). Honest cells, hedged MDR claims ("often", "commonly", "varies by contract"), no competitor names, no bashing. Horizontally scrollable on mobile with a visible hint.
- **3 new answer-shaped FAQ entries** in buyer vocabulary (the three at the top of the map above), placed first in the accordion.
- **Honesty corrections from the gap-find:** fabricated popularity badge "Most teams pick this" → **"Our recommended tier"** (zero customers pre-launch; popularity claims need customers); the site's only superlative ("the best money your security budget spends this quarter") → "If it doesn't earn its keep, ask for it back."; the post-pilot FAQ no longer implies refunds are available after the 30-day window; the 48-hour claim is anchored to **"the OAuth grant"** everywhere (the kickoff-anchored variant was self-undermined by the FAQ's own caveat); the flagship speed claim now reads **"typically in under two minutes"** in meta/OG/Twitter/manifest/footer/How-it-works/Features/stat label — consistent with the schema, FAQ and llms.txt.
- **Accepted residual (documented, deliberate):** the `<h1>` "Every alert, investigated. In under two minutes." and the og.png headline keep the unhedged shorthand — both gap-find lenses rated this survivable marketing shorthand given every prose/structured surface is hedged; revisit if real-world latency data ever stops supporting it.

## 6. Technical status

| Check | Status |
|---|---|
| sitemap.xml (3 real URLs, trailing-slash = canonicals) | 🟢 |
| robots.txt (allow all + sitemap; no deprecated directives) | 🟢 |
| Canonicals (absolute owlsoc.com; 404 excluded) | 🟢 |
| Unique titles + meta descriptions (home description 160 chars, hedged, states what OwlSOC is + pilot) | 🟢 |
| OG/Twitter cards + 1200×630 og.png, per-page tags on legal pages | 🟢 |
| CWV: hero is server-rendered with CSS entrances (visible at first paint), 148 kB first-load JS, single 8.7 kB CSS, zero third-party requests, fonts self-hosted | 🟢 |
| Mobile-first (375 px verified), `<noscript>` fallback, page readable without JS | 🟢 |
| A11y (skip link, landmarks, 1×h1 hierarchy, contrast tokens, focus states, reduced-motion) | 🟢 |
| Crawlability: no noindex on real pages; 404 noindexed; pricing/FAQ/key facts in text; 120 internal refs, 0 dead | 🟢 |
| llms.txt (well-formed; every fact corroborated on-page; adoption caveat: the llms.txt convention is still young — treat as low-cost, modest/uncertain upside, not a ranking lever) | 🟢 |
| Known JS-only content: 2 of 3 demo sample reports render client-side (1 full report + teasers in HTML) | 🟡 accepted — data is synthetic/illustrative; format fully demonstrated by the static one |

## 7. Trust signals

🟢 HTTPS + full security-header set (CSP, HSTS preload, XFO, nosniff, Referrer-Policy, Permissions-Policy, COOP) via `vercel.json`; 🟢 RFC 9116 security.txt; 🟢 privacy policy + terms (counsel review pending — known launch input); 🟢 zero console errors; 🟢 clear contact paths; 🟢 honest founder-led framing ("Who is behind OwlSOC?" + footer "OwlSOC Ltd · Registered in the UK"); 🟢 validation claim scoped to a defined test set in all three places it appears; 🟢 demo triple-labelled synthetic/illustrative; 🟢 AI provider named nowhere (verified across HTML, JS chunks, llms.txt, schema).

## 8. Gap list

**Fixed this pass (in priority order):**
1. Service + FAQPage JSON-LD with real offers and 14-question parity (was: Organization only)
2. Comparison rewritten as an extractable semantic table (was: cards)
3. Answer-shaped FAQ entries for the three unanswered category queries + canonical quotable sentence
4. Honesty corrections: fabricated popularity badge, lone superlative, refund-window conflation, 48h anchor, speed-claim hedging across all quoted surfaces
5. llms.txt + wordmark `aria-label` + `UnitPriceSpecification` recurrence on offers + "SOC as a service" in visible pricing text

**Proposed (not done), with effort/impact:**
| Proposal | Effort | Impact |
|---|---|---|
| Server-render all 3 demo reports (hidden inert panels) | M | Low — synthetic data; 1 full report already in HTML |
| Regenerate og.png with hedged tagline | S | Low — accepted shorthand; do it if convenient |
| BreadcrumbList JSON-LD | S | Negligible for a single-page site — skip until multi-page |
| Blog/guides answering category queries in depth ("how to triage Sentinel alerts") | L | High over time — the strongest on-page lever left, feeds off-page citations |
| LazyMotion bundle trim (~15–20 kB) | M | Low-medium (CWV already good) — post-launch |

## 9. Off-page next actions (for you — this is where most AI-recommendation weight lives)

1. **Create the entity profiles, then add them to `sameAs`** in `lib/schema.ts`: LinkedIn company page, Crunchbase, GitHub org, X/Twitter. This is the #1 disambiguation signal and currently empty.
2. **Google Search Console + Bing Webmaster Tools**: verify owlsoc.com, submit `sitemap.xml` to both (Bing matters double: it feeds several AI assistants' retrieval).
3. **Companies House visibility**: make sure OwlSOC Ltd's public record is findable and add the registration number to the site footer (also a pending launch input).
4. **Directories/marketplaces buyers and models actually read**: G2 + Capterra (security category), AlternativeTo, Product Hunt launch, Microsoft commercial marketplace / Azure Marketplace listing (high-signal for "works with Sentinel/Defender" queries), AWS Partner/Marketplace path later.
5. **Genuine citations**: pilot-customer case studies (with permission), founder posts on detection engineering (the FAQ's validation-scenario content makes good material), answers on r/cybersecurity / security Slacks where the question is literally "MDR alternative for Sentinel?", and a launch note to security newsletters. No paid link schemes.
6. **Reviews only when real**: once pilots convert, ask for G2 reviews; only then consider `aggregateRating` markup. Never before.

## 10. Honesty confirmation

No fabricated or unverifiable claims were introduced; this pass **removed** three (the popularity badge, the lone superlative, the refund-window implication) and hedged two flagship numerics to match the defensible formulation. The adversarial trust lens verified: no "best/#1/leading/guaranteed", no invented ratings/reviews/profiles, validation claims scoped to a defined test set, demo labelled synthetic, AI provider unnamed anywhere, and llms.txt/JSON-LD/meta/visible copy mutually consistent on every number (£495/£1,495/£2,995, 30 days, 48h-of-grant, typically-under-2-min). Build: clean, 12/12 pages, 0 dead links, launch-review checks still pass.
