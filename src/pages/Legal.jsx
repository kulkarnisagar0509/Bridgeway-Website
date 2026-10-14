import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarHeart, ArrowLeft, Home, ChevronRight, ShieldCheck } from 'lucide-react'
import { LEGAL_MAP, LEGAL_LAST_UPDATED } from '../data/legal.js'
import { useModal } from '../context/ModalContext.jsx'
import {
  staggerContainer, itemFade, fadeUp, viewportOnce, easeOut,
} from '../lib/motion.jsx'

export default function Legal({ kind }) {
  const doc = LEGAL_MAP[kind]
  const { openModal } = useModal()

  if (!doc) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-cloud px-6 pt-24 text-center">
        <div>
          <p className="font-heading text-5xl font-extrabold text-navy/20">404</p>
          <h1 className="mt-3 text-2xl font-bold text-navy">Page not found</h1>
          <Link to="/" className="btn-primary mt-6">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </main>
    )
  }

  const other = kind === 'privacy' ? { to: '/terms', label: 'Terms of Service' } : { to: '/privacy', label: 'Privacy Policy' }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-gradient pb-16 pt-32 md:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-worldmap opacity-40" />
          <div className="absolute -left-24 top-0 h-[22rem] w-[22rem] rounded-full bg-orange/12 blur-[120px]" />
          <div className="absolute right-[-8%] top-[-14%] h-[28rem] w-[28rem] rounded-full bg-navy-300/20 blur-[130px]" />
        </div>

        <div className="container-px relative">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.nav
              variants={itemFade}
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium text-white/55"
            >
              <Link to="/#home" className="inline-flex items-center gap-1 transition-colors hover:text-white">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              <span className="text-white/85">{doc.title}</span>
            </motion.nav>

            <motion.span
              variants={itemFade}
              className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-orange-gradient text-white shadow-lg"
            >
              <ShieldCheck className="h-8 w-8" strokeWidth={1.8} />
            </motion.span>

            <motion.h1
              variants={itemFade}
              className="mt-5 text-balance text-[2.1rem] font-extrabold leading-[1.1] text-white sm:text-4xl"
            >
              {doc.title}
            </motion.h1>
            <motion.p variants={itemFade} className="mt-3 text-sm font-medium text-white/60">
              Last updated: {LEGAL_LAST_UPDATED}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="section-pad bg-white">
        <div className="container-px">
          <div className="mx-auto max-w-3xl">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="text-[15px] leading-relaxed text-ink/70 md:text-base"
            >
              {doc.intro}
            </motion.p>

            <div className="mt-10 space-y-10">
              {doc.sections.map((s, i) => (
                <motion.div
                  key={s.heading}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, ease: easeOut, delay: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-orange/10 text-xs font-bold text-orange">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-xl font-bold text-navy sm:text-2xl">{s.heading}</h2>
                  </div>
                  <div className="mt-3 space-y-3 border-l border-navy/10 pl-4 sm:pl-6">
                    {s.body.map((p, j) => (
                      <p key={j} className="text-[15px] leading-relaxed text-ink/65 md:text-base">{p}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Cross-link + CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-navy/10 bg-cloud p-6 sm:flex-row sm:items-center"
            >
              <Link to={other.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange transition-all hover:gap-2.5">
                <ArrowLeft className="h-4 w-4" /> Read our {other.label}
              </Link>
              <button onClick={openModal} className="btn-primary">
                <CalendarHeart className="h-4 w-4" /> Book Free Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}