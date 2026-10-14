import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { Compass, UserRound, LifeBuoy, ClipboardCheck, ArrowRight } from 'lucide-react'
import { useModal } from '../../context/ModalContext.jsx'
import { fadeLeft, staggerContainer, itemFade, viewportOnce, useInViewOnce } from '../../lib/motion.jsx'

const STATS = [
  { value: 5000, suffix: '+', label: 'Students Guided' },
  { value: 50, suffix: '+', label: 'Education Partners' },
  { value: 98, suffix: '%', label: 'Success Rate' },
  { value: 10, suffix: '+', label: 'Years Experience' },
]

// Vertical feature rows — a distinct layout from the homepage's 2×2 feature grid.
const FEATURES = [
  { icon: Compass, title: 'Personalized Guidance', desc: 'A roadmap built around your goals, background, and budget.' },
  { icon: UserRound, title: 'Expert Advisors', desc: 'Certified counselors with years of Canadian admissions experience.' },
  { icon: LifeBuoy, title: 'Student-Centered Support', desc: 'Responsive, one-on-one help at every step of your journey.' },
  { icon: ClipboardCheck, title: 'End-to-End Assistance', desc: 'From program selection to visa filing and pre-departure.' },
]

export default function AboutWhy() {
  const { openModal } = useModal()
  const [ref, inView] = useInViewOnce(0.3)

  return (
    <section className="section-pad bg-cloud">
      <div className="container-px">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ---- Left — content + stats ---- */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col justify-center"
          >
            <span className="eyebrow">Why Bridgewayz</span>
            <h2 className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.15] text-navy sm:text-3xl lg:text-[2.5rem]">
              Why Students Trust Bridgewayz
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/60 md:text-base">
              We've spent over a decade earning that trust — one student, one family, and one successful journey at a time. The numbers tell the story.
            </p>

            {/* Animated stat counters */}
            <div ref={ref} className="mt-7 grid grid-cols-2 gap-4">
              {STATS.map(({ value, suffix, label }) => (
                <div key={label} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-md shadow-navy/5">
                  <p className="font-heading text-3xl font-extrabold text-navy">
                    {inView ? <CountUp end={value} suffix={suffix} duration={2.4} separator="," /> : <span>0{suffix}</span>}
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink/55 md:text-sm">{label}</p>
                </div>
              ))}
            </div>

            <button onClick={openModal} className="btn-primary mt-7 w-fit">
              Book Free Consultation
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* ---- Right — vertical feature list ---- */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col justify-center"
          >
            <div className="space-y-3.5">
              {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                <motion.article
                  key={title}
                  variants={itemFade}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-navy/10 bg-white p-5 shadow-md shadow-navy/5 transition-shadow duration-300 hover:shadow-premium"
                >
                  {/* Accent bar that slides in on hover */}
                  <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 rounded-r-full bg-orange-gradient transition-transform duration-300 group-hover:scale-y-100" />

                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy/8 text-navy transition-colors duration-300 group-hover:bg-orange-gradient group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-xs font-bold text-navy/30">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="text-base font-bold text-navy">{title}</h3>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">{desc}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}