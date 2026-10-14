import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInViewOnce, staggerContainer, itemFade, viewportOnce } from '../lib/motion.jsx'
import { Users, Building2, BadgeCheck, CalendarClock } from 'lucide-react'

const STATS = [
  { icon: Users, value: 5000, suffix: '+', label: 'Students Guided' },
  { icon: Building2, value: 50, suffix: '+', label: 'Partner Institutions' },
  { icon: BadgeCheck, value: 98, suffix: '%', label: 'Success Rate' },
  { icon: CalendarClock, value: 10, suffix: '+', label: 'Years Experience' },
]

export default function Stats() {
  const [ref, inView] = useInViewOnce(0.3)

  return (
    <section className="relative pt-10 md:pt-12">
      <div className="container-px">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {STATS.map(({ icon: Icon, value, suffix, label }, i) => (
            <motion.div
              key={label}
              variants={itemFade}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative rounded-2xl border border-navy/10 bg-white p-5 text-center shadow-md shadow-navy/10 md:p-6"
            >
              {/* Animated gradient border on hover */}
              <span className="border-gradient pointer-events-none absolute inset-0 rounded-2xl" />

              {/* Floating icon */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-navy/8 text-navy transition-colors duration-300 group-hover:bg-orange-gradient group-hover:text-white"
              >
                <Icon className="h-7 w-7" />
              </motion.div>

              <div className="font-heading text-3xl font-extrabold text-navy md:text-4xl">
                {inView ? <CountUp end={value} suffix={suffix} duration={2.4} separator="," /> : <span>0{suffix}</span>}
              </div>
              <p className="mt-1.5 text-xs font-medium text-ink/60 md:text-sm">{label}</p>

              {/* bottom accent line */}
              <span className="mx-auto mt-4 block h-1 w-8 rounded-full bg-orange-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}