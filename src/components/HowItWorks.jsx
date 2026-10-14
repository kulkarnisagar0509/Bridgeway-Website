import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  CalendarHeart, ClipboardCheck, Send, BadgeCheck, ShieldCheck, PlaneTakeoff, Check,
} from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import { itemFade, viewportOnce } from '../lib/motion.jsx'

const STEPS = [
  { no: '01', icon: CalendarHeart, title: 'Consultation', desc: 'Share your background and goals in a free 1-on-1 session.' },
  { no: '02', icon: ClipboardCheck, title: 'Program Selection', desc: 'We assess your profile and shortlist the best-fit programs.' },
  { no: '03', icon: Send, title: 'Application Submission', desc: 'We prepare, review, and submit polished applications.' },
  { no: '04', icon: BadgeCheck, title: 'Admission', desc: 'Receive your offer and handle acceptance formalities.' },
  { no: '05', icon: ShieldCheck, title: 'Visa Guidance', desc: 'Study permit filing and interview prep for a smooth approval.' },
  { no: '06', icon: PlaneTakeoff, title: 'Start Your Journey', desc: 'Pre-departure briefing — you\'re ready to fly to Canada.' },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const fillH = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="how" className="section-pad bg-white">
      <div className="container-px">
        <SectionHeading
          eyebrow="The Process"
          title="How It Works"
          subtitle="A clear, guided path from your first conversation to your first day in Canada."
        />

        <div ref={ref} className="relative mt-10">
          {/* Desktop: center line */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-navy/10 max-lg:hidden" />
          <motion.div
            style={{ height: fillH }}
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-orange-gradient max-lg:hidden"
          />
          {/* Mobile: left line */}
          <div className="absolute left-5 top-0 h-full w-px bg-navy/10 lg:hidden" />
          <motion.div
            style={{ height: fillH }}
            className="absolute left-5 top-0 w-px bg-orange-gradient lg:hidden"
          />

          <div className="space-y-6 lg:space-y-10">
            {STEPS.map((step, i) => (
              <ZigStep
                key={step.no}
                step={step}
                i={i}
                active={active === i}
                done={active > i}
                onActive={setActive}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- One step: zig-zag on desktop, single-side on mobile ---- */
function ZigStep({ step, i, active, done, onActive }) {
  const side = i % 2 === 0 ? 'left' : 'right'
  const align = side === 'left' ? 'right' : 'left'
  return (
    <motion.div
      variants={itemFade}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      onViewportEnter={() => onActive(i)}
      onMouseEnter={() => onActive(i)}
      className="relative"
    >
      {/* ===== Desktop: zig-zag around the center line ===== */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
        {/* Left slot */}
        <div className={side === 'left' ? 'flex justify-end' : ''}>
          {side === 'left' && <StepCard step={step} active={active} align={align} />}
        </div>
        {/* Center node */}
        <div className="flex justify-center">
          <Node step={step} active={active} done={done} />
        </div>
        {/* Right slot */}
        <div className={side === 'right' ? 'flex justify-start' : ''}>
          {side === 'right' && <StepCard step={step} active={active} align={align} />}
        </div>
      </div>

      {/* ===== Mobile: node on the left line, card to the right ===== */}
      <div className="relative flex items-start lg:hidden">
        <div className="absolute left-0 top-0 z-10">
          <Node step={step} active={active} done={done} />
        </div>
        <div className="w-full pl-16">
          <StepCard step={step} active={active} align="left" />
        </div>
      </div>
    </motion.div>
  )
}

/* ---- Node on the line ---- */
function Node({ step, active, done }) {
  const Icon = step.icon
  return (
    <span
      className={`grid h-10 w-10 place-items-center rounded-full border-2 ring-4 ring-white transition-all duration-300 ${
        active
          ? 'border-orange bg-orange-gradient text-white shadow-lg shadow-orange/30 scale-110'
          : done
            ? 'border-orange/30 bg-orange/10 text-orange'
            : 'border-navy/15 bg-white text-navy'
      }`}
    >
      {done ? <Check className="h-5 w-5" strokeWidth={3} /> : <Icon className="h-5 w-5" />}
    </span>
  )
}

/* ---- Step content card ---- */
function StepCard({ step, active, align }) {
  const right = align === 'right'
  return (
    <div
      className={`max-w-md rounded-xl border p-5 transition-all duration-300 ${
        active
          ? 'border-orange/30 bg-white shadow-premium'
          : 'border-navy/10 bg-white shadow-sm shadow-navy/5'
      }`}
    >
      <div className={`flex items-center gap-2 ${right ? 'flex-row-reverse' : ''}`}>
        <span className="font-heading text-[11px] font-bold text-orange">STEP {step.no}</span>
        <span className="h-1 w-1 rounded-full bg-navy/20" />
        <h3 className="text-[15px] font-bold text-navy">{step.title}</h3>
      </div>
      <p className={`mt-1.5 text-sm leading-relaxed text-ink/60 ${right ? 'text-right' : ''}`}>
        {step.desc}
      </p>
    </div>
  )
}