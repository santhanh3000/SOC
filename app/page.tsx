import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Problem } from '@/components/Problem'
import { HowItWorks } from '@/components/HowItWorks'
import { VideoTour } from '@/components/VideoTour'
import { Demo } from '@/components/Demo'
import { Features } from '@/components/Features'
import { Comparison } from '@/components/Comparison'
import { Pricing } from '@/components/Pricing'
import { Trust } from '@/components/Trust'
import { FAQ } from '@/components/FAQ'
import { FinalCTA } from '@/components/FinalCTA'
import { Footer } from '@/components/Footer'
import { MobileCTA } from '@/components/MobileCTA'
import { SectionDivider } from '@/components/ui/Section'
import { SERVICE_JSONLD, FAQPAGE_JSONLD, VIDEO_JSONLD, jsonLd } from '@/lib/schema'

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(SERVICE_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(FAQPAGE_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(VIDEO_JSONLD) }}
      />
      <Nav />
      <main id="main" tabIndex={-1} className="pb-20 lg:pb-0 focus:outline-none">
        <Hero />
        <SectionDivider />
        <Problem />
        <SectionDivider />
        <HowItWorks />
        <SectionDivider />
        <VideoTour />
        <SectionDivider />
        <Demo />
        <SectionDivider />
        <Features />
        <SectionDivider />
        <Comparison />
        <SectionDivider />
        <Pricing />
        <SectionDivider />
        <Trust />
        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTA />
    </>
  )
}
