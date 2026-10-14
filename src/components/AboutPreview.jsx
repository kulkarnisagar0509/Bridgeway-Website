import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, Award, TrendingUp, Users } from 'lucide-react'
import { fadeLeft, fadeRight, staggerContainer, itemFade, viewportOnce } from '../lib/motion.jsx'

const FEATURES = ['Personalized Support', 'Trusted Institutions', 'Admission Assistance', 'Career Guidance']

const METRICS = [
  { icon: Award, v: '10+', l: 'Years of expertise' },
  { icon: TrendingUp, v: '98%', l: 'Visa success rate' },
  { icon: Users, v: '5K+', l: 'Students guided' },
]

export default function AboutPreview() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="about" className="section-pad overflow-hidden bg-white">
      <div className="container-px">
        <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left — layered image */}
          <motion.div
            ref={ref}
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Background shape (overlapped by image) */}
            <div className="absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-[2rem] bg-orange-gradient opacity-90 blur-[1px]" />
            <div className="absolute -bottom-8 -right-6 -z-10 h-48 w-48 rounded-full bg-navy/10" />

            <div className="relative overflow-hidden rounded-[2rem] shadow-premium">
              <div className="aspect-[4/5] w-full">
                <motion.img
                  src="/images/about-education.jpg"
                  alt="Students walking across a Canadian university campus"
                  loading="lazy"
                  style={{ y }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating experience counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 18 }}
              className="absolute -bottom-6 -right-3 w-48 rounded-2xl border border-white/60 bg-white/95 p-5 shadow-premium backdrop-blur-xl lg:-right-8"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-gradient text-white shadow-lg">
                  <Award className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-heading text-2xl font-extrabold text-navy">10+</p>
                  <p className="text-[11px] text-ink/60">Years experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — elevated content card */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative rounded-[2rem] border border-navy/8 bg-white p-6 shadow-premium md:p-8"
          >
            <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent" />
            <span className="eyebrow">About Bridgewayz</span>
            <h2 className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.15] text-navy sm:text-3xl lg:text-[2.4rem]">
              Helping Students Build Better Futures
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/60 md:text-lg">
              For over a decade, Bridgewayz has guided students toward the right education choices across Canada. We combine personalized advising, trusted institutional partnerships, and a transparent process — so every student can move forward with clarity and confidence.
            </p>

            {/* Success metrics */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {METRICS.map(({ icon: Icon, v, l }) => (
                <div key={l} className="rounded-2xl bg-cloud p-4 text-center">
                  <Icon className="mx-auto h-5 w-5 text-orange" />
                  <p className="mt-1.5 font-heading text-xl font-extrabold text-navy">{v}</p>
                  <p className="text-[11px] leading-tight text-ink/55">{l}</p>
                </div>
              ))}
            </div>

            {/* Feature list */}
            <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium text-ink/80">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-gradient text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link to="/#services" className="btn-primary mt-6">
              Explore Our Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}