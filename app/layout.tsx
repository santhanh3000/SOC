import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { MotionProvider } from '@/components/MotionProvider'
import { CleanAnchors } from '@/components/CleanAnchors'
import { SITE_URL, BRAND } from '@/lib/site'
import { ORGANIZATION_JSONLD, WEBSITE_JSONLD, jsonLd } from '@/lib/schema'

const display = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const TITLE = 'OwlSOC — AI SOC that investigates every alert in under 2 min'
const DESCRIPTION =
  'An AI SOC that investigates every Sentinel, Defender and AWS alert in under two minutes, 24/7. You approve every action. Start a 30-day refundable pilot.'
// Punchy social variant — shares on LinkedIn etc. are the channel. Outcome + control + pilot.
const SOCIAL_DESCRIPTION =
  'Every alert from your Sentinel, Defender and AWS — investigated in under two minutes, 24/7, with a human approving every action. Start a 30-day refundable pilot.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'OwlSOC',
  alternates: { canonical: '/' },
  authors: [{ name: 'OwlSOC' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
    url: '/',
    siteName: 'OwlSOC',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: BRAND.ogCard,
        width: BRAND.ogCardWidth,
        height: BRAND.ogCardHeight,
        alt: 'OwlSOC: AI-powered security operations, on top of the tools you already run',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [BRAND.ogCard],
  },
  // Favicon/apple-icon links are injected automatically from the app/
  // file conventions (app/favicon.ico, app/icon.svg, app/apple-icon.png).
}

export const viewport: Viewport = {
  themeColor: BRAND.themeColor,
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(ORGANIZATION_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(WEBSITE_JSONLD) }}
        />
        {/* Entrance animations gate visibility on inline opacity:0; without JS,
            this restores everything so the page reads fully un-hydrated. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-ink-deep text-bone antialiased font-sans selection:bg-amber-iris selection:text-ink-deep">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-amber-iris focus:px-4 focus:py-2 focus:text-ink-deep focus:font-medium"
        >
          Skip to content
        </a>
        <CleanAnchors />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
