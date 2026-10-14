import { motion } from 'framer-motion'
import {
  HeartPulse, Briefcase, Cpu, Wrench, Hotel, Hammer, BookOpen, Landmark,
  Megaphone, ShieldCheck, BrainCircuit, Building2,
} from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import { staggerContainer, itemFade, viewportOnce } from '../lib/motion.jsx'

const AREAS = [
  { icon: HeartPulse, label: 'Healthcare', desc: 'Nursing, PSW & allied health.' },
  { icon: Briefcase, label: 'Business', desc: 'Management & operations.' },
  { icon: Cpu, label: 'Technology', desc: 'Software & IT systems.' },
  { icon: Wrench, label: 'Engineering', desc: 'Mechanical & electrical.' },
  { icon: Hotel, label: 'Hospitality', desc: 'Tourism & culinary arts.' },
  { icon: Hammer, label: 'Skilled Trades', desc: 'Construction & welding.' },
  { icon: BookOpen, label: 'Education', desc: 'Teaching & early childhood.' },
  { icon: Landmark, label: 'Finance', desc: 'Accounting & banking.' },
  { icon: Megaphone, label: 'Marketing', desc: 'Digital & brand strategy.' },
  { icon: ShieldCheck, label: 'Cyber Security', desc: 'Threat & risk defense.' },
  { icon: BrainCircuit, label: 'AI & Data Science', desc: 'Machine learning & analytics.' },
  { icon: Building2, label: 'Construction', desc: 'Project & site management.' },
]

function Pill({ area, i }) {
  const { icon: Icon, label, desc } = area
  return (
    <motion.div
      variants={itemFade}
      className="group relative flex items-center gap-3.5 rounded-xl border border-navy/10 bg-white p-3.5 shadow-sm shadow-navy/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange/30 hover:bg-orange/[0.03] hover:shadow-md hover:shadow-navy/10"
    >
      {/* Icon */}
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-navy/8 text-navy transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-gradient group-hover:text-white">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </span>
      {/* Text */}
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold leading-tight text-navy">{label}</h3>
        <p className="mt-0.5 truncate text-xs leading-snug text-ink/55">{desc}</p>
      </div>
      {/* Index accent */}
      <span className="font-heading text-[11px] font-bold text-navy/15 transition-colors group-hover:text-orange/50">
        {String(i + 1).padStart(2, '0')}
      </span>
    </motion.div>
  )
}

export default function AreasOfStudy() {
  return (
    <section className="section-pad bg-cloud">
      <div className="container-px">
        <SectionHeading
          eyebrow="Study Areas"
          title="Explore Academic Pathways"
          subtitle="Discover the programs that lead to in-demand Canadian careers — across every major field of study."
        />

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {AREAS.map((area, i) => (
            <Pill key={area.label} area={area} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}