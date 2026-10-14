import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowRight, CreditCard } from 'lucide-react'
import Logo from './Logo.jsx'
import { useModal } from '../context/ModalContext.jsx'

const QUICK_LINKS = [
  { label: 'Home', to: '/#home' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'How It Works', to: '/#how' },
  { label: 'Economic Immigration', to: '/economic-immigration' },
  { label: 'Contact', to: '/contact' },
  { label: 'Make a Payment', to: '/payment' },
]

const SERVICE_LINKS = [
  { label: 'College Admissions', slug: 'college-admissions' },
  { label: 'Program Selection', slug: 'program-selection' },
  { label: 'Career Guidance', slug: 'career-guidance' },
  { label: 'Application Assistance', slug: 'application-assistance' },
  { label: 'Visa Support', slug: 'visa-support' },
  { label: 'Scholarship Guidance', slug: 'scholarship-guidance' },
]

const SOCIAL = [
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/1KhZ9sAsew/?mibextid=wwXIfr' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/bridgewayz.canada' },
]

export default function Footer() {
  const { openModal } = useModal()

  return (
    <footer id="how-footer" className="relative overflow-hidden bg-navy-900 text-white/70">
      {/* Top border glow */}
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/60 to-transparent" />
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 bg-grid-footer opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-orange/10 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-navy-600/30 blur-3xl" />
      </div>

      <div className="container-px relative">
        {/* Main footer grid */}
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {/* Column 1 — brand */}
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Your Global Education Partner. Expert, student-first guidance for studying in Canada — from program selection to your first day on campus.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/8 text-white/70 transition-colors hover:bg-orange-gradient hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2 — quick links */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="group inline-flex items-center gap-1 text-sm text-white/55 transition-colors hover:text-white">
                    <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — services */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-white/55 transition-colors hover:text-white">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — contact */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Get In Touch</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <a href="mailto:info@bridgewayz.ca" className="text-white/55 transition-colors hover:text-white">info@bridgewayz.ca</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <a href="tel:+14374495504" className="text-white/55 transition-colors hover:text-white">+1 (437) 449-5504</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <span className="text-white/55">214-2 Automatic Road, Brampton ON L6S 6K8</span>
              </li>
            </ul>
            <button onClick={openModal} className="btn-primary mt-6 w-full">
              Book Free Consultation
            </button>
            <Link to="/payment" className="btn-ghost-light mt-3 w-full">
              <CreditCard className="h-4 w-4" />
              Make a Payment
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Bridgewayz. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}