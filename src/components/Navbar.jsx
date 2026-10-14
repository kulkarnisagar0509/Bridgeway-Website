import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
// Note: navbar is always solid (no scroll-based color change, never transparent).
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, CalendarHeart } from 'lucide-react'
import Logo from './Logo.jsx'
import { useModal } from '../context/ModalContext.jsx'

const NAV_LINKS = [
  { label: 'Home', to: '/#home' },
  { label: 'About Us', to: '/about' },
  {
    label: 'Services',
    to: '/#services',
    children: [
      { label: 'College Admissions', to: '/services/college-admissions' },
      { label: 'Program Selection', to: '/services/program-selection' },
      { label: 'Career Guidance', to: '/services/career-guidance' },
      { label: 'Application Assistance', to: '/services/application-assistance' },
      { label: 'Visa Support', to: '/services/visa-support' },
      { label: 'Scholarship Guidance', to: '/services/scholarship-guidance' },
      { label: 'Economic Immigration', to: '/economic-immigration' },
    ],
  },
  { label: 'Contact', to: '/contact' },
  { label: 'Make a Payment', to: '/payment' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { openModal } = useModal()
  const { pathname } = useLocation()

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // Navbar is always solid — no scroll-based color change, never transparent.
  const solid = true

  const isActive = (to) => {
    const path = to.split('#')[0] || '/'
    if (path === '/') return pathname === '/' && !to.includes('#')
    return pathname === path
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 bg-white shadow-lg shadow-navy/5"
    >
      <nav className="container-px flex h-16 items-center justify-between">
        <Logo light={!solid} />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label} className="relative"
              onMouseEnter={() => link.children && setServicesOpen(true)}
              onMouseLeave={() => link.children && setServicesOpen(false)}
            >
              <Link
                to={link.to}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  solid ? 'text-ink/80 hover:text-navy' : 'text-white/90 hover:text-white'
                } ${isActive(link.to) ? 'text-navy' : ''}`}
              >
                {link.label}
                {link.children && <ChevronDown className="h-4 w-4 opacity-70" />}
              </Link>

              <AnimatePresence>
                {link.children && servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full w-64 pt-3"
                  >
                    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white p-2 shadow-premium">
                      {link.children.map((c) => (
                        <Link
                          key={c.label}
                          to={c.to}
                          className="block rounded-xl px-4 py-2.5 text-sm text-ink/80 transition-colors hover:bg-navy/5 hover:text-navy"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button onClick={openModal} className="btn-primary hidden sm:inline-flex">
            <CalendarHeart className="h-4 w-4" />
            Book Consultation
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={`grid h-11 w-11 place-items-center rounded-xl transition-colors lg:hidden ${
              solid ? 'bg-navy/5 text-navy' : 'bg-white/10 text-white backdrop-blur-sm'
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-navy/10 bg-white lg:hidden"
          >
            <ul className="container-px flex flex-col gap-1 py-5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-ink/80 hover:bg-navy/5 hover:text-navy"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <ul className="mb-2 ml-3 border-l-2 border-navy/10 pl-3">
                      {link.children.map((c) => (
                        <li key={c.label}>
                          <Link
                            to={c.to}
                            className="block rounded-lg px-4 py-2 text-sm text-ink/60 hover:text-navy"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="mt-2">
                <button
                  onClick={() => { setMobileOpen(false); openModal() }}
                  className="btn-primary w-full"
                >
                  <CalendarHeart className="h-4 w-4" />
                  Book Consultation
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}