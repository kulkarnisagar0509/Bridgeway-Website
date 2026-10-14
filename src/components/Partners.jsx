import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import { staggerContainer, itemFade, viewportOnce } from '../lib/motion.jsx'

// Partner data — `logo` points to the real logo image served from the
// project's public folder. `mark` is kept as a fallback monogram.
const PARTNERS = [
  {
    name: 'Glint Immigration',
    mark: 'GI',
    logo: '/Glint.png',
    desc: 'Study permits & visa support for international students.',
  },
  {
    name: 'Regulated Canadian Immigration Consultant (RCIC)',
    mark: 'RC',
    logo: '/RCIC.png',
    desc: 'Authorized Canadian immigration representation and advice.',
  },
]

function PartnerCard({ p }) {
  return (
    <motion.div variants={itemFade} className="group h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-7 shadow-lg shadow-navy/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium">
        {/* Animated gradient border on hover */}
        <span className="border-gradient pointer-events-none absolute inset-0 rounded-2xl" />

        {/* Logo — frame aspect matches the 500×213 logo so it fills edge-to-edge */}
        <div className="flex aspect-[500/213] w-full items-center justify-center rounded-xl border border-navy/10 bg-cloud p-3 sm:p-4">
          <img
            src={p.logo}
            alt={`${p.name} logo`}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Name + descriptor */}
        <h3 className="mt-6 font-heading text-lg font-bold text-navy">{p.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/55">{p.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Partners() {
  return (
    <section className="section-pad bg-white">
      <div className="container-px">
        <SectionHeading
          eyebrow="Corporate Partners"
          title="Proud to Partner With"
          subtitle="We collaborate with forward-thinking companies to connect our students with real-world opportunities, mentorship, and career pathways."
        />

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2"
        >
          {PARTNERS.map((p) => (
            <PartnerCard key={p.name} p={p} />
          ))}
        </motion.div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-ink/40">
          <Building2 className="h-3.5 w-3.5" />
          Official partnerships — more partner logos announced soon.
        </p>
      </div>
    </section>
  )
}