import Hero from '../components/Hero.jsx'
import Stats from '../components/Stats.jsx'
import AboutPreview from '../components/AboutPreview.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import Services from '../components/Services.jsx'
import AreasOfStudy from '../components/AreasOfStudy.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import PartnerColleges from '../components/PartnerColleges.jsx'
import Partners from '../components/Partners.jsx'
import WhoWeHelp from '../components/WhoWeHelp.jsx'
import Testimonials from '../components/Testimonials.jsx'
import ConsultationCTA from '../components/ConsultationCTA.jsx'
import PaymentCTA from '../components/PaymentCTA.jsx'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <AboutPreview />
      <WhyChooseUs />
      <Services />
      <AreasOfStudy />
      <HowItWorks />
      <PartnerColleges />
      <Partners />
      <WhoWeHelp />
      <Testimonials />
      <ConsultationCTA />
      <PaymentCTA />
    </main>
  )
}