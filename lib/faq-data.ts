// Single source of truth for the FAQ. Rendered by components/FAQ.tsx and
// emitted as FAQPage JSON-LD by app/page.tsx — keep the two in parity by only
// ever editing this file. Answers are written to be self-contained and
// quotable: a search engine or AI assistant should be able to lift any answer
// verbatim and have it be accurate on its own.

export type FAQItem = { q: string; a: string; anchor?: string }

export const FAQS: FAQItem[] = [
  {
    q: 'What is OwlSOC?',
    a: 'OwlSOC is an AI-powered Security Operations Center (SOC) service that investigates security alerts from Microsoft Sentinel, Microsoft Defender and AWS. When an alert fires, OwlSOC pulls the relevant logs, builds an evidence-linked timeline, maps the attack to MITRE ATT&CK, and returns a plain-language verdict with a recommended action, typically in under two minutes, 24/7. A human on your team approves any action before it runs. It connects read-only with no agents to install, and starts with a £495 30-day refundable pilot. In practice it automates alert triage for Microsoft Sentinel, Defender and AWS: every alert is triaged and fully investigated rather than sampled.',
  },
  {
    q: 'What is an AI SOC?',
    a: "An AI SOC uses AI to do the investigation work of a security operations center: triaging alerts, correlating logs across sources, and writing up findings at machine speed instead of analyst speed. The practical difference is coverage and latency. Every alert gets a full investigation in minutes, including at 3am on a Sunday, instead of a nine-second glance or a place in a queue. In OwlSOC's case the AI investigates and recommends; a human on your team approves any action before it touches your environment.",
  },
  {
    q: 'Is OwlSOC an alternative to hiring a SOC team or buying MDR?',
    a: "Most teams need 24/7 alert coverage; far fewer can justify a 24/7 team on payroll. For many teams, yes. Compared to hiring: a 24/7 in-house SOC team typically costs north of £500k a year fully loaded and takes months to staff; OwlSOC starts at £495 a month and is investigating within days. Compared to traditional MDR: OwlSOC sits on top of the Microsoft and AWS tooling you already run, so there is no migration and no multi-year contract, and your team keeps full visibility into every investigation's reasoning. If you already have analysts, OwlSOC does the first-pass triage so they only handle confirmed incidents.",
  },
  {
    q: 'Which tools does OwlSOC connect to?',
    a: "At launch: Microsoft Sentinel, Microsoft Defender (Endpoint and Office), and AWS Security Hub. If your alert sources matter and aren't on that list — AWS GuardDuty, Entra ID, others — tell us and we'll scope it. We add connectors against real pilot demand, not a roadmap slide.",
  },
  {
    q: 'How does the 30-day pilot work?',
    a: "You pay £495 up front, we kick off on a Monday, and within 48 hours of the OAuth grant OwlSOC is investigating live alerts from one environment of your choice. At the end of week 4 we run a joint review. If you don't believe OwlSOC earns its keep, you ask for a refund. By email. No form, no clause about why. We've designed it so saying \"no\" is genuinely easy.",
  },
  {
    q: 'What data does OwlSOC actually access?',
    a: "Only what's needed to investigate an alert: the alert itself, the surrounding logs from your security tools, and the identity/device/network signals required to reason about the event. Read-only by default. We don't read mail content, files, or anything outside the security signal scope. Our access is exactly what you grant when we onboard, and it's auditable from your side.",
  },
  {
    q: 'Where is my data stored? Do you train models on it?',
    a: "UK / EU residency, encrypted in transit and at rest. We don't train any model on customer data, ours or any third party's, and that's a contractual commitment from every sub-processor in our pipeline. Investigation happens against your data without learning from it. We're happy to walk your security or procurement team through the DPA and the architecture before you sign.",
  },
  {
    q: 'Does OwlSOC take actions automatically?',
    a: "No. OwlSOC investigates and recommends. Humans approve. The product can execute approved actions on your behalf (e.g. revoke a session, isolate a device), but only after a human in your team approves the specific action and only on the write scopes you've granted. Everything is logged; reversible actions can be undone, and the few that can't are flagged before approval.",
  },
  {
    q: 'How do you know it works before I connect it?',
    a: "Before we touch anyone's tenant, we validate each release against a fixed set of real-world attack scenarios: adversary-in-the-middle token theft, encoded-PowerShell execution, OAuth consent abuse, mass exfiltration, and others. On that set, OwlSOC returns the correct verdict with a fully sourced timeline. It's a defined test set, not a guarantee about your environment, which is exactly why the pilot exists. Thirty days on your own alerts, fully refundable, so the proof sits on your data rather than our slides.",
  },
  {
    q: 'What if OwlSOC gets an investigation wrong?',
    a: "It will. So will any analyst. We've designed the report so every claim is sourced. Your team can see the exact log line behind any line of the timeline, and disagree with the verdict. Confidence scores are conservative; ambiguous cases are flagged \"needs review\" rather than miscalled. We track agreement rate per customer and review weak cases as part of the monthly summary.",
  },
  {
    q: 'How long does setup actually take?',
    a: "Most pilots run their first investigations within 48 hours of the OAuth grant. The slowest part is usually getting the OAuth grant approved on your side. Once we're connected, baselining takes a few hours and the queue starts moving. The 4-week pilot is structured around that: week 1 connect, weeks 2–3 investigate, week 4 review.",
  },
  {
    q: 'What happens after the 30-day pilot?',
    a: "Either you ask for a refund at the week-4 review (one email, no clauses) or you continue on the tier that fits, whether that's Standalone, Core, or Compliance, billed monthly with no minimum term. We don't auto-roll pilots into annual contracts. If you want one for procurement reasons, we'll do that; if you don't, you don't have to.",
  },
  {
    q: 'Can I cancel anytime after the pilot?',
    a: 'Yes. Monthly billing, no minimum term, cancel by email with notice for the next billing cycle. We can turn OwlSOC off and revoke our access in under an hour.',
  },
  {
    anchor: 'about',
    q: 'Who is behind OwlSOC?',
    a: "A small, founder-led team with backgrounds in offensive security, detection engineering, and Microsoft and AWS security architecture. We've been on the wrong end of a 4am Slack message ourselves, and built the product we wished we'd had. OwlSOC Ltd is registered in the UK. On the intro call you meet the people building the product, not a sales rep, and we're glad to share our backgrounds and references.",
  },
]
