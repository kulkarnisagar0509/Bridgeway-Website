import ContactHero from '../components/contact/ContactHero.jsx'
import ContactMain from '../components/contact/ContactMain.jsx'
import ContactMap from '../components/contact/ContactMap.jsx'
import PaymentCTA from '../components/PaymentCTA.jsx'

export default function Contact() {
  return (
    <main>
      <ContactHero />
      <ContactMain />
      <PaymentCTA />
      <ContactMap />
    </main>
  )
}