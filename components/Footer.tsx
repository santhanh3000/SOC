import { BrandLockup } from './Brand'
import { CONTACT_EMAIL } from '@/lib/site'

// Resolved once at build time. Redeploys refresh it.
const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative border-t border-ink-border">
      <div className="container-x py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-2 max-w-md">
            <BrandLockup height={32} className="mb-6" />
            <p className="text-bone-soft text-[14.5px] leading-relaxed text-pretty">
              OwlSOC is an AI Security Operations Center. It plugs into the security
              tools you already run, Microsoft Sentinel, Defender and AWS, triages
              every alert and investigates the ones that matter, typically in under
              two minutes. 24/7.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest-sm text-bone-faint">
              Watching, while you sleep.
            </p>
          </div>

          <nav aria-label="Footer product links">
            <h2 className="h-eyebrow mb-4">Product</h2>
            <ul className="space-y-2.5">
              <FooterLink href="/#how">How it works</FooterLink>
              <FooterLink href="/#demo">Sample investigation</FooterLink>
              <FooterLink href="/#features">What you get</FooterLink>
              <FooterLink href="/#pricing">Pricing</FooterLink>
              <FooterLink href="/#faq">FAQ</FooterLink>
            </ul>
          </nav>

          <nav aria-label="Footer company links">
            <h2 className="h-eyebrow mb-4">Company</h2>
            <ul className="space-y-2.5">
              <FooterLink href="/#about">About OwlSOC</FooterLink>
              <FooterLink href={`mailto:${CONTACT_EMAIL}`}>Contact</FooterLink>
              <FooterLink href="/#contact">Start your pilot</FooterLink>
              <FooterLink href="/privacy/">Privacy policy</FooterLink>
              <FooterLink href="/terms/">Terms of service</FooterLink>
            </ul>
          </nav>
        </div>

        <div className="mt-14 pt-8 border-t border-ink-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="font-mono text-[11px] uppercase tracking-widest-sm text-bone-faint">
            © {YEAR} OwlSOC · All rights reserved
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest-sm text-bone-faint">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-bright animate-pulse" />
              Night Watch · operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="text-bone-soft hover:text-amber-iris text-[14px] link-underline"
      >
        {children}
      </a>
    </li>
  )
}
