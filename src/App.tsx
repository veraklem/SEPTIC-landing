import { Navbar } from './components/sections/Navbar'
import { Hero } from './components/sections/Hero'
import { Scenarios } from './components/sections/Scenarios'
import { ProblemScenarios } from './components/sections/ProblemScenarios'
import { Composition } from './components/sections/Composition'
import { UsageSteps } from './components/sections/UsageSteps'
import { ProductFormats } from './components/sections/ProductFormats'
import { TrustBlock } from './components/sections/TrustBlock'
import { WhyBio } from './components/sections/WhyBio'
import { MarketplaceCTA } from './components/sections/MarketplaceCTA'
import { B2BBlock } from './components/sections/B2BBlock'
import { FAQ } from './components/sections/FAQ'
import { CtaFooter } from './components/sections/CtaFooter'
import { StickyMobileCta } from './components/sections/StickyMobileCta'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Scenarios />
        <ProblemScenarios />
        <WhyBio />
        <Composition />
        <UsageSteps />
        <ProductFormats />
        <TrustBlock />
        <FAQ />
        <MarketplaceCTA />
        <B2BBlock />
      </main>
      <CtaFooter />
      <StickyMobileCta />
    </>
  )
}

export default App
