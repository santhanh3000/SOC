import { BRAND } from '@/lib/site'

// Official brand assets, sized from their intrinsic aspect ratios so the
// browser reserves exact space (no layout shift). Plain <img> is deliberate:
// these are pre-optimised vectors on a static export (images.unoptimized).

export function BrandLockup({
  height = 30,
  className = '',
  priority = false,
}: {
  height?: number
  className?: string
  priority?: boolean
}) {
  const width = Math.round(height * BRAND.lockupAspect)
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND.lockup}
      alt="OwlSOC"
      width={width}
      height={height}
      className={className}
      {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
    />
  )
}

export function BrandMark({
  size = 36,
  className = '',
  alt = 'OwlSOC',
  priority = false,
}: {
  size?: number
  className?: string
  alt?: string
  priority?: boolean
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND.mark}
      alt={alt}
      width={size}
      height={size}
      className={className}
      {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
    />
  )
}
