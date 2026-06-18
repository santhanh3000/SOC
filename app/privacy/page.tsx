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
        This policy explains what information OwlSOC (&quot;OwlSOC,&quot; &quot;we&quot;) receives
        through this website and how we handle it. It covers the marketing site
        you&apos;re reading now; the detailed data-processing terms for the product are
        provided before any pilot begins.
      </p>

      <LegalH2>What this website collects</LegalH2>
      <p>
        The enquiry form opens an email to info@owlsoc.com pre-filled with what you
        type — your name, email, company, and any message. We receive that email and
        use it only to reply, scope a pilot, and follow up. We don&apos;t sell, rent, or
        share it with third parties for marketing.
      </p>
      <p>
        This site sets no cookies and runs no third-party tracking or analytics.
        Simply visiting it doesn&apos;t build a profile of you.
      </p>

      <LegalH2>When you become a customer</LegalH2>
      <p>
        The OwlSOC product reads security signals from the tools you connect (alerts,
        sign-in logs, endpoint telemetry, cloud audit logs, identity events) only to
        investigate the alerts that fire in your environment. Access is read-only by
        default, scoped to what you grant at onboarding, and auditable from your side.
      </p>
      <p>
        We don&apos;t train any model on customer data; investigation reasoning runs
        against your data without learning from it. How that data is stored,
        encrypted, retained, and which sub-processors are involved is set out in the
        data processing agreement (DPA) we share before a pilot starts — ask and
        we&apos;ll walk your team through it.
      </p>

      <LegalH2>Retention</LegalH2>
      <p>
        Enquiries you send us are kept for up to 24 months unless you ask us to delete
        them sooner. Retention of any customer investigation data is governed by the
        agreement you sign.
      </p>

      <LegalH2>Your rights</LegalH2>
      <p>
        You can ask to access, correct, or delete personal data we hold about you by
        emailing info@owlsoc.com; we&apos;ll respond promptly. If you&apos;re in the UK or EU,
        you also have the right to complain to your data-protection authority.
      </p>

      <LegalH2>Contact</LegalH2>
      <p>
        Privacy questions: <a href="mailto:info@owlsoc.com" className="text-amber-iris link-underline">info@owlsoc.com</a>.
      </p>
    </LegalLayout>
  )
}
