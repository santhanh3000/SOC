import { LegalLayout, LegalH2 } from '@/components/LegalLayout'

export const metadata = {
  title: 'Terms of service | OwlSOC',
  description: 'The terms that apply when you use OwlSOC.',
  alternates: { canonical: '/terms/' },
  openGraph: {
    url: '/terms/',
    title: 'Terms of service | OwlSOC',
    description: 'The terms that apply when you use OwlSOC.',
  },
  twitter: {
    title: 'Terms of service | OwlSOC',
    description: 'The terms that apply when you use OwlSOC.',
  },
}

export default function Terms() {
  return (
    <LegalLayout title="Terms of service" updated="June 2026">
      <p>
        These terms apply when you use OwlSOC. They&apos;re intentionally short. The real
        commitments live in the order form or master service agreement you sign with
        us when you become a customer.
      </p>

      <LegalH2>Using this website</LegalH2>
      <p>
        You&apos;re welcome to browse this site and read about the product. Don&apos;t use it
        to scrape at scale, probe for vulnerabilities without authorisation, or do
        anything illegal.
      </p>

      <LegalH2>Pilot terms</LegalH2>
      <p>
        The 30-day pilot is fully refundable for 30 days from the kickoff date. If you
        ask for a refund within that window, we&apos;ll process it within 10 business days,
        no questions, no clauses. After 30 days, the pilot continues as a monthly
        subscription unless you cancel.
      </p>

      <LegalH2>Subscriptions</LegalH2>
      <p>
        Monthly billing, no minimum term, cancel by email for the next billing cycle.
        If you want an annual agreement for procurement reasons, we&apos;ll sign one, but
        we don&apos;t require it.
      </p>

      <LegalH2>What OwlSOC will and won&apos;t do</LegalH2>
      <p>
        OwlSOC investigates and recommends; humans on your team approve any action
        that touches your environment, and only on the write scopes you grant. Every
        action is logged; reversible actions can be undone, and the few that cannot be
        reversed are flagged for an explicit confirmation before they run. We won&apos;t
        use your data to train models or share it with anyone outside the contract.
      </p>

      <LegalH2>Liability</LegalH2>
      <p>
        Security tooling is one layer of defence among many; OwlSOC augments your team
        but doesn&apos;t replace it. Liability is capped at the fees paid in the preceding
        12 months. Nothing in these terms limits liability we can&apos;t legally limit.
      </p>

      <LegalH2>Contact</LegalH2>
      <p>
        Questions about these terms: <a href="mailto:info@owlsoc.com" className="text-amber-iris link-underline">info@owlsoc.com</a>.
      </p>
    </LegalLayout>
  )
}
