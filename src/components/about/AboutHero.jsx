import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarHeart, Compass, ChevronRight, Home } from 'lucide-react'
import { useModal } from '../../context/ModalContext.jsx'
import { staggerContainer, itemFade, easeOut } from '../../lib/motion.jsx'

// Floating particle config — restrained, premium.
const PARTICLES = [
  { x: '8%', y: '22%', s: 6, d: 0 },
  { x: '18%', y: '70%', s: 4, d: 0.6 },
  { x: '32%', y: '34%', s: 8, d: 1.1 },
  { x: '62%', y: '18%', s: 5, d: 0.3 },
  { x: '74%', y: '64%', s: 7, d: 0.9 },
  { x: '88%', y: '40%', s: 4, d: 1.4 },
  { x: '46%', y: '80%', s: 6, d: 0.5 },
  { x: '90%', y: '74%', s: 5, d: 1.7 },
]

export default function AboutHero() {
  const { openModal } = useModal()

  return (
    <section className="relative flex min-h-[78svh] items-center overflow-hidden bg-navy-gradient pb-16 pt-32 md:pt-36 lg:min-h-[84svh]">
      {/* ===== Background ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-worldmap opacity-40" />
        <div className="absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full bg-orange/12 blur-[120px]" />
        <div className="absolute right-[-8%] top-[-14%] h-[32rem] w-[32rem] rounded-full bg-navy-300/20 blur-[130px]" />

        {/* Bridge-inspired abstract arcs */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.18]" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="aboutBridge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#FF6B00" stopOpacity="0" />
              <stop offset="0.5" stopColor="#FF6B00" stopOpacity="0.9" />
              <stop offset="1" stopColor="#FF6B00" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="aboutBridge2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#99C3EF" stopOpacity="0" />
              <stop offset="0.5" stopColor="#99C3EF" stopOpacity="0.7" />
              <stop offset="1" stopColor="#99C3EF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M-50 420 Q 480 220 980 420 T 1960 420"
            fill="none" stroke="url(#aboutBridge)" strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.4, ease: easeOut, delay: 0.3 }}
          />
          <motion.path
            d="M-50 480 Q 520 320 1020 480 T 1960 480"
            fill="none" stroke="url(#aboutBridge2)" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.6, ease: easeOut, delay: 0.5 }}
          />
        </svg>

        {/* Animated particles */}
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-orange/40"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
            animate={{ y: [0, -22, 0], opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: p.d }}
          />
        ))}
      </div>

      {/* ===== Content ===== */}
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
            <span className="text-white/85">About Us</span>
          </motion.nav>

          {/* Badge */}
          <motion.span
            variants={itemFade}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm"
          >
            <span className="text-sm leading-none">🇨🇦</span>
            Your Global Education Partner
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={itemFade}
            className="mt-5 text-balance text-[2.2rem] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]"
          >
            About <span className="gradient-text-orange">Bridgewayz</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemFade}
            className="mt-4 text-balance text-lg font-semibold text-white/90 sm:text-xl lg:text-2xl"
          >
            Helping Students Build Global Education Pathways
          </motion.p>

          {/* Supporting description */}
          <motion.p
            variants={itemFade}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 lg:text-base"
          >
            For over a decade, Bridgewayz has guided students toward the right education choices across Canada — combining expert advising, trusted partnerships, and a transparent process so every student moves forward with clarity and confidence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemFade}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <button onClick={openModal} className="btn-primary w-full sm:w-auto">
              <CalendarHeart className="h-4 w-4" />
              Book Free Consultation
            </button>
            <Link to="/#services" className="btn-ghost-light w-full sm:w-auto">
              <Compass className="h-4 w-4" />
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cloud/0" />
    </section>
  )
}