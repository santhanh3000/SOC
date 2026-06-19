// Central site configuration. Replace the placeholders marked TODO before launch.

export const SITE_URL = 'https://www.owlsoc.com'

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

// All general enquiries (the pilot/enquiry form and the "email us" CTAs) go here.
export const CONTACT_EMAIL = 'info@owlsoc.com'
export const SECURITY_EMAIL = 'info@owlsoc.com'
export const PRIVACY_EMAIL = 'info@owlsoc.com'
export const LEGAL_EMAIL = 'info@owlsoc.com'

// Lead-capture form. This is a static site (next export), so there is no backend
// of our own. Until a managed form provider is wired up, the enquiry form
// delivers straight to CONTACT_EMAIL via the visitor's mail client (mailto).
// TODO(launch, optional): for automatic capture, create a Formspree form that
// forwards to info@owlsoc.com and swap YOUR_FORM_ID for its id — the form then
// POSTs there instead of opening a mail draft. If you do, keep this origin in
// sync with the CSP connect-src / form-action allow-list in vercel.json.
export const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
export const FORM_ORIGIN = 'https://formspree.io'
export const FORM_CONFIGURED = !FORM_ENDPOINT.includes('YOUR_FORM_ID')

// Optional calendar link, only surfaced AFTER a successful form submit.
// TODO(launch): set the real scheduling link; leave empty to hide the link.
export const BOOKING_URL = ''
export const BOOKING_CONFIGURED = BOOKING_URL.length > 0
