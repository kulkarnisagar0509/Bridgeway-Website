import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CalendarHeart, ChevronRight, Home, ChevronDown, Plus,
  Zap, Rocket, Map as MapIcon, Languages, LifeBuoy, HeartHandshake,
  MessageCircle, Compass, ClipboardCheck, Send, PlaneTakeoff,
  ShieldCheck, UserRound, TrendingUp, Scale, MapPin,
} from 'lucide-react'
import { useModal } from '../context/ModalContext.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import {
  staggerContainer, itemFade, fadeLeft, fadeRight,
  viewportOnce, easeOut,
} from '../lib/motion.jsx'

// Programs we support — adapted for Bridgewayz (meaning preserved, reworded).
const PROGRAMS = [
  {
    icon: Zap,
    title: 'Express Entry & Skilled Worker Program',
    desc: 'Fast-track your Canadian permanent residence through Express Entry — including the Federal Skilled Worker, Canadian Experience Class, and Federal Skilled Trades programs.',
    color: 'from-orange to-orange-400',
  },
  {
    icon: Rocket,
    title: 'Entrepreneur & Startup Visa Programs',
    desc: 'Launch and grow your business in Canada with experienced support for the Startup Visa, Self-Employed Persons, and broader Business Immigration streams.',
    color: 'from-navy to-navy-600',
  },
  {
    icon: MapIcon,
    title: 'Provincial Nominee Programs (PNP)',
    desc: 'Tap into immigration routes across Canada’s provinces and territories with PNP guidance shaped around your skills, occupation, and goals.',
    color: 'from-orange-400 to-orange',
  },
  {
    icon: Languages,
    title: 'Francophone Immigration Pathways',
    desc: 'Dedicated support for French-speaking applicants pursuing Canada’s Francophone immigration streams and Mobilité Francophone options.',
    color: 'from-navy-600 to-navy',
  },
  {
    icon: LifeBuoy,
    title: 'Complex Case Handling',
    desc: 'Seasoned support for refusals, appeals, and reapplications — we work through difficult immigration situations with proven, case-specific strategies.',
    color: 'from-orange to-orange-600',
  },
  {
    icon: HeartHandshake,
    title: 'Post-Arrival Settlement Services',
    desc: 'Settle in with confidence — help with housing, banking, community integration, and the essential services you need after arriving in Canada.',
    color: 'from-navy to-navy-800',
  },
]

// Process steps.
const STEPS = [
  { icon: MessageCircle, title: 'Free Consultation', desc: 'Tell us about your goals. We assess your eligibility and recommend the strongest pathway for your situation.' },
  { icon: Compass, title: 'Personalized Strategy', desc: 'Our consultants build a tailored immigration plan shaped to your profile, needs, and timeline.' },
  { icon: ClipboardCheck, title: 'Document Preparation', desc: 'We walk you through every document, checking for accuracy and completeness so your application is filing-ready.' },
  { icon: Send, title: 'Application Submission', desc: 'Your application is professionally prepared and submitted — we handle the complexity so you can focus on what’s ahead.' },
  { icon: PlaneTakeoff, title: 'Ongoing Support', desc: 'From approval to arrival, we stay alongside you with guidance for settlement, education, and career success.' },
]

// Why choose us.
const REASONS = [
  { icon: ShieldCheck, title: 'ICCRC Certified Consultants', desc: 'All our consultants are licensed and regulated by the ICCRC.' },
  { icon: UserRound, title: 'Personalized Strategy', desc: 'Every plan is built around your unique profile, goals, and timeline.' },
  { icon: TrendingUp, title: 'High Success Rate', desc: 'More than 95% of the applications we prepare are approved.' },
  { icon: Scale, title: 'Complex Case Expertise', desc: 'Specialized handling of appeals, refusals, and reapplications.' },
]

const FAQS = [
  {
    q: 'How do I know which immigration pathway is right for me?',
    a: 'It starts with a free consultation. We review your background, work experience, education, language skills, and goals, then recommend the pathway — or combination of pathways — that gives you the strongest, most realistic route to Canada.',
  },
  {
    q: 'Can you guarantee my application will be approved?',
    a: 'No ethical consultant can guarantee an outcome — the decision always rests with the immigration authorities. What we guarantee is that your application is complete, accurate, well-supported, and submitted on the strongest possible footing.',
  },
  {
    q: 'I was refused before. Can you still help?',
    a: 'Yes. Refusals are common and often fixable. We review the refusal reasons, assess whether a reapplication or appeal makes sense, and strengthen your case so it addresses the concerns that led to the original decision.',
  },
  {
    q: 'Do you file the application on my behalf?',
    a: 'We prepare everything with you and, where the pathway allows, submit through our regulated consultant portal. Either way, you stay informed at every step and retain full ownership of your application and decisions.',
  },
  {
    q: 'Do you help after I arrive in Canada?',
    a: 'Yes. Our post-arrival settlement support covers housing, banking, community integration, and the essential services that help you land on your feet and start your new life with confidence.',
  },
]

export default function EconomicImmigration() {
  return (
    <main>
      <EconomicHero />
      <EconomicPrograms />
      <EconomicProcess />
      <EconomicWhy />
      <EconomicFaq />
      <EconomicCta />
    </main>
  )
}

/* ---------- Hero ---------- */
function EconomicHero() {
  const { openModal } = useModal()

  return (
    <section className="relative overflow-hidden bg-navy-gradient pb-20 pt-32 md:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-worldmap opacity-40" />
        <div className="absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full bg-orange/12 blur-[120px]" />
        <div className="absolute right-[-8%] top-[-14%] h-[32rem] w-[32rem] rounded-full bg-navy-300/20 blur-[130px]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.16]" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="eiArc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#FF6B00" stopOpacity="0" />
              <stop offset="0.5" stopColor="#FF6B00" stopOpacity="0.9" />
              <stop offset="1" stopColor="#FF6B00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M-50 300 Q 520 160 1040 300 T 1960 300"
            fill="none" stroke="url(#eiArc)" strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: easeOut, delay: 0.3 }}
          />
        </svg>
      </div>

      <div className="container-px relative">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.nav
            variants={itemFade}
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium text-white/55"
          >
            <Link to="/#home" className="inline-flex items-center gap-1 transition-colors hover:text-white">
              <Home className="h-3.5 w-3.5" /> Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <span className="text-white/85">Economic Immigration</span>
          </motion.nav>

          <motion.span
            variants={itemFade}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm"
          >
            <span className="text-sm leading-none">🇨🇦</span>
            Canadian Economic Immigration
          </motion.span>

          <motion.h1
            variants={itemFade}
            className="mt-5 text-balance text-[2.2rem] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]"
          >
            Economic <span className="gradient-text-orange">Immigration</span>
          </motion.h1>

          <motion.p
            variants={itemFade}
            className="mt-4 text-balance text-lg font-semibold text-white/90 sm:text-xl lg:text-2xl"
          >
            Your Canadian immigration journey, guided from start to finish
          </motion.p>

          <motion.p
            variants={itemFade}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 lg:text-base"
          >
            Canada offers more than 80 immigration pathways. We help you identify the one that fits your profile, goals, and timeline — and guide you through every step of it.
          </motion.p>

          <motion.div
            variants={itemFade}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <button onClick={openModal} className="btn-primary w-full sm:w-auto">
              <CalendarHeart className="h-4 w-4" /> Book Free Consultation
            </button>
            <Link to="/contact" className="btn-ghost-light w-full sm:w-auto">
              Talk to an Advisor <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Programs we support ---------- */
function EconomicPrograms() {
  const { openModal } = useModal()

  return (
    <section className="section-pad bg-white">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our Services"
          title="Immigration Programs We Support"
          subtitle="From skilled-worker streams to business and Francophone pathways, we match you to the program that fits — then guide you through it."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROGRAMS.map(({ icon: Icon, title, desc, color }) => (
            <motion.article
              key={title}
              variants={itemFade}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-md shadow-navy/10 transition-shadow duration-300 hover:shadow-premium"
            >
              <span className="border-gradient pointer-events-none absolute inset-0 rounded-2xl" />

              <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
                <motion.span whileHover={{ rotate: 10, scale: 1.12 }} transition={{ type: 'spring', stiffness: 300, damping: 14 }}>
                  <Icon className="h-8 w-8" strokeWidth={1.8} />
                </motion.span>
              </div>

              <h3 className="relative mt-5 text-lg font-bold text-navy">{title}</h3>
              <p className="relative mt-2 flex-1 text-sm leading-relaxed text-ink/60">{desc}</p>

              <button
                onClick={openModal}
                className="relative mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-orange transition-all group-hover:gap-2.5"
              >
                Request a Consultation <ArrowRight className="h-4 w-4" />
              </button>

              {/* Decorative blob */}
              <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange/5 transition-transform duration-500 group-hover:scale-150" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Process (vertical stepper) ---------- */
function EconomicProcess() {
  return (
    <section className="section-pad bg-cloud">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our Process"
          title="How It Works"
          subtitle="A simple, transparent process that takes you from first consultation to Canadian residency."
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <span className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-0.5 rounded-full bg-navy/10" />
          <motion.span
            className="absolute left-[27px] top-2 w-0.5 rounded-full bg-orange-gradient"
            initial={{ height: 0 }}
            whileInView={{ height: 'calc(100% - 1rem)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.6, ease: easeOut }}
          />

          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeRight}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="relative flex items-start gap-5"
              >
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-navy/10 bg-white shadow-md">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-orange-gradient text-sm font-bold text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <div className="flex-1 rounded-2xl border border-navy/10 bg-white p-5">
                  <div className="flex items-center gap-2">
                    <step.icon className="h-5 w-5 text-orange" />
                    <h3 className="text-base font-bold text-navy">{step.title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Why choose us ---------- */
function EconomicWhy() {
  return (
    <section className="section-pad bg-white">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Expert guidance every step of the way"
          subtitle="Our team of regulated immigration consultants brings years of experience and a deep understanding of Canadian immigration law."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {REASONS.map(({ icon: Icon, title, desc }, i) => (
            <motion.article
              key={title}
              variants={itemFade}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-md shadow-navy/10 transition-shadow duration-300 hover:shadow-premium"
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-navy/8 text-navy transition-all duration-300 group-hover:bg-orange-gradient group-hover:text-white">
                <motion.span whileHover={{ rotate: 8, scale: 1.12 }} transition={{ type: 'spring', stiffness: 300, damping: 14 }}>
                  <Icon className="h-7 w-7" />
                </motion.span>
              </div>

              <span className="pointer-events-none absolute right-5 top-5 font-heading text-5xl font-extrabold text-navy/5">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="relative text-base font-bold text-navy">{title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-ink/60">{desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */
function EconomicFaq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section-pad bg-cloud">
      <div className="container-px">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={viewportOnce} className="lg:col-span-5">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.15] text-navy sm:text-3xl lg:text-[2.3rem]">
              Questions about economic immigration
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/60">
              Still unsure? Our advisors answer questions like these every day — and there’s no such thing as a silly one.
            </p>
            <Link to="/contact" className="btn-outline mt-6">
              Ask a question <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={viewportOnce} className="lg:col-span-7">
            <div className="space-y-3">
              {FAQS.map((f, i) => {
                const isOpen = open === i
                return (
                  <div
                    key={f.q}
                    className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                      isOpen ? 'border-orange/40 shadow-md shadow-navy/5' : 'border-navy/10'
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[15px] font-semibold text-navy">{f.q}</span>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
                        isOpen ? 'bg-orange-gradient text-white' : 'bg-navy/8 text-navy'
                      }`}>
                        {isOpen ? <ChevronDown className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: easeOut }}
                        >
                          <p className="px-5 pb-5 text-sm leading-relaxed text-ink/60">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- CTA ---------- */
function EconomicCta() {
  const { openModal } = useModal()
  return (
    <section className="relative overflow-hidden bg-navy-gradient py-14 md:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-worldmap opacity-30" />
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange/15 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-navy-300/20 blur-3xl" />
      </div>
      <div className="container-px relative">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left"
        >
          <div className="max-w-xl">
            <motion.h2 variants={itemFade} className="text-balance text-2xl font-bold text-white sm:text-3xl">
              Ready to start your Canadian immigration journey?
            </motion.h2>
            <motion.p variants={itemFade} className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
              Book a free consultation and get a personalized pathway plan from a regulated Bridgewayz immigration consultant.
            </motion.p>
          </div>
          <motion.div variants={itemFade} className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <button onClick={openModal} className="btn-primary">
              <CalendarHeart className="h-4 w-4" /> Book Free Consultation
            </button>
            <Link to="/contact" className="btn-ghost-light">
              <MapPin className="h-4 w-4" /> Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}