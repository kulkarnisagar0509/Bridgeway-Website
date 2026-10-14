import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { Users, BadgeCheck, Building2, CalendarClock } from 'lucide-react'
import { staggerContainer, itemFade, viewportOnce, useInViewOnce } from '../../lib/motion.jsx'

const METRICS = [
  { icon: Users, value: 5000, suffix: '+', label: 'Students Guided' },
  { icon: BadgeCheck, value: 98, suffix: '%', label: 'Success Rate' },
  { icon: Building2, value: 50, suffix: '+', label: 'Partner Institutions' },
  { icon: CalendarClock, value: 10, suffix: '+', label: 'Years of Excellence' },
]

// Floating background shapes
const SHAPES = [
  { x: '6%', y: '20%', s: 110, d: 0 },
  { x: '78%', y: '12%', s: 160, d: 1.2 },
  { x: '90%', y: '62%', s: 90, d: 0.6 },
  { x: '14%', y: '70%', s: 130, d: 1.8 },
]

export default function AboutMetrics() {
  const [ref, inView] = useInViewOnce(0.3)

  return (
    <section className="relative overflow-hidden bg-navy-gradient py-16 md:py-20 lg:py-24">
      {/* Background shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-worldmap opacity-30" />
        {SHAPES.map((sh, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-orange/10 blur-2xl"
            style={{ left: sh.x, top: sh.y, width: sh.s, height: sh.s }}
            animate={{ y: [0, -24, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut', delay: sh.d }}
          />
        ))}
      </div>

      <div className="container-px relative">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6"
        >
          {METRICS.map(({ icon: Icon, value, suffix, label }, i) => (
            <motion.div
              key={label}
              variants={itemFade}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm md:p-8"
            >
              <span className="border-gradient pointer-events-none absolute inset-0 rounded-[1.75rem]" />

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-orange-gradient text-white shadow-lg"
              >
                <Icon className="h-8 w-8" />
              </motion.div>

              <div className="font-heading text-4xl font-extrabold text-white md:text-5xl">
                {inView ? <CountUp end={value} suffix={suffix} duration={2.6} separator="," /> : <span>0{suffix}</span>}
              </div>
              <p className="mt-2 text-sm font-medium text-white/70">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}