import { motion } from 'framer-motion'
import { Globe, Home, Repeat, BriefcaseBusiness, ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import { useModal } from '../context/ModalContext.jsx'
import { staggerContainer, itemFade, viewportOnce } from '../lib/motion.jsx'

const GROUPS = [
  { icon: Globe, title: 'International Students', desc: 'Moving to Canada from abroad — we handle admissions, visa, and arrival.' },
  { icon: Home, title: 'Domestic Students', desc: 'Already in Canada? Find the right program and funding faster.' },
  { icon: Repeat, title: 'Career Changers', desc: 'Pivoting to a new field with targeted, future-ready programs.' },
  { icon: BriefcaseBusiness, title: 'Working Professionals', desc: 'Upskill with flexible pathways while you keep working.' },
]

export default function WhoWeHelp() {
  const { openModal } = useModal()
  return (
    <section className="section-pad bg-cloud">
      <div className="container-px">
        <SectionHeading
          eyebrow="Who We Help"
          title="Built For Every Student's Journey"
          subtitle="No matter where you're starting from, we tailor our guidance to your situation and goals."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {GROUPS.map(({ icon: Icon, title, desc }, i) => (
            <motion.article
              key={title}
              variants={itemFade}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-md shadow-navy/10 transition-shadow duration-300 hover:shadow-premium"
            >
              {/* Faint index watermark */}
              <span className="pointer-events-none absolute right-5 top-4 font-heading text-4xl font-extrabold text-navy/[0.06]">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Larger icon container — clean, no overlap */}
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy/8 text-navy transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-gradient group-hover:text-white">
                <Icon className="h-7 w-7" strokeWidth={1.8} />
              </span>

              {/* Title + desc */}
              <h3 className="mt-5 text-base font-bold text-navy">{title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink/60">{desc}</p>

              {/* CTA */}
              <button
                onClick={openModal}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange transition-all hover:gap-2.5"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}