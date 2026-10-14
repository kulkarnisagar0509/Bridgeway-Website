import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import { SERVICES } from '../data/services.js'
import { staggerContainer, itemFade, viewportOnce } from '../lib/motion.jsx'

export default function Services() {
  return (
    <section id="services" className="section-pad bg-white">
      <div className="container-px">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Core Services"
          subtitle="Comprehensive support across every stage of your study-in-Canada journey — from first question to first day on campus."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map(({ icon: Icon, title, short, color, featured, slug }) => (
            <motion.article
              key={slug}
              variants={itemFade}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`group relative overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-md shadow-navy/10 transition-shadow duration-300 hover:shadow-premium ${
                featured ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <span className="border-gradient pointer-events-none absolute inset-0 rounded-2xl" />

              <Link to={`/services/${slug}`} className="flex items-start gap-5" aria-label={title}>
                <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
                  <motion.span whileHover={{ rotate: 10, scale: 1.12 }} transition={{ type: 'spring', stiffness: 300, damping: 14 }}>
                    <Icon className="h-8 w-8" strokeWidth={1.8} />
                  </motion.span>
                </div>
                <div className="relative">
                  <h3 className="text-xl font-bold text-navy">{title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">{short}</p>
                </div>
              </Link>

              <Link
                to={`/services/${slug}`}
                className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange transition-all group-hover:gap-2.5"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Decorative blob */}
              <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange/5 transition-transform duration-500 group-hover:scale-150" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}