import AboutHero from '../components/about/AboutHero.jsx'
import AboutIntro from '../components/about/AboutIntro.jsx'
import AboutStory from '../components/about/AboutStory.jsx'
import AboutMvv from '../components/about/AboutMvv.jsx'
import AboutWhy from '../components/about/AboutWhy.jsx'
import AboutApproach from '../components/about/AboutApproach.jsx'
import AboutDifference from '../components/about/AboutDifference.jsx'
import AboutMetrics from '../components/about/AboutMetrics.jsx'
import AboutTestimonials from '../components/about/AboutTestimonials.jsx'
import AboutConsult from '../components/about/AboutConsult.jsx'

export default function About() {
  return (
    <main>
      <AboutHero />
      <AboutIntro />
      <AboutStory />
      <AboutMvv />
      <AboutWhy />
      <AboutApproach />
      {/* Team / "Our People" section hidden for now */}
      <AboutDifference />
      <AboutMetrics />
      <AboutTestimonials />
      <AboutConsult />
    </main>
  )
}