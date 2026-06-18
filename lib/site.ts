// Central site configuration. Replace the placeholders marked TODO before launch.

export const SITE_URL = 'https://owlsoc.com'

// Brand assets (single source — header, footer, hero, metadata all read from
// here). Files live in public/brand/ (vectors) and the web root (favicons,
// PWA icons, OG card); update the asset pack by re-copying into those paths.
export const BRAND = {
  // Square owl mark, transparent background. viewBox 2048×2048 (1:1).
  mark: '/brand/owlsoc-mark.svg',
  // Mark on a #0B1220 plate (used where a background is needed, e.g. favicon).
  markDark: '/brand/owlsoc-mark-darkbg.svg',
  // Horizontal lockup, light text — for dark surfaces. 6767.4×2429.9 (2.785:1).
  lockup: '/brand/owlsoc-horizontal.svg',
  // Horizontal lockup, dark text — for light surfaces (unused on the dark site,
  // shipped for completeness).
  lockupOnLight: '/brand/owlsoc-horizontal-on-light.svg',
  // Stacked lockup. 5112.7×4289.2 (1.192:1).
  stacked: '/brand/owlsoc-stacked.svg',
  // 1200×630 Open Graph / Twitter card.
  ogCard: '/owlsoc-og-card.png',
  ogCardWidth: 1200,
  ogCardHeight: 630,
  // Intrinsic aspect ratios (width ÷ height) for layout-shift-free sizing.
  lockupAspect: 6767.4 / 2429.9,
  stackedAspect: 5112.7 / 4289.2,
  themeColor: '#0B1220',
} as const

export const CONTACT_EMAIL = 'hello@owlsoc.com'
export const SECURITY_EMAIL = 'security@owlsoc.com'
export const PRIVACY_EMAIL = 'privacy@owlsoc.com'
export const LEGAL_EMAIL = 'legal@owlsoc.com'

// Lead-capture form. This is a static site (next export), so the form POSTs
// directly to a managed form provider — no backend of our own.
// TODO(launch): swap YOUR_FORM_ID for the real Formspree form id (or change
// provider). The origin below must stay in sync with the CSP connect-src /
// form-action allow-list in vercel.json and public/_headers.
export const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
export const FORM_ORIGIN = 'https://formspree.io'
export const FORM_CONFIGURED = !FORM_ENDPOINT.includes('YOUR_FORM_ID')

// Optional calendar link, only surfaced AFTER a successful form submit.
// TODO(launch): set the real scheduling link; leave empty to hide the link.
export const BOOKING_URL = ''
export const BOOKING_CONFIGURED = BOOKING_URL.length > 0
