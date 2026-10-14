import { motion } from 'framer-motion'
import { X, Check, Building2, Sparkles } from 'lucide-react'
import SectionHeading from '../SectionHeading.jsx'
import { fadeLeft, fadeRight, staggerContainer, itemFade, viewportOnce } from '../../lib/motion.jsx'

const COMPARISONS = [
  { trad: 'Generic Advice', us: 'Personalized Guidance' },
  { trad: 'Limited Support', us: 'End-to-End Assistance' },
  { trad: 'Transactional Relationship', us: 'Long-Term Partnership' },
  { trad: 'Program Suggestions', us: 'Career-Focused Planning' },
]

export default function AboutDifference() {
  return (
    <section className="section-pad bg-white">
      <div className="container-px">
        <SectionHeading
          eyebrow="What Sets Us Apart"
          title="The Bridgewayz Difference"
          subtitle="Not all education consultants are built the same. Here's what a student-first partnership really looks like."
        />

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          {/* ---- Traditional (muted) ---- */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative overflow-hidden rounded-[2rem] border border-navy/8 bg-cloud p-7 md:p-8"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-navy/5 blur-3xl" />
            <div className="relative flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy/8 text-ink/40">
                <Building2 className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-ink/70">Traditional Consultants</h3>
                <p className="text-xs font-medium text-ink/40">The usual experience</p>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {COMPARISONS.map((c) => (
                <li key={c.trad} className="flex items-center gap-3 rounded-xl border border-navy/5 bg-white/60 p-3.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-red-100 text-red-500">
                    <X className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-ink/55">{c.trad}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ---- Bridgewayz (premium) ---- */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative overflow-hidden rounded-[2rem] border border-navy/8 bg-navy-gradient p-7 text-white shadow-premium md:p-8"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-worldmap opacity-40" />
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-orange/15 blur-3xl" />
              <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-navy-300/20 blur-3xl" />
            </div>
            <div className="pointer-events-none absolute -right-px top-0 h-px w-full bg-gradient-to-r from-transparent via-orange/60 to-transparent" />

            <div className="relative flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-gradient text-white shadow-lg">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">Bridgewayz</h3>
                <p className="text-xs font-medium text-white/60">The student-first experience</p>
              </div>
            </div>

            <motion.ul
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-6 space-y-3"
            >
              {COMPARISONS.map((c) => (
                <motion.li
                  key={c.us}
                  variants={itemFade}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm transition-colors hover:border-orange/40 hover:bg-white/10"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-gradient text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-white/90">{c.us}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}