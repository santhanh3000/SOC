// Content/SEO pages, assembled from in-brand drafts (honesty-reviewed). Edit prose here.
import type { Metadata } from 'next'
import type { ArticleContent } from '@/components/ArticlePage'
import { BRAND } from './site'

export type SeoPage = ArticleContent & { metaTitle: string; metaDescription: string }

export const SEO_PAGES: Record<string, SeoPage> = {
  "ai-soc": {
    "slug": "ai-soc",
    "eyebrow": "AI SOC",
    "metaTitle": "What Is an AI SOC? Definition & How It Works | OwlSOC",
    "metaDescription": "An AI SOC triages and investigates every security alert at machine speed, then a human approves any action. Here is what it is, how it differs from a traditional SOC, and where the limits are.",
    "h1": "What is an AI SOC?",
    "lede": "An AI SOC is a security operations capability that uses AI to triage and investigate every security alert at machine speed, then hands a human a clear verdict and a recommended action to approve. The AI does the investigation work; a person stays in control of anything that changes your environment.",
    "sections": [
      {
        "h2": "AI SOC, defined",
        "paragraphs": [
          "An AI SOC (AI security operations centre) is an AI-driven layer over your existing security tools that does the first-pass work of a security operations centre: it triages alerts, correlates the surrounding logs, builds a timeline, and writes up what it found. A traditional SOC does this with analysts on shift. An AI SOC does it on every alert, in minutes, around the clock.",
          "The point is not to remove people. It is to change what the queue looks like by the time a person reads it. Instead of a raw alert with no context, an analyst gets a sourced investigation and a recommended next step, and decides from there."
        ]
      },
      {
        "h2": "How it differs from a traditional SOC and from plain automation",
        "paragraphs": [
          "A traditional SOC is constrained by analyst hours. Not every alert gets a full investigation; depth and consistency vary by shift and by how busy the queue is. An AI SOC removes the hours constraint from triage: every alert is investigated the same way, whether it fires at 11am on a Tuesday or 3am on a Sunday.",
          "It is also more than a SOAR playbook. Automation runs fixed if-this-then-that rules; it cannot reason about an alert it has not seen before or explain why a signal matters. An AI SOC reads the actual evidence, reasons across sources, and produces a narrative a human can check line by line. The difference that matters: automation executes predefined steps, while an AI SOC investigates and explains."
        ],
        "bullets": [
          "Coverage: every alert investigated, not a sample or a nine-second glance.",
          "Latency: a full write-up in minutes, not a place in a queue.",
          "Reasoning: it correlates and explains rather than matching a fixed rule.",
          "Evidence: every claim links back to a source log, so the work is auditable."
        ]
      },
      {
        "h2": "What a good AI SOC does on every alert",
        "paragraphs": [
          "A useful AI SOC turns a single alert into a decision-ready case. It should pull the relevant logs from across your sources, work out what is connected, and present it as something a human can act on without re-doing the investigation themselves."
        ],
        "bullets": [
          "Correlate signals across sources rather than judging the alert in isolation.",
          "Build an evidence-linked timeline where every step cites the source log or pivot.",
          "Map the activity to MITRE ATT&CK so the technique is named, not guessed.",
          "Resolve the affected entities — which user, device, session, and account.",
          "Give a plain-language, hedged verdict: likely true positive, likely false positive, or uncertain — needs review.",
          "Recommend a next action and let a human approve or reject it."
        ]
      },
      {
        "h2": "Where the human stays in the loop",
        "paragraphs": [
          "An AI SOC should investigate and recommend; a human approves anything that touches your environment. The verdict is deliberately hedged — likely true positive, likely false positive, or uncertain — because a calibrated maybe is more honest, and more useful, than a false certainty.",
          "Containment is the line that matters most. A safe AI SOC does not act on its own. Any action — isolating a device, revoking a session — runs only after a person approves that specific action, and only on the write access you have explicitly granted. Everything is logged. Reversible actions can be undone; the few that cannot are flagged before approval."
        ]
      },
      {
        "h2": "Where the limits are",
        "paragraphs": [
          "An AI SOC is not a guarantee and should not be sold as one. It will get cases wrong, the same way a human analyst will, which is why the verdict stays hedged and ambiguous cases are surfaced as needs review rather than miscalled. It reasons over the signals it can see, so its quality depends on the logs and connectors it has access to.",
          "It also depends on a human acting on the output. An AI SOC shortens the path from alert to informed decision; it does not make the decision to contain on your behalf. Treat it as a force multiplier for your team and your existing tooling, not a replacement for either."
        ]
      },
      {
        "h2": "How OwlSOC does it",
        "paragraphs": [
          "OwlSOC is an AI SOC that sits read-only on top of the tools you already run — Microsoft Sentinel, Microsoft Defender (Endpoint and Office), and AWS Security Hub — with no agents to install. (AWS GuardDuty and Entra ID are scoped on request, not shipped today.) It works in two tiers. Standard deterministic triage runs on every alert and returns a score. The AI investigation — calibrated confidence, a root-cause narrative, and the hedged true-positive/false-positive verdict — is the deeper step included in the paid tiers.",
          "Each AI investigation produces an evidence-linked timeline, MITRE ATT&CK mapping, resolved entities, a plain-language verdict, and a recommended action, typically in under two minutes, 24/7. A human on your team approves any containment before it runs; execution is write-grant-gated. You can review every case in the client portal, where each claim pivots back to its source log, and export case reports (incl. PDF) to support your own SOC 2, ISO 27001, or GDPR reporting.",
          "It starts with a £495, 30-day fully refundable pilot, then from £495 a month per monitored environment — monthly, no minimum term, read-only by default, and live within roughly 48 hours of access."
        ]
      }
    ],
    "faqs": [
      {
        "q": "What is an AI SOC?",
        "a": "An AI SOC is a security operations capability that uses AI to triage and investigate security alerts at machine speed — correlating logs, building an evidence-linked timeline, mapping MITRE ATT&CK, and returning a hedged verdict with a recommended action. Every alert gets a full investigation in minutes, day or night. A human approves any action before it touches your environment."
      },
      {
        "q": "Is an AI SOC the same as MDR?",
        "a": "Not quite. Managed detection and response (MDR) is usually a third-party team, often with its own tooling and a multi-year contract. An AI SOC is a capability that does the investigation work with AI and can sit on top of the security stack you already run. OwlSOC, for example, connects read-only to Microsoft Sentinel, Defender, and AWS rather than replacing them, and your team keeps full visibility into the reasoning behind every case."
      },
      {
        "q": "Does an AI SOC replace analysts?",
        "a": "No. An AI SOC does the first-pass triage and investigation so analysts spend their time on decisions rather than legwork. It produces a sourced verdict and a recommended action; a person reviews it and decides. If you have no analysts, it gives a small team investigation depth they could not otherwise staff; if you do, it clears the queue so they handle the cases that matter."
      },
      {
        "q": "Is an AI SOC safe, or does it act on its own?",
        "a": "A well-built AI SOC does not act on its own. It investigates and recommends; a human approves any containment before it runs, and execution is limited to the write access you have explicitly granted. With OwlSOC, the default connection is read-only, every action is logged, reversible actions can be undone, and the few that cannot are flagged before you approve them."
      },
      {
        "q": "How is an AI SOC different from a SOAR or automation playbook?",
        "a": "Automation and SOAR run fixed, predefined rules and cannot reason about an alert they have not been scripted for. An AI SOC reads the actual evidence, correlates across sources, and explains its reasoning in a way a human can check line by line. Automation executes steps; an AI SOC investigates and explains, then leaves the action to a human."
      },
      {
        "q": "How fast is an AI SOC?",
        "a": "A good AI SOC investigates each alert typically in under two minutes, 24/7, rather than leaving it in a queue for an analyst. Speed is not the only point — coverage is. Because there is no analyst-hours constraint on triage, every alert gets the same full investigation regardless of the time of day or how busy the queue is."
      }
    ],
    "related": [
      {
        "label": "AI SOC vs MDR",
        "href": "/ai-soc-vs-mdr/"
      },
      {
        "label": "AI SOC vs hiring a SOC team",
        "href": "/ai-soc-vs-soc-team/"
      },
      {
        "label": "Microsoft Sentinel alert triage",
        "href": "/microsoft-sentinel/"
      }
    ]
  },
  "ai-soc-vs-mdr": {
    "slug": "ai-soc-vs-mdr",
    "eyebrow": "Comparison",
    "metaTitle": "AI SOC vs MDR: A Fair Comparison | OwlSOC",
    "metaDescription": "AI SOC vs MDR compared: coverage, latency, transparency, where it runs, who approves actions, and cost. An honest MDR alternative for Sentinel, Defender and AWS.",
    "h1": "AI SOC vs MDR: how the two models actually differ",
    "lede": "An AI SOC investigates every alert in minutes on top of the security tools you already run; traditional MDR pairs human analysts with a managed platform, often triaging a sample under an SLA. The right choice depends on whether you want full coverage and visible reasoning on your existing Sentinel, Defender or AWS estate, or a mature, human-led service you outsource end to end.",
    "sections": [
      {
        "h2": "What each model is",
        "paragraphs": [
          "MDR (Managed Detection and Response) is a mature, human-led service. A provider runs a SOC for you: analysts, often a managed detection platform, defined SLAs, and a contract. It is broad, proven, and has been the default outsourced-security answer for years.",
          "An AI SOC is a different shape. OwlSOC connects read-only to the tooling you already run and investigates the alerts it produces. When an alert fires, it pulls the relevant logs, builds an evidence-linked timeline, maps the activity to MITRE ATT&CK, and returns a plain-language verdict, typically in under two minutes, 24/7. It investigates and recommends; a human on your team approves any action before it runs."
        ]
      },
      {
        "h2": "Coverage: every alert vs sampled or SLA-queued",
        "paragraphs": [
          "This is the clearest difference. An AI SOC investigates every alert in full, not just the ones an analyst gets to. A mid-sized estate can fire hundreds of alerts a day, and human-led models commonly cope by tiering, sampling, or queuing lower-severity alerts under an SLA. That is a reasonable response to finite analyst hours, but it means quiet, low-scored alerts can sit in a queue.",
          "OwlSOC runs standard deterministic triage on every alert to score it. The AI investigation step, included in the paid tiers, then produces the calibrated confidence, the root-cause narrative, and the hedged verdict. Coverage does not depend on how busy the queue is that night."
        ]
      },
      {
        "h2": "Latency and transparency",
        "paragraphs": [
          "On latency, an AI SOC returns a full investigation typically in under two minutes, at any hour, because it does not wait for an analyst to pick the ticket up. MDR latency varies by tier and SLA, and human review adds judgement that automation cannot fully replace.",
          "Transparency is where the gap is widest. With MDR you usually receive a summary-level finding from the provider's platform. With OwlSOC you see the reasoning and the source logs: every claim in the timeline cites a source log line or pivot ID, so your team can open any step, check it, and disagree with the verdict. Verdicts stay hedged, likely true positive, likely false positive, or uncertain and needs review, rather than asserting a confirmed threat."
        ],
        "bullets": [
          "Coverage: every alert investigated vs sampled or SLA-queued",
          "Latency: typically under two minutes, 24/7 vs varies by SLA and analyst availability",
          "Transparency: source-linked reasoning you can audit vs summary-level findings"
        ]
      },
      {
        "h2": "Where it runs, and who approves actions",
        "paragraphs": [
          "An AI SOC sits on top of your existing stack. OwlSOC connects to Microsoft Sentinel, Microsoft Defender (Endpoint and Office), and AWS Security Hub, read-only by default, with no agents to install and no migration. You are live within roughly 48 hours of granting access. MDR engagements more commonly involve onboarding the provider's tooling and a longer contract; this varies by vendor.",
          "On response, OwlSOC is human-approval-gated and write-grant-gated. It can execute an approved action, such as revoking a session or isolating a device, but only after a human on your team approves the specific action and only on the write scopes you have granted. It is not autonomous. MDR providers typically take defined response actions on your behalf under the terms of the engagement, with their analysts in the loop."
        ]
      },
      {
        "h2": "Cost shape",
        "paragraphs": [
          "The commercial models differ as much as the technical ones. MDR is commonly priced in five figures a year and structured around annual or multi-year contracts. That can be the right fit for an organisation that wants a full service it does not have to operate.",
          "OwlSOC starts from £495 a month per monitored environment, billed monthly with no minimum term. You begin with a £495, 30-day, fully-refundable pilot on one environment, so the proof sits on your own alerts before any commitment. Read-only by default, no agents, live within roughly 48 hours of access."
        ]
      },
      {
        "h2": "When MDR still makes sense",
        "paragraphs": [
          "MDR is the better answer in several cases, and it would be dishonest to pretend otherwise. If you want to fully outsource security operations and have a provider own response end to end, that is what MDR is built for. If your estate spans tooling well beyond Microsoft and AWS, or you need broad coverage across many heterogeneous sources today, a mature MDR may fit better.",
          "Human-led services also bring seasoned analyst judgement, threat-hunting, and relationships that a young product is still building. Some organisations have procurement or regulatory reasons to prefer an established, contracted managed service. The two models are not mutually exclusive: OwlSOC can do first-pass triage so analysts, in-house or via MDR, only handle the cases that warrant a human."
        ],
        "bullets": [
          "You want to fully outsource response, not just triage",
          "Your estate spans tooling well beyond Microsoft and AWS today",
          "You need broad coverage across many heterogeneous sources now",
          "Procurement or regulation favours an established, contracted service"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is an AI SOC an MDR alternative or a replacement?",
        "a": "It can be either, depending on your needs. For teams that mainly need fast, full investigation of Microsoft and AWS alerts on their existing stack, an AI SOC like OwlSOC can stand in for MDR. For teams that want a provider to fully own response end to end, MDR remains the better fit, and OwlSOC can run alongside it doing first-pass triage."
      },
      {
        "q": "Does an AI SOC replace human analysts?",
        "a": "No. OwlSOC does the first-pass investigation on every alert and recommends an action, but a human on your team approves anything before it touches your environment. It is human-approval-gated and write-grant-gated, not autonomous. If you have analysts, it handles triage so they focus on the cases that warrant a human."
      },
      {
        "q": "How is AI SOC pricing different from MDR pricing?",
        "a": "OwlSOC starts from £495 a month per monitored environment, billed monthly with no minimum term, beginning with a £495 30-day fully-refundable pilot. Traditional MDR is commonly priced in five figures a year and structured around annual or multi-year contracts, though this varies by provider."
      },
      {
        "q": "Do I have to migrate tools to use an AI SOC?",
        "a": "No. OwlSOC connects read-only to Microsoft Sentinel, Microsoft Defender (Endpoint and Office), and AWS Security Hub with no agents to install and no migration. You are typically live within roughly 48 hours of granting access. MDR engagements more often involve onboarding the provider's own tooling."
      },
      {
        "q": "Can I see the reasoning behind a verdict, or just a summary?",
        "a": "You see the reasoning. Every claim in the OwlSOC timeline cites a source log line or pivot ID, so your team can open any step, verify it, and disagree with the verdict. Verdicts are hedged as likely true positive, likely false positive, or uncertain and needs review. MDR findings are commonly summary-level by comparison."
      }
    ],
    "related": [
      {
        "label": "What is an AI SOC?",
        "href": "/ai-soc/"
      },
      {
        "label": "AI SOC vs hiring a SOC team",
        "href": "/ai-soc-vs-soc-team/"
      },
      {
        "label": "Microsoft Sentinel alert triage",
        "href": "/microsoft-sentinel/"
      }
    ]
  },
  "ai-soc-vs-soc-team": {
    "slug": "ai-soc-vs-soc-team",
    "eyebrow": "Comparison",
    "metaTitle": "AI SOC vs Hiring a SOC Team | OwlSOC",
    "metaDescription": "AI SOC vs building an in-house 24/7 SOC team: compare cost, time to live, and coverage. £500k+/year vs from £495/month, live in days.",
    "h1": "AI SOC vs hiring a SOC team: build vs buy",
    "lede": "An in-house 24/7 SOC team costs north of £500k a year fully loaded and takes 6 to 12 months to hire and ramp. An AI SOC gives you 24/7 alert coverage on top of your existing stack from £495 a month, live within days. For most small-to-mid teams, the AI SOC is the faster, cheaper way to get coverage, and if you already have analysts it hands them confirmed, evidence-linked cases instead of raw alerts.",
    "sections": [
      {
        "h2": "What a 24/7 in-house SOC team actually costs",
        "paragraphs": [
          "Running a security operations centre around the clock is a staffing problem before it is a tooling problem. Covering 168 hours a week with no single point of failure means five or more analysts on a shift rota, plus a SOC lead and a manager to set detections, run handovers, and own escalations. Add SIEM licensing, on-call, training, and recruitment, and a genuine 24/7 function lands north of £500k a year fully loaded.",
          "The cost is only half of it. Hiring and ramping a team typically takes 6 to 12 months, and SOC analyst churn is high, so you are re-hiring and re-training on a rolling basis. For a small-to-mid organisation, that is a large fixed commitment to stand up before a single alert is investigated."
        ],
        "bullets": [
          "Headcount: 5+ analysts on shift, a lead, and a manager for real 24/7 cover",
          "Fully loaded cost: north of £500k a year",
          "Time to live: 6 to 12 months to hire and ramp",
          "Retention: high churn means continuous re-hiring and re-training",
          "Tooling and licensing sit on top of the salary bill"
        ]
      },
      {
        "h2": "What an AI SOC does instead",
        "paragraphs": [
          "An AI SOC does the first-pass triage and investigation work at machine speed, on top of the tooling you already run. OwlSOC connects to Microsoft Sentinel, Microsoft Defender (Endpoint and Office), and AWS Security Hub, read-only by default, with no agents to install. When an alert fires, standard deterministic triage scores every alert, and the AI investigation step pulls the relevant logs, builds an evidence-linked timeline where every claim cites a source log or pivot ID, maps the activity to MITRE ATT&CK, and returns a plain-language verdict, typically in under two minutes, 24/7.",
          "Verdicts are hedged on purpose: likely true positive, likely false positive, or uncertain and needs review. The AI investigation, which carries the calibrated confidence and the root-cause narrative, is a separate step included in the paid tiers, not the base output. OwlSOC investigates and recommends; a human on your team approves any action before it runs, and execution is write-grant-gated through a write connector. It is not autonomous."
        ]
      },
      {
        "h2": "Build vs buy, side by side",
        "paragraphs": [
          "The honest comparison is not feature-for-feature, it is what you are committing to and how fast you get coverage. A team gives you deep human judgement and the ability to handle anything, at a high fixed cost and a long lead time. An AI SOC gives you consistent 24/7 triage and investigation across every alert, live in days, billed monthly with no minimum term."
        ],
        "bullets": [
          "Cost: £500k+/year for a team vs from £495/month per monitored environment",
          "Time to live: 6 to 12 months to hire vs within ~48 hours of access",
          "Coverage: depth and consistency vary by shift vs every alert triaged, with AI investigation on each",
          "Existing stack: a team works with it; OwlSOC sits on top of Sentinel, Defender, or AWS, read-only first",
          "Commitment: permanent headcount vs monthly billing, no minimum term, 30-day fully-refundable pilot",
          "Who approves containment: your team in both cases; with OwlSOC every action is human-approved and logged"
        ]
      },
      {
        "h2": "It augments a security function, it does not replace one",
        "paragraphs": [
          "Be clear-eyed about the boundary. An AI SOC does first-pass triage and investigation; it does not replace a security function, threat hunting, detection engineering, or incident command. If you have no security capability today, OwlSOC gives you 24/7 coverage you would otherwise have no way to afford, and a human still approves anything that touches your environment.",
          "If you already have analysts, the value is different. Instead of working a queue of raw alerts, your team receives confirmed, evidence-linked cases with the timeline, the MITRE mapping, the affected entities already resolved, and a recommended action ready for approval. The repetitive triage that burns out analysts gets handled before it reaches them, so their time goes to the cases that genuinely need a human."
        ]
      },
      {
        "h2": "When each option makes sense",
        "paragraphs": [
          "Build an in-house 24/7 SOC when the scale, regulatory posture, or risk profile justifies a permanent team and you can absorb the cost and the hiring timeline. Buy an AI SOC when you need coverage now, you run Sentinel, Defender, or AWS, and you want to prove value before committing budget. The two are not mutually exclusive: many teams run OwlSOC as the always-on first pass and keep their analysts for the work that needs them."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is an AI SOC cheaper than hiring a SOC team?",
        "a": "For most small-to-mid teams, yes. A genuine 24/7 in-house SOC runs north of £500k a year fully loaded once you account for 5+ analysts on a rota, a lead, a manager, and tooling. OwlSOC starts from £495 a month per monitored environment, billed monthly with no minimum term."
      },
      {
        "q": "Can an AI SOC replace my SOC analysts?",
        "a": "No. An AI SOC does first-pass triage and investigation; it does not replace a security function, threat hunting, or incident command. If you already have analysts, OwlSOC hands them confirmed, evidence-linked cases with a recommended action instead of raw alerts, so their time goes to the cases that need a human."
      },
      {
        "q": "How fast can an AI SOC be running compared with hiring?",
        "a": "Hiring and ramping a 24/7 team typically takes 6 to 12 months. OwlSOC is live within about 48 hours of being granted access, with no agents to install and read-only connections to your existing stack by default."
      },
      {
        "q": "Does the AI take containment actions on its own?",
        "a": "No. OwlSOC investigates and recommends; a human on your team approves any action before it runs, and execution is write-grant-gated through a write connector. Verdicts are hedged as likely true positive, likely false positive, or uncertain and needs review, never as a confirmed threat."
      },
      {
        "q": "Which tools does an AI SOC work with?",
        "a": "OwlSOC connects to Microsoft Sentinel, Microsoft Defender (Endpoint and Office), and AWS Security Hub, sitting on top of the stack you already run. Other sources such as AWS GuardDuty or Entra ID can be scoped on request but are not shipped today."
      }
    ],
    "related": [
      {
        "label": "What is an AI SOC?",
        "href": "/ai-soc/"
      },
      {
        "label": "AI SOC vs MDR",
        "href": "/ai-soc-vs-mdr/"
      },
      {
        "label": "Microsoft Defender investigation",
        "href": "/microsoft-defender/"
      }
    ]
  },
  "microsoft-sentinel": {
    "slug": "microsoft-sentinel",
    "eyebrow": "Use case",
    "metaTitle": "Automate Microsoft Sentinel Alert Triage | OwlSOC",
    "metaDescription": "AI triage and investigation for Microsoft Sentinel incidents. Read-only OAuth, MITRE ATT&CK mapping, evidence-linked verdicts, human-approved containment.",
    "h1": "Automate Microsoft Sentinel alert triage with OwlSOC",
    "lede": "OwlSOC connects to Microsoft Sentinel read-only over OAuth, then triages and investigates every incident it raises. For each one it pulls the relevant logs, correlates across your sources, resolves the affected entities, maps the activity to MITRE ATT&CK, and returns a hedged verdict with a recommended action, typically in under two minutes. A human on your team approves any containment before it runs.",
    "sections": [
      {
        "h2": "How OwlSOC connects to Microsoft Sentinel",
        "paragraphs": [
          "Read-only, over OAuth, with nothing to install. You grant OwlSOC delegated read access to the Sentinel workspace and the Log Analytics tables behind it. There are no agents, no collectors, and nothing in your traffic path. OwlSOC reads the incidents Sentinel already raises and the logs it already holds.",
          "Access is scoped to the security signal needed to investigate an alert, and it is auditable from your side. Most environments are live within roughly 48 hours of the OAuth grant being approved, which is usually the slowest part on your end."
        ],
        "bullets": [
          "OAuth delegated read access, no service accounts to manage",
          "No agents, sensors, or log forwarding to deploy",
          "Read-only by default; write access is a separate, explicit grant",
          "UK / EU data residency, encrypted in transit and at rest"
        ]
      },
      {
        "h2": "What OwlSOC does with each Sentinel incident",
        "paragraphs": [
          "Every incident gets two layers of work. First, standard deterministic triage runs on every alert and scores it, with no calibrated confidence. Then the AI investigation, included in the paid tiers, does the work an analyst would: it pulls the relevant logs from Sentinel and your other connected sources, correlates the signals, and resolves the user, device, and network entities involved.",
          "The output reads like an analyst's write-up, not a raw alert. You get a chronological, evidence-linked timeline, MITRE ATT&CK technique mapping, the resolved affected entities, and a plain-language verdict with a recommended next action. The verdict is hedged on purpose: likely true positive, likely false positive, or uncertain and flagged for review. The AI investigation also carries a calibrated confidence figure and a root-cause narrative."
        ],
        "bullets": [
          "Pulls and correlates the logs behind the incident, across sources",
          "Resolves affected users, devices, and network entities",
          "Maps observed activity to MITRE ATT&CK techniques",
          "Hedged verdict plus a recommended action, typically under two minutes",
          "Runs 24/7, including the 3am alert nobody is awake for"
        ]
      },
      {
        "h2": "Every claim links back to the Sentinel console",
        "paragraphs": [
          "The timeline is evidence-linked. Each line cites the source log or pivot ID it came from, and those IDs trace back to the original record in the Sentinel console. Your analyst can click through from any claim in the verdict to the exact log line that supports it, then disagree with it if the evidence does not hold up.",
          "That matters because an investigation you cannot check is just another alert. OwlSOC shows its working so your team keeps full ownership of the decision."
        ]
      },
      {
        "h2": "How containment works",
        "paragraphs": [
          "OwlSOC investigates and recommends. A human approves. It does not take containment actions on its own. When an investigation suggests a response, the recommended action sits in the client portal until someone on your team approves or rejects it.",
          "Execution is write-grant gated. Approved actions run through a write connector only on the specific scopes you have granted, and only after that human approval. Everything is logged. Reversible actions can be undone; the few that cannot be reversed are flagged before you approve."
        ]
      },
      {
        "h2": "For a team drowning in Sentinel alerts",
        "paragraphs": [
          "A mid-sized estate can fire hundreds of Sentinel incidents a day. Most are noise, a few are not, and a small team cannot fully investigate all of them, so alerts get a nine-second glance or a place in a queue. OwlSOC investigates every one to the same depth, so triage stops being a sampling exercise.",
          "If you already have analysts, OwlSOC does the first-pass investigation and hands them a sourced write-up, so they spend their time on the cases that warrant a human rather than on clearing the queue. It sits on top of the Sentinel you already run, so there is no migration."
        ]
      },
      {
        "h2": "Try it on your own Sentinel alerts",
        "paragraphs": [
          "OwlSOC starts with a £495, 30-day fully-refundable pilot on one monitored environment, so the proof sits on your own data rather than a slide. After that it is from £495 per month per monitored environment, billed monthly with no minimum term. Read-only by default, no agents to install, and live within roughly 48 hours of access.",
          "Alongside Microsoft Sentinel, OwlSOC connects to Microsoft Defender for Endpoint and Office and to AWS Security Hub. If a source you depend on is not on that list, such as AWS GuardDuty or Entra ID, tell us and we will scope it."
        ]
      }
    ],
    "faqs": [
      {
        "q": "How does OwlSOC connect to Microsoft Sentinel?",
        "a": "Over OAuth with read-only delegated access to your Sentinel workspace and the underlying Log Analytics tables. There are no agents to install and nothing in your traffic path. Most environments are investigating live alerts within roughly 48 hours of the OAuth grant being approved."
      },
      {
        "q": "Does OwlSOC investigate every Sentinel incident or just a sample?",
        "a": "Every incident. Standard deterministic triage scores every alert, and the AI investigation, included in the paid tiers, runs a full investigation on each one: pulling the relevant logs, correlating across sources, resolving entities, mapping MITRE ATT&CK, and returning a hedged verdict, typically in under two minutes, 24/7."
      },
      {
        "q": "Can OwlSOC contain a threat in Sentinel automatically?",
        "a": "No. OwlSOC investigates and recommends; a human on your team approves any action before it runs. Approved actions execute through a write connector only on the write scopes you have explicitly granted, and everything is logged. Reversible actions can be undone, and the few that cannot are flagged before approval."
      },
      {
        "q": "Can I trace an OwlSOC verdict back to the original Sentinel logs?",
        "a": "Yes. The investigation timeline is evidence-linked: every claim cites the source log line or pivot ID it came from, and those IDs trace back to the original record in the Sentinel console. Your analyst can verify any line of the verdict and disagree with it if the evidence does not support it."
      }
    ],
    "related": [
      {
        "label": "What is an AI SOC?",
        "href": "/ai-soc/"
      },
      {
        "label": "Microsoft Defender investigation",
        "href": "/microsoft-defender/"
      },
      {
        "label": "AWS Security Hub triage",
        "href": "/aws-security-hub/"
      }
    ]
  },
  "microsoft-defender": {
    "slug": "microsoft-defender",
    "eyebrow": "Use case",
    "metaTitle": "Automate Microsoft Defender Alert Triage | OwlSOC",
    "metaDescription": "Investigate Microsoft Defender for Endpoint and Office alerts in minutes. OwlSOC connects read-only, builds an evidence-linked timeline, returns a hedged verdict.",
    "h1": "Microsoft Defender alert investigation, automated",
    "lede": "OwlSOC investigates every Microsoft Defender alert — Endpoint and Office — and returns an evidence-linked timeline, a MITRE ATT&CK mapping and a plain-language verdict, typically in under two minutes, 24/7. It connects read-only, and a human on your team approves any containment before it runs.",
    "sections": [
      {
        "h2": "The problem with Defender alerts",
        "paragraphs": [
          "Defender is good at firing alerts. It is less good at telling you which ones matter. A mid-sized estate running Defender for Endpoint and Defender for Office can surface hundreds of signals a day — encoded-PowerShell executions, suspicious child processes, OAuth consent grants, phishing and adversary-in-the-middle (AiTM) sign-ins. Most are noise. A few are not.",
          "Triaging that volume by hand means analysts skim, sample, or queue. The 3am alert waits until morning. OwlSOC investigates every alert the same way a careful analyst would, and does it in minutes rather than leaving it in a queue."
        ]
      },
      {
        "h2": "How OwlSOC investigates a Defender alert",
        "paragraphs": [
          "When a Defender alert fires, OwlSOC pulls the surrounding signal — process trees, identity and device context, mail events, sign-in logs — and reasons over it. It resolves the affected entities, maps the activity to MITRE ATT&CK, and builds a timeline where every claim cites its source. You can click from any line of the narrative to the exact Defender record behind it.",
          "The output is written in plain language: what happened, why it matters, and how sure we are. No screen of raw JSON to interpret under pressure."
        ],
        "bullets": [
          "Endpoint signals: encoded or obfuscated PowerShell, suspicious Office child processes, credential-access and lateral-movement behaviour",
          "Office signals: phishing and AiTM sign-ins, malicious OAuth consent grants, mailbox and forwarding-rule abuse",
          "Affected-entity resolution across account, device, IP and indicator",
          "MITRE ATT&CK technique mapping for every case",
          "An evidence-linked timeline — each step references a source Defender record or pivot ID"
        ]
      },
      {
        "h2": "Verdicts you can check, not just trust",
        "paragraphs": [
          "Every case gets standard deterministic triage: a score and a one-line summary on each alert. The AI investigation — a calibrated confidence percentage, a root-cause narrative, alternative hypotheses and the verdict — is a separate step included in the paid tiers.",
          "Verdicts are hedged on purpose. OwlSOC returns likely true positive, likely false positive, or uncertain — needs review. There is no green tick that says confirmed. Ambiguous cases are flagged for review rather than miscalled, and because the timeline is fully sourced, your team can disagree with any conclusion and see exactly why OwlSOC reached it."
        ]
      },
      {
        "h2": "Containment stays under your control",
        "paragraphs": [
          "OwlSOC does not act on your tenant by itself. It investigates and recommends; a human approves. For a confirmed phishing-driven compromise it might recommend revoking the session and blocking the indicator — but those actions only execute through a write connector after someone on your team approves the specific action, and only if you have granted the write scope. The API enforces this regardless of what the portal shows.",
          "By default OwlSOC connects read-only. Every recommended and approved action is logged in an action trail; reversible actions can be undone, and the few that cannot are flagged before approval."
        ]
      },
      {
        "h2": "Connecting Defender to OwlSOC",
        "paragraphs": [
          "Connection is an OAuth grant — read-only by default, no agents to install and nothing to deploy to your endpoints. OwlSOC reads the security signal it needs to investigate an alert and nothing outside that scope; it does not read mail content or files.",
          "Most pilots are investigating live Defender alerts within about 48 hours of the grant. The slowest part is usually getting the grant approved on your side."
        ],
        "bullets": [
          "Read-only by default; no agents, no migration",
          "Live within roughly 48 hours of access",
          "£495 for a 30-day, fully-refundable pilot on one environment",
          "From £495 per month per monitored environment after that — monthly, no minimum term"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Does OwlSOC cover both Defender for Endpoint and Defender for Office?",
        "a": "Yes. OwlSOC investigates Microsoft Defender for Endpoint and Defender for Office signals — for example encoded-PowerShell execution and suspicious Office child processes on the endpoint side, and phishing, adversary-in-the-middle sign-ins and malicious OAuth consent grants on the Office side."
      },
      {
        "q": "Will OwlSOC isolate a device or revoke a session automatically?",
        "a": "No. OwlSOC investigates and recommends; a human on your team approves any action. Containment executes through a write connector only after someone approves the specific action, and only if you have granted the write scope. By default the connection is read-only."
      },
      {
        "q": "How does OwlSOC connect to Microsoft Defender?",
        "a": "Through a read-only OAuth grant, with no agents to install. OwlSOC reads only the security signal needed to investigate an alert and nothing outside that scope. Most pilots are investigating live Defender alerts within about 48 hours of the grant being approved."
      },
      {
        "q": "How fast does an investigation complete?",
        "a": "Typically in under two minutes per alert, running 24/7. Every alert is investigated rather than sampled, so a 3am Defender alert is worked through at 3am instead of waiting in a queue until morning."
      }
    ],
    "related": [
      {
        "label": "What is an AI SOC?",
        "href": "/ai-soc/"
      },
      {
        "label": "Microsoft Sentinel alert triage",
        "href": "/microsoft-sentinel/"
      },
      {
        "label": "AWS Security Hub triage",
        "href": "/aws-security-hub/"
      }
    ]
  },
  "aws-security-hub": {
    "slug": "aws-security-hub",
    "eyebrow": "Use case",
    "metaTitle": "AWS Security Hub Alert Triage with AI | OwlSOC",
    "metaDescription": "OwlSOC connects read-only to AWS Security Hub, investigates findings, maps MITRE ATT&CK, and returns a hedged verdict plus a human-approved action.",
    "h1": "AI triage and investigation for AWS Security Hub",
    "lede": "OwlSOC connects read-only to AWS Security Hub, investigates each finding, and returns a hedged verdict with a recommended action, typically in under two minutes, 24/7. A human on your team approves any containment before it runs.",
    "sections": [
      {
        "h2": "What OwlSOC does with an AWS Security Hub finding",
        "paragraphs": [
          "When a finding lands in AWS Security Hub, OwlSOC reads it, pulls the surrounding signals, and works it like an analyst would. It correlates related events, resolves the affected entities, maps the activity to MITRE ATT&CK, and writes an evidence-linked timeline where every claim cites a source log or pivot ID. You get a plain-language verdict and a recommended action, not a higher-priority queue.",
          "It runs on every finding, not a sample. A mid-sized AWS estate can fire hundreds of findings a day across config drift, IAM, and threat detections, and most teams triage by gut feel under load. OwlSOC investigates each one and tells you which ones actually warrant attention."
        ],
        "bullets": [
          "IAM anomalies — unusual role assumption, new access keys, privilege changes",
          "Exposed resources — public S3 buckets, open security groups, exposed snapshots",
          "Suspicious API calls — from unfamiliar regions, principals, or sources",
          "Affected-entity resolution across accounts, principals, and resources"
        ]
      },
      {
        "h2": "Two tiers: standard triage and AI investigation",
        "paragraphs": [
          "Standard deterministic triage runs on every finding. It scores the finding and applies repeatable rules; the default verdict is \"uncertain — needs review\" rather than a guess. This is the baseline on every alert.",
          "The AI investigation is a separate step included in the paid tiers. It produces a calibrated confidence percentage, a root-cause narrative, and a hedged verdict: likely true positive, likely false positive, or uncertain — needs review. It never returns \"confirmed threat\". Confidence is deliberately conservative, and ambiguous cases are flagged for a human rather than miscalled."
        ]
      },
      {
        "h2": "Verdict, then human-approved containment",
        "paragraphs": [
          "OwlSOC investigates and recommends; a human approves. For a Security Hub finding it will tell you what it thinks happened, how confident it is, and the action it would take, but it does not act on its own.",
          "Containment is human-approval-gated and write-grant-gated. An action only runs after someone on your team approves the specific action, and only on the write scopes you have granted. Everything is logged. Reversible actions can be undone; the few that cannot are flagged before you approve. By default OwlSOC is read-only and takes no action at all."
        ]
      },
      {
        "h2": "Which AWS sources are supported",
        "paragraphs": [
          "AWS Security Hub is the supported AWS connector. It aggregates findings from across your AWS security tooling, so connecting it read-only gives OwlSOC a single, normalised view to investigate against.",
          "Other AWS sources are scoped on request, not shipped. If a source such as AWS GuardDuty matters to you and you want it investigated directly rather than via Security Hub, tell us and we will scope it. We add connectors against real pilot demand, not a roadmap slide."
        ],
        "bullets": [
          "Supported now: AWS Security Hub (read-only)",
          "Scoped on request: AWS GuardDuty and other AWS sources — not yet shipped",
          "Also supported: Microsoft Sentinel and Microsoft Defender (Endpoint and Office)"
        ]
      },
      {
        "h2": "What you get and how it runs",
        "paragraphs": [
          "The output is built to be checked, not trusted blindly. Your team can open any line of the timeline and see the exact log or finding behind it, disagree with the verdict, and follow the reasoning in the client portal. OwlSOC can also export case reports (incl. PDF) to support your own SOC 2, ISO 27001, or GDPR reporting.",
          "Setup is light. Connection is read-only by default, there are no agents to install, and most pilots run their first investigations within about 48 hours of access. It starts with a £495, 30-day fully-refundable pilot, then from £495 per month per monitored environment, billed monthly with no minimum term."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Does OwlSOC support AWS GuardDuty?",
        "a": "Not as a direct connector yet. AWS Security Hub is the supported AWS connector, and it aggregates findings from across your AWS security tooling. AWS GuardDuty is scoped on request rather than shipped — tell us if you need it investigated directly and we will scope it against real pilot demand."
      },
      {
        "q": "How does OwlSOC connect to AWS Security Hub?",
        "a": "Read-only by default, with no agents to install. You grant the access OwlSOC needs to read findings and the surrounding signals, and it is auditable from your side. Most pilots run their first investigations within about 48 hours of access."
      },
      {
        "q": "Will OwlSOC take action on an AWS finding automatically?",
        "a": "No. OwlSOC investigates and recommends; a human on your team approves any containment before it runs. Actions are human-approval-gated and only execute on the write scopes you have granted. By default OwlSOC is read-only and takes no action at all."
      },
      {
        "q": "What kind of verdict does OwlSOC give on a Security Hub finding?",
        "a": "A hedged one: likely true positive, likely false positive, or uncertain — needs review. The AI investigation adds a calibrated confidence percentage and a root-cause narrative, with every claim in the timeline citing a source log or pivot ID. It never returns \"confirmed threat\"."
      }
    ],
    "related": [
      {
        "label": "What is an AI SOC?",
        "href": "/ai-soc/"
      },
      {
        "label": "Microsoft Sentinel alert triage",
        "href": "/microsoft-sentinel/"
      },
      {
        "label": "Microsoft Defender investigation",
        "href": "/microsoft-defender/"
      }
    ]
  }
}

export const SEO_SLUGS = Object.keys(SEO_PAGES)

export function seoMetadata(slug: string): Metadata {
  const p = SEO_PAGES[slug]
  const path = `/${slug}/`
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url: path,
      type: 'article',
      images: [{ url: BRAND.ogCard, width: BRAND.ogCardWidth, height: BRAND.ogCardHeight, alt: p.h1 }],
    },
    twitter: { card: 'summary_large_image', title: p.metaTitle, description: p.metaDescription, images: [BRAND.ogCard] },
  }
}
