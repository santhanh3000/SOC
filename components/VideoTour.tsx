import { Section } from './ui/Section'

// Real product-tour footage (recorded in the OwlSOC app). Native <video> with a
// poster so there's no layout shift and nothing downloads until the visitor hits
// play (preload="metadata"). Same-origin file — covered by the CSP default-src 'self'.
export function VideoTour() {
  return (
    <Section
      id="tour"
      eyebrow="See it in action"
      title={
        <>
          A one-minute tour.{' '}
          <span className="text-bone-muted italic font-display">Real product, real investigation.</span>
        </>
      }
      intro="Recorded in the OwlSOC app: an alert comes in, gets correlated into an evidence-linked timeline with a plain-language verdict and MITRE mapping, and a human approves the containment. No slideware."
    >
      <figure className="m-0">
        <div className="relative overflow-hidden rounded-xl border border-ink-border bg-ink-deep shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
          <video
            className="block w-full aspect-video bg-ink-deep"
            controls
            preload="metadata"
            playsInline
            poster="/owlsoc-tour-poster.jpg"
            aria-label="OwlSOC product tour: an alert investigated end to end, with human-approved containment"
          >
            <source src="/owlsoc-tour.mp4" type="video/mp4" />
            Your browser can&apos;t play embedded video.{' '}
            <a href="/owlsoc-tour.mp4" className="text-amber-iris link-underline">
              Download the tour (MP4)
            </a>
            .
          </video>
        </div>
        <figcaption className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest-sm text-bone-faint">
            Recorded in the OwlSOC product · ~1 min
          </span>
          <a
            href="#contact"
            className="text-[13.5px] text-bone-soft link-underline hover:text-amber-iris"
          >
            See it on your own alerts — start a 30-day pilot →
          </a>
        </figcaption>
      </figure>
    </Section>
  )
}
