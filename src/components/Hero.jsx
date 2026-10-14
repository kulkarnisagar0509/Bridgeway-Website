import { motion } from 'framer-motion'
import {
  CalendarHeart, Compass, Check, GraduationCap, ShieldCheck, Award, MapPin,
} from 'lucide-react'
import { useModal } from '../context/ModalContext.jsx'
import { staggerContainer, itemFade, fadeRight, easeOut } from '../lib/motion.jsx'

// Trust indicators beneath the CTAs
const TRUST = ['Personalized Guidance', 'Admission Support', 'Program Selection', 'Career Planning']

// Compact layered institution cards (right-panel) — clean, not cluttered.
const INSTITUTIONS = [
  { mark: 'ML', name: 'Maple Leaf College', city: 'Toronto, ON', tone: 'orange' },
  { mark: 'NG', name: 'Northern Gate Univ.', city: 'Vancouver, BC', tone: 'navy' },
  { mark: 'CI', name: 'Crown Institute', city: 'Montreal, QC', tone: 'light' },
]

// Journey stages rendered on the bridge pathway
const STAGES = [
  { label: 'Profile' },
  { label: 'Apply' },
  { label: 'Admit' },
  { label: 'Arrive' },
]

const toneCls = {
  orange: 'bg-orange-gradient text-white',
  navy: 'bg-navy-gradient text-white',
  light: 'bg-white text-navy',
}

export default function Hero() {
  const { openModal } = useModal()

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-gradient pb-14 pt-28 md:pt-24 lg:pb-10"
    >
      {/* ===== Background — restrained, premium ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-worldmap opacity-40" />
        <div className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-orange/12 blur-[120px]" />
        <div className="absolute right-[-10%] top-[-12%] h-[30rem] w-[30rem] rounded-full bg-navy-300/20 blur-[120px]" />

        {/* Bridge-inspired abstract line */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.14]" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="heroBridge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#FF6B00" stopOpacity="0" />
              <stop offset="0.5" stopColor="#FF6B00" stopOpacity="0.9" />
              <stop offset="1" stopColor="#FF6B00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M-50 360 Q 480 200 960 360 T 1920 360"
            fill="none" stroke="url(#heroBridge)" strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: easeOut, delay: 0.3 }}
          />
        </svg>
      </div>

      {/* ===== Content — 60 / 40 split ===== */}
      <div className="container-px relative grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-10">
        {/* ---- Left (60%) — trust & authority ---- */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left"
        >
          {/* Small badge */}
          <motion.span
            variants={itemFade}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm"
          >
            <span className="text-sm leading-none">🇨🇦</span>
            Trusted Canadian Education Advisors
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={itemFade}
            className="mt-5 text-balance text-[2.1rem] font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-[3.1rem]"
          >
            Bridge Your Future Through <span className="gradient-text-orange">Global Education</span>
          </motion.h1>

          {/* Supporting paragraph */}
          <motion.p
            variants={itemFade}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/75 lg:mx-0 lg:text-base"
          >
            Expert guidance to discover opportunities, secure admissions, and study in Canada with confidence — backed by a decade of student success.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemFade} className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <button onClick={openModal} className="btn-primary w-full sm:w-auto">
              <CalendarHeart className="h-4 w-4" />
              Book Free Consultation
            </button>
            <a href="#services" className="btn-ghost-light w-full sm:w-auto">
              <Compass className="h-4 w-4" />
              Explore Services
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.ul
            variants={itemFade}
            className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:max-w-xl"
          >
            {TRUST.map((t) => (
              <li key={t} className="flex items-center justify-center gap-2 text-sm text-white/85 lg:justify-start">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange-gradient text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ---- Right (40%) — premium pathway visual ---- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeRight}
          className="order-1 lg:order-2 lg:col-span-5"
        >
          <PathwayVisual />
        </motion.div>
      </div>
    </section>
  )
}

/* ---- Right panel: layered institution + pathway composition ---- */
function PathwayVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[0.06] p-6 shadow-premium backdrop-blur-xl">
        {/* subtle inner glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-navy-300/15 blur-3xl" />

        {/* Panel header */}
        <div className="relative mb-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
            <GraduationCap className="h-4 w-4 text-orange" />
            Your Pathway to Canada
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-white/55">
            <span className="h-2 w-2 rounded-full bg-green-400" /> Live
          </span>
        </div>

        {/* ===== Flowing journey track (flex-based, no clipping) ===== */}
        <div className="relative px-1 pb-1 pt-2">
          {/* Base track line (sits behind circles) */}
          <div className="absolute left-7 right-7 top-[22px] h-0.5 -translate-y-1/2 rounded-full bg-white/15" />
          {/* Animated gradient progress line */}
          <motion.div
            className="absolute left-7 top-[22px] h-0.5 -translate-y-1/2 rounded-full bg-orange-gradient"
            initial={{ width: '0%', opacity: 0 }}
            animate={{ width: '86%', opacity: 1 }}
            transition={{ duration: 1.6, ease: easeOut, delay: 0.5 }}
          />
          {/* Traveling pulse dot — keeps the visual "alive" */}
          <motion.span
            className="absolute top-[22px] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,107,0,0.35)]"
            animate={{ left: ['7%', '93%', '7%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Stages row — evenly spaced, labels never clip */}
          <div className="relative flex items-start justify-between">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex w-1/4 flex-col items-center text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.18, ease: easeOut, duration: 0.5 }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-gradient text-[11px] font-bold text-white shadow-lg ring-2 ring-navy">
                  {i + 1}
                </span>
                <span className="mt-2 text-[11px] font-medium text-white/75">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-white/10" />

        {/* ===== Layered institution cards ===== */}
        <div className="relative space-y-3">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Partner institutions
          </p>
          {INSTITUTIONS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.15, ease: easeOut, duration: 0.5 }}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 transition-colors hover:border-orange/40 hover:bg-white/[0.08]"
            >
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg font-heading text-sm font-extrabold shadow-md ${toneCls[p.tone]}`}>
                {p.mark}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-white">{p.name}</p>
                <p className="flex items-center gap-1 truncate text-[11px] text-white/55">
                  <MapPin className="h-3 w-3 text-orange" /> {p.city}
                </p>
              </div>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green-400/15 text-green-400">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            </motion.div>
          ))}
        </div>

        {/* ===== Footer success chip ===== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, ease: easeOut, duration: 0.5 }}
          className="relative mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-r from-orange/15 to-transparent px-4 py-3"
        >
          <span className="flex items-center gap-2 text-xs font-semibold text-white">
            <Award className="h-4 w-4 text-orange" /> 98% Visa Success Rate
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-white/60">
            <ShieldCheck className="h-3.5 w-3.5 text-green-400" /> Verified
          </span>
        </motion.div>
      </div>
    </div>
  )
}