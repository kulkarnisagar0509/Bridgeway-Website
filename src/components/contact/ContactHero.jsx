import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, Clock, ChevronRight, Home, CalendarHeart, ArrowDown } from 'lucide-react'
import { useModal } from '../../context/ModalContext.jsx'
import { staggerContainer, itemFade, easeOut } from '../../lib/motion.jsx'

const QUICK = [
  { icon: Mail, label: 'info@bridgewayz.ca', href: 'mailto:info@bridgewayz.ca' },
  { icon: Phone, label: '+1 (437) 449-5504', href: 'tel:+14374495504' },
  { icon: Clock, label: 'Replies within 24 hours' },
]

export default function ContactHero() {
  const { openModal } = useModal()

  return (
    <section className="relative overflow-hidden bg-navy-gradient pb-20 pt-32 md:pt-36 lg:pb-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-worldmap opacity-40" />
        <div className="absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full bg-orange/12 blur-[120px]" />
        <div className="absolute right-[-8%] top-[-14%] h-[32rem] w-[32rem] rounded-full bg-navy-300/20 blur-[130px]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.16]" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="contactArc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#FF6B00" stopOpacity="0" />
              <stop offset="0.5" stopColor="#FF6B00" stopOpacity="0.9" />
              <stop offset="1" stopColor="#FF6B00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M-50 300 Q 520 160 1040 300 T 1960 300"
            fill="none" stroke="url(#contactArc)" strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: easeOut, delay: 0.3 }}
          />
        </svg>
      </div>

      <div className="container-px relative">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          {/* Breadcrumb */}
          <motion.nav
            variants={itemFade}
            aria-label="Breadcrumb"
            className="mb-6 flex items-center justify-center gap-1.5 text-xs font-medium text-white/55"
          >
            <Link to="/#home" className="inline-flex items-center gap-1 transition-colors hover:text-white">
              <Home className="h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <span className="text-white/85">Contact</span>
          </motion.nav>

          <motion.span
            variants={itemFade}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm"
          >
            <span className="text-sm leading-none">🇨🇦</span>
            We'd Love To Hear From You
          </motion.span>

          <motion.h1
            variants={itemFade}
            className="mt-5 text-balance text-[2.2rem] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]"
          >
            Get In <span className="gradient-text-orange">Touch</span>
          </motion.h1>

          <motion.p
            variants={itemFade}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 lg:text-lg"
          >
            Questions about studying in Canada? Want a program shortlist or visa guidance? Reach out — a real advisor will get back to you within one business day.
          </motion.p>

          {/* Quick contact chips */}
          <motion.ul
            variants={itemFade}
            className="mt-8 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row"
          >
            {QUICK.map((q) => {
              const Icon = q.icon
              const inner = (
                <>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange-gradient text-white shadow-lg">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-white/90">{q.label}</span>
                </>
              )
              return (
                <li key={q.label}>
                  {q.href ? (
                    <a
                      href={q.href}
                      className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/15"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
                      {inner}
                    </span>
                  )}
                </li>
              )
            })}
          </motion.ul>

          <motion.div variants={itemFade} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href="#contact-form" className="btn-primary w-full sm:w-auto">
              <ArrowDown className="h-4 w-4" />
              Send Us a Message
            </a>
            <button onClick={openModal} className="btn-ghost-light w-full sm:w-auto">
              <CalendarHeart className="h-4 w-4" />
              Book Free Consultation
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}