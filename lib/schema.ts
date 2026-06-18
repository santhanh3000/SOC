// JSON-LD structured data. Everything here must stay TRUE and in parity with
// the visible page content (Google requires FAQPage parity; honesty requires
// the rest). No ratings, no reviews, no fabricated profiles.
//
// NOTE on sameAs: intentionally absent. OwlSOC has no live external profiles
// yet (LinkedIn / Crunchbase / GitHub). Add them here the day they exist —
// sameAs is how AI systems disambiguate the entity. Do NOT add placeholder
// URLs.

import { SITE_URL, CONTACT_EMAIL } from './site'
import { FAQS } from './faq-data'

const ORG_ID = `${SITE_URL}/#organization`

export const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'OwlSOC',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon-512.png`,
  email: CONTACT_EMAIL,
  description:
    'AI Security Operations Center as a service for Microsoft Sentinel, Microsoft Defender and AWS.',
}

export const SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'OwlSOC',
  serviceType: 'Security Operations Center as a Service (AI-powered alert investigation)',
  url: `${SITE_URL}/`,
  provider: { '@id': ORG_ID },
  description:
    'OwlSOC investigates security alerts from Microsoft Sentinel, Microsoft Defender and AWS: it builds an evidence-linked timeline, maps the attack to MITRE ATT&CK, and returns a plain-language verdict with a recommended action, typically in under two minutes, 24/7. A human approves every action before it runs. Connects read-only; no agents to install. Starts with a £495 30-day refundable pilot.',
  audience: {
    '@type': 'BusinessAudience',
    audienceType:
      'Security and IT teams running Microsoft Sentinel, Microsoft Defender or AWS',
  },
  areaServed: ['GB', 'EU'],
  offers: [
    {
      '@type': 'Offer',
      name: 'Standalone',
      price: '495',
      priceCurrency: 'GBP',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '495',
        priceCurrency: 'GBP',
        unitText: 'per monitored environment per month',
      },
      description:
        'Per monitored environment, per month. AI investigation on every alert, evidence-linked timelines, MITRE ATT&CK mapping, read-only client portal. 30-day refundable pilot.',
      url: `${SITE_URL}/#pricing`,
    },
    {
      '@type': 'Offer',
      name: 'Core',
      price: '1495',
      priceCurrency: 'GBP',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '1495',
        priceCurrency: 'GBP',
        unitText: 'per monitored environment per month',
      },
      description:
        'Per monitored environment, per month. Everything in Standalone plus multi-environment support, per-environment baseline-deviation signals, recommended actions with human approval, full audit trail and undo on every reversible action, Slack/Teams workflows.',
      url: `${SITE_URL}/#pricing`,
    },
    {
      '@type': 'Offer',
      name: 'Compliance',
      price: '2995',
      priceCurrency: 'GBP',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '2995',
        priceCurrency: 'GBP',
        unitText: 'per monitored environment per month',
      },
      description:
        'Per monitored environment, per month. Everything in Core plus audit-evidence packs to support SOC 2 / ISO 27001 / GDPR reporting, executive reporting, long-term log retention, 24/7 escalation channel.',
      url: `${SITE_URL}/#pricing`,
    },
  ],
}

export const FAQPAGE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export function jsonLd(data: object): string {
  // < escaping prevents </script> breakout if any value ever contains it.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
