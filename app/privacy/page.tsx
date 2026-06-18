import { LegalLayout, LegalH2 } from '@/components/LegalLayout'

export const metadata = {
  title: 'Privacy policy | OwlSOC',
  description: 'How OwlSOC collects, uses, and protects your information.',
  alternates: { canonical: '/privacy/' },
  openGraph: {
    url: '/privacy/',
    title: 'Privacy policy | OwlSOC',
    description: 'How OwlSOC collects, uses, and protects your information.',
  },
  twitter: {
    title: 'Privacy policy | OwlSOC',
    description: 'How OwlSOC collects, uses, and protects your information.',
  },
}

export default function Privacy() {
  return (
    <LegalLayout title="Privacy policy" updated="June 2026">
      <p>
        This privacy policy explains what information OwlSOC Ltd (&quot;OwlSOC,&quot; &quot;we&quot;)
        collects when you visit this website, talk to us about a pilot, or use the
        OwlSOC product, and how we protect it.
      </p>

      <LegalH2>What we collect on this website</LegalH2>
      <p>
        When you fill in a contact or pilot form, we collect the name, email, company,
        and any message you send us. We use it only to reply, scope the pilot, and
        follow up. We don&apos;t sell, rent, or share that information with third parties
        for marketing purposes.
      </p>
      <p>
        We use lightweight privacy-respecting analytics (no third-party cookies, no
        cross-site tracking) to understand which pages are useful. You can opt out
        with any standard browser blocking.
      </p>

      <LegalH2>What we collect when you&apos;re a customer</LegalH2>
      <p>
        The OwlSOC product reads security signals from the tools you connect (alerts,
        sign-in logs, endpoint telemetry, cloud audit logs, identity events) only to
        investigate the alerts that fire in your environment. Read-only access by
        default; the exact scope of access is defined when we onboard and is auditable
        from your side.
      </p>
      <p>
        We do not train any model on customer data. Not ours, not any third
        party&apos;s, and that is a contractual commitment from every sub-processor in our
        pipeline. Investigation reasoning happens against your data without learning
        from it. We can provide our data processing agreement (DPA) and sub-processor
        list on request.
      </p>

      <LegalH2>Where data lives</LegalH2>
      <p>
        Customer data is stored in the UK and EU. Encrypted in transit (TLS 1.2+) and
        at rest (AES-256). Access is restricted to a small named set of OwlSOC staff
        and is logged.
      </p>

      <LegalH2>Retention</LegalH2>
      <p>
        Marketing enquiries are retained for up to 24 months unless you ask us to
        delete them earlier. Customer investigation data is retained per the
        contract: default 12 months, up to 7 years on the Compliance tier.
      </p>

      <LegalH2>Your rights</LegalH2>
      <p>
        You can ask to access, correct, or delete personal data we hold about you by
        emailing us. We&apos;ll respond within 30 days. If you&apos;re in the UK or EU, you have
        the right to complain to your supervisory authority.
      </p>

      <LegalH2>Contact</LegalH2>
      <p>
        Privacy questions: <a href="mailto:info@owlsoc.com" className="text-amber-iris link-underline">info@owlsoc.com</a>.
        Postal: OwlSOC Ltd, United Kingdom.
      </p>
    </LegalLayout>
  )
}
