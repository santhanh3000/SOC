import type { MetadataRoute } from 'next'
import { BRAND } from '@/lib/site'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OwlSOC',
    short_name: 'OwlSOC',
    description:
      'AI Security Operations Center that investigates every alert from Sentinel, Defender and AWS, typically in under two minutes, 24/7.',
    start_url: '/',
    display: 'standalone',
    background_color: BRAND.themeColor,
    theme_color: BRAND.themeColor,
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
