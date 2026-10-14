import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ModalProvider } from './context/ModalContext.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ConsultationModal from './components/ConsultationModal.jsx'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import Legal from './pages/Legal.jsx'
import EconomicImmigration from './pages/EconomicImmigration.jsx'
import Payment from './pages/Payment.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <ScrollManager />
        <ScrollProgress />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/economic-immigration" element={<EconomicImmigration />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
        </Routes>
        <Footer />
        <ConsultationModal />
        <FloatingWhatsApp />
      </ModalProvider>
    </BrowserRouter>
  )
}