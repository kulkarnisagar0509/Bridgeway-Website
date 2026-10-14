import { motion } from 'framer-motion'
import { Compass, Building2, LifeBuoy, UserRound, ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { useModal } from '../context/ModalContext.jsx'
import { fadeLeft, fadeRight, staggerContainer, itemFade, viewportOnce } from '../lib/motion.jsx'

const FEATURES = [
  { icon: Compass, title: 'Expert Guidance', desc: 'Certified advisors who map the right path for your goals.' },
  { icon: Building2, title: 'Trusted Partnerships', desc: 'Direct relationships with 50+ Canadian institutions.' },
  { icon: LifeBuoy, title: 'End-To-End Support', desc: 'From program selection to visa filing and arrival.' },
  { icon: UserRound, title: 'Student Success Focus', desc: 'Every recommendation built around your future.' },
]

const METRICS = [
  { v: '5,000+', l: 'Students guided' },
  { v: '98%', l: 'Visa success' },
  { v: '50+', l: 'Partner colleges' },
]

export default function WhyChooseUs() {
  const { openModal } = useModal()
  return (
    <section className="section-pad bg-cloud">
      <div className="container-px grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Left — large featured block */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[2rem] bg-navy-gradient p-6 text-white shadow-premium md:p-8"
        >
          {/* Decorative */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-worldmap opacity-40" />
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-navy-300/20 blur-3xl" />
            <svg className="absolute bottom-6 left-6 h-20 w-20 opacity-30" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path d="M6 44 Q32 22 58 44" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
              <circle cx="32" cy="30" r="4" fill="#FF6B00" />
              <path d="M32 30 L32 50" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-orange" />
              Why Bridgewayz
            </span>
            <h2 className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.15] sm:text-3xl lg:text-[2.4rem]">
              A partner students trust to build better futures
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
              For over a decade we've turned uncertainty into clarity — combining expert advising, trusted partnerships, and a transparent process so every student moves forward with confidence.
            </p>

            {/* Metrics */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {METRICS.map((m) => (
                <div key={m.l} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="font-heading text-2xl font-extrabold text-white md:text-3xl">{m.v}</p>
                  <p className="mt-0.5 text-[11px] text-white/60 md:text-xs">{m.l}</p>
                </div>
              ))}
            </div>

            <ul className="mt-6 space-y-2.5">
              {['Personalized roadmap for every student', 'Transparent, no-surprise process', 'Direct college & university partnerships'].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm text-white/85">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange-gradient text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <button onClick={openModal} className="btn-primary mt-6">
              Book Free Consultation
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Right — 2x2 feature grid */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.article
              key={title}
              variants={itemFade}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-md shadow-navy/10 transition-shadow duration-300 hover:shadow-premium"
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-navy/8 text-navy transition-all duration-300 group-hover:bg-orange-gradient group-hover:text-white">
                <motion.span
                  whileHover={{ rotate: 8, scale: 1.12 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                >
                  <Icon className="h-7 w-7" />
                </motion.span>
              </div>

              <span className="pointer-events-none absolute right-5 top-5 font-heading text-5xl font-extrabold text-navy/5">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="relative text-lg font-bold text-navy">{title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-ink/60">{desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}