import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CalendarHeart, ArrowRight, GraduationCap, Globe2, MapPin, Check } from 'lucide-react'
import { useModal } from '../../context/ModalContext.jsx'
import { fadeLeft, fadeRight, staggerContainer, itemFade, viewportOnce, easeOut } from '../../lib/motion.jsx'

const PATHWAY = [
  { icon: Globe2, label: 'Discover' },
  { icon: GraduationCap, label: 'Apply' },
  { icon: MapPin, label: 'Arrive' },
]

export default function AboutIntro() {
  const { openModal } = useModal()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const yBack = useTransform(scrollYProgress, [0, 1], [18, -18])

  return (
    <section className="section-pad overflow-hidden bg-white">
      <div className="container-px">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ---- Left — content ---- */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.span variants={itemFade} className="eyebrow">Who We Are</motion.span>
            <motion.h2
              variants={itemFade}
              className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.15] text-navy sm:text-3xl lg:text-[2.5rem]"
            >
              Your Trusted Partner in <span className="gradient-text-orange">Global Education</span>
            </motion.h2>
            <motion.p variants={itemFade} className="mt-5 text-base leading-relaxed text-ink/65 md:text-lg">
              Bridgewayz is committed to helping students make informed education decisions by providing expert guidance, personalized support, and access to quality educational opportunities.
            </motion.p>
            <motion.p variants={itemFade} className="mt-4 text-[15px] leading-relaxed text-ink/55">
              We believe the right guidance at the right time can change a student's entire trajectory. That's why we pair genuine counsel with trusted institutional partnerships — building bridges between ambition and opportunity, one student at a time.
            </motion.p>

            <motion.ul variants={itemFade} className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {['Expert, certified advisors', 'Personalized education roadmaps', 'Trusted Canadian partnerships', 'Transparent, honest process'].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium text-ink/80">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-gradient text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={itemFade} className="mt-7">
              <button onClick={openModal} className="btn-primary">
                <CalendarHeart className="h-4 w-4" />
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>

          {/* ---- Right — premium bridge/pathway visual ---- */}
          <motion.div
            ref={ref}
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <PathwayVisual y={y} yBack={yBack} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PathwayVisual({ y, yBack }) {
  return (
    <div className="relative">
      {/* Backdrop blobs */}
      <motion.div
        style={{ y: yBack }}
        className="pointer-events-none absolute -left-8 -top-10 -z-10 h-44 w-44 rounded-[2rem] bg-orange-gradient opacity-90 blur-[1px]"
      />
      <motion.div
        style={{ y: yBack }}
        className="pointer-events-none absolute -bottom-10 -right-6 -z-10 h-52 w-52 rounded-full bg-navy/10"
      />

      <motion.div
        style={{ y }}
        className="relative overflow-hidden rounded-[2rem] border border-navy/8 bg-cloud p-6 shadow-premium md:p-8"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-navy/10 blur-3xl" />

        {/* Header */}
        <div className="relative mb-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy">
            <GraduationCap className="h-4 w-4 text-orange" />
            Education Pathway
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-ink/50">
            <span className="h-2 w-2 rounded-full bg-green-500" /> Global
          </span>
        </div>

        {/* Bridge arc SVG */}
        <div className="relative">
          <svg className="mx-auto h-40 w-full" viewBox="0 0 400 160" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#003B8E" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#FF6B00" stopOpacity="0.9" />
                <stop offset="1" stopColor="#003B8E" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <motion.path
              d="M20 130 Q 200 -10 380 130"
              fill="none" stroke="url(#arcGrad)" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.8, ease: easeOut }}
            />
            {/* Suspension lines */}
            {[70, 120, 170, 230, 280, 330].map((lx) => {
              const t = (lx - 20) / 360
              const ay = 130 - 140 * (4 * t * (1 - t))
              return <line key={lx} x1={lx} y1={ay} x2={lx} y2={130} stroke="#003B8E" strokeOpacity="0.12" strokeWidth="1.5" />
            })}
          </svg>

          {/* Endpoints */}
          <span className="absolute left-0 top-[68%] -translate-y-1/2">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-gradient text-white shadow-lg">
              <Globe2 className="h-5 w-5" />
            </span>
          </span>
          <span className="absolute right-0 top-[68%] -translate-y-1/2">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-gradient text-white shadow-lg">
              <GraduationCap className="h-5 w-5" />
            </span>
          </span>
        </div>

        <p className="mt-1 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45">
          From aspiration to arrival
        </p>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-navy/8" />

        {/* Pathway steps */}
        <div className="relative">
          <div className="absolute left-6 right-6 top-[18px] h-0.5 -translate-y-1/2 rounded-full bg-navy/10" />
          <motion.div
            className="absolute left-6 top-[18px] h-0.5 -translate-y-1/2 rounded-full bg-orange-gradient"
            initial={{ width: '0%', opacity: 0 }}
            whileInView={{ width: '88%', opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.4, ease: easeOut, delay: 0.4 }}
          />
          <div className="relative flex items-start justify-between">
            {PATHWAY.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex w-1/3 flex-col items-center text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.5 + i * 0.18, ease: easeOut, duration: 0.5 }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-gradient text-white shadow-lg ring-2 ring-white">
                  <s.icon className="h-4 w-4" />
                </span>
                <span className="mt-2 text-[11px] font-semibold text-navy">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer chip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 1, ease: easeOut, duration: 0.5 }}
          className="mt-6 flex items-center justify-between rounded-xl border border-navy/8 bg-gradient-to-r from-orange/10 to-transparent px-4 py-3"
        >
          <span className="flex items-center gap-2 text-xs font-semibold text-navy">
            <Check className="h-4 w-4 text-orange" strokeWidth={3} /> Student-first, always
          </span>
          <span className="text-[11px] text-ink/50">10+ years guiding futures</span>
        </motion.div>
      </motion.div>
    </div>
  )
}