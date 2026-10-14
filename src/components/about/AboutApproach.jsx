import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, FileText, HeartHandshake } from 'lucide-react'
import SectionHeading from '../SectionHeading.jsx'
import { staggerContainer, itemFade, viewportOnce, easeOut } from '../../lib/motion.jsx'

const STEPS = [
  { icon: Search, num: '01', title: 'Discover Goals', text: 'We listen to your ambitions, background, and budget to understand what success looks like for you.' },
  { icon: SlidersHorizontal, num: '02', title: 'Evaluate Opportunities', text: 'We match you with programs and institutions that genuinely fit your goals and eligibility.' },
  { icon: FileText, num: '03', title: 'Guide Applications', text: 'We help you prepare, polish, and submit strong applications — plus visa and scholarship support.' },
  { icon: HeartHandshake, num: '04', title: 'Support Every Step', text: 'We stay by your side through admission, visa, travel, and arrival — long after the offer letter.' },
]

export default function AboutApproach() {
  return (
    <section className="section-pad overflow-hidden bg-white">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our Approach"
          title="A Personalized Approach To Student Success"
          subtitle="No templates, no shortcuts — just a clear, guided journey built around you."
        />

        {/* Horizontal journey (desktop) / stacked (mobile) */}
        <div className="relative mt-14">
          {/* Connecting track — desktop */}
          <div className="absolute left-0 right-0 top-[44px] hidden h-0.5 rounded-full bg-navy/10 lg:block" />
          <motion.div
            className="absolute left-0 top-[44px] hidden h-0.5 rounded-full bg-orange-gradient lg:block"
            initial={{ width: '0%', opacity: 0 }}
            whileInView={{ width: '100%', opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.8, ease: easeOut }}
          />

          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          >
            {STEPS.map((s) => (
              <motion.div
                key={s.num}
                variants={itemFade}
                className="relative flex flex-col items-center text-center"
              >
                {/* Numbered node */}
                <div className="relative z-10 mb-5">
                  <span className="grid h-[88px] w-[88px] place-items-center rounded-full border border-navy/10 bg-white shadow-premium">
                    <span className="grid h-[72px] w-[72px] place-items-center rounded-full bg-orange-gradient text-white shadow-lg">
                      <s.icon className="h-8 w-8" />
                    </span>
                  </span>
                  <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-navy text-[11px] font-bold text-white shadow-md">
                    {s.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/60">{s.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}