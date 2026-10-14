import { motion } from 'framer-motion'
import {
  Flag, TrendingUp, Handshake, Award, Telescope,
} from 'lucide-react'
import SectionHeading from '../SectionHeading.jsx'
import { fadeUp, fadeLeft, fadeRight, viewportOnce, easeOut } from '../../lib/motion.jsx'

const MILESTONES = [
  {
    icon: Flag, year: '2014', title: 'Foundation',
    text: 'Bridgewayz is founded on a simple belief — every student deserves honest, expert guidance to study abroad.',
  },
  {
    icon: TrendingUp, year: '2017', title: 'Student Growth',
    text: 'Our first 1,000 students secure admissions across Canada, building a reputation for student-first counsel.',
  },
  {
    icon: Handshake, year: '2020', title: 'Partnership Expansion',
    text: 'We establish direct relationships with 50+ colleges and universities, unlocking priority pathways for students.',
  },
  {
    icon: Award, year: '2023', title: 'Industry Recognition',
    text: 'Recognized as a trusted Canadian education advisor with a 98% success rate across admissions and visa filing.',
  },
  {
    icon: Telescope, year: 'Today & Beyond', title: 'Future Vision',
    text: 'Expanding personalized, career-focused guidance to empower the next generation of global students.',
  },
]

export default function AboutStory() {
  return (
    <section className="section-pad overflow-hidden bg-cloud">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our Journey"
          title="Building Bridges Between Students and Opportunities"
          subtitle="A decade of turning uncertainty into clarity — milestone by milestone."
        />

        {/* Timeline */}
        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* Center line (desktop) / left line (mobile) */}
          <span className="absolute left-4 top-0 h-full w-0.5 rounded-full bg-navy/12 md:left-1/2 md:-translate-x-1/2" />
          <motion.span
            className="absolute left-4 top-0 w-0.5 rounded-full bg-orange-gradient md:left-1/2 md:-translate-x-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.6, ease: easeOut }}
          />

          <div className="space-y-8 md:space-y-0">
            {MILESTONES.map((m, i) => {
              const left = i % 2 === 0
              return (
                <TimelineCard key={m.title} item={m} index={i} left={left} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineCard({ item, index, left }) {
  const { icon: Icon, year, title, text } = item
  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-x-10 md:[&:not(:last-child)]:mb-10">
      {/* Node dot */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 16 }}
        className="absolute left-4 top-1 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-white shadow-md ring-4 ring-cloud md:left-1/2"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-orange-gradient text-white">
          <Icon className="h-3.5 w-3.5" />
        </span>
      </motion.span>

      {/* Card — alternating sides on desktop, always right of the line on mobile */}
      <motion.div
        variants={left ? fadeLeft : fadeRight}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className={`ml-12 md:ml-0 ${left ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}`}
      >
        <div className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-md shadow-navy/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange">
            <Icon className="h-3.5 w-3.5" />
            {year}
          </span>
          <h3 className="mt-3 text-lg font-bold text-navy">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/60">{text}</p>
        </div>
      </motion.div>
    </div>
  )
}