import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CalendarHeart, Check, ChevronRight, Home, ChevronDown,
  Plus, ArrowLeft, MapPin,
} from 'lucide-react'
import { getServiceBySlug, SERVICES } from '../data/services.js'
import { useModal } from '../context/ModalContext.jsx'
import {
  staggerContainer, itemFade, fadeLeft, fadeRight, fadeUp,
  viewportOnce, easeOut,
} from '../lib/motion.jsx'

// Fixed color sequence for the Related services cards — applied by position
// so every service page shows the same visual rhythm regardless of which
// three services happen to appear.
const RELATED_COLORS = [
  'from-orange to-orange-400',
  'from-navy to-navy-600',
  'from-orange-400 to-orange',
]

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-cloud px-6 pt-24 text-center">
        <div>
          <p className="font-heading text-5xl font-extrabold text-navy/20">404</p>
          <h1 className="mt-3 text-2xl font-bold text-navy">Service not found</h1>
          <p className="mt-2 text-sm text-ink/60">We couldn’t find that service.</p>
          <Link to="/#services" className="btn-primary mt-6">
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>
        </div>
      </main>
    )
  }

  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <main>
      <ServiceHero service={service} />
      <ServiceOverview service={service} />
      <ServiceIncludes service={service} />
      <ServiceProcess service={service} />
      <ServiceFaq service={service} />
      <ServiceRelated related={related} />
      <ServiceCta />
    </main>
  )
}

/* ---------- Hero ---------- */
function ServiceHero({ service }) {
  const { icon: Icon, title, tagline, heroDesc, color } = service
  const { openModal } = useModal()

  return (
    <section className="relative overflow-hidden bg-navy-gradient pb-20 pt-32 md:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-worldmap opacity-40" />
        <div className="absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full bg-orange/12 blur-[120px]" />
        <div className="absolute right-[-8%] top-[-14%] h-[32rem] w-[32rem] rounded-full bg-navy-300/20 blur-[130px]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.16]" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="svcArc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#FF6B00" stopOpacity="0" />
              <stop offset="0.5" stopColor="#FF6B00" stopOpacity="0.9" />
              <stop offset="1" stopColor="#FF6B00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M-50 300 Q 520 160 1040 300 T 1960 300"
            fill="none" stroke="url(#svcArc)" strokeWidth="2"
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
            <Link to="/#services" className="transition-colors hover:text-white">Services</Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <span className="text-white/85">{title}</span>
          </motion.nav>

          <motion.span
            variants={itemFade}
            className={`mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}
          >
            <Icon className="h-10 w-10" strokeWidth={1.8} />
          </motion.span>

          <motion.h1
            variants={itemFade}
            className="mt-6 text-balance text-[2.1rem] font-extrabold leading-[1.08] text-white sm:text-4xl lg:text-[3.1rem]"
          >
            {title}
          </motion.h1>
          <motion.p variants={itemFade} className="mt-3 text-balance text-lg font-semibold text-white/90 lg:text-xl">
            {tagline}
          </motion.p>
          <motion.p variants={itemFade} className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 lg:text-base">
            {heroDesc}
          </motion.p>

          <motion.div variants={itemFade} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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

/* ---------- Overview (balanced image + content) ---------- */
function ServiceOverview({ service }) {
  const { title, image, overview, tagline, icon: Icon } = service
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [28, -28])

  return (
    <section className="section-pad overflow-hidden bg-white">
      <div className="container-px">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image — landscape, framed, balanced height */}
          <motion.div
            ref={ref}
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="absolute -left-5 -top-5 -z-10 h-32 w-32 rounded-[1.5rem] bg-orange-gradient opacity-90 blur-[1px]" />
            <div className="absolute -bottom-6 -right-5 -z-10 h-36 w-36 rounded-full bg-navy/10" />
            <motion.div style={{ y }} className="relative overflow-hidden rounded-[1.5rem] shadow-premium">
              <div className="aspect-[4/3] w-full">
                <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />
              {/* Floating label ties the image to the service */}
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-xs font-semibold text-navy shadow-lg backdrop-blur">
                <Icon className="h-4 w-4 text-orange" />
                {title}
              </div>
            </motion.div>
          </motion.div>

          {/* Content — heading + paragraphs + per-service callout to match image height */}
          <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <span className="eyebrow">Overview</span>
            <h2 className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.15] text-navy sm:text-3xl lg:text-[2.3rem]">
              What {title} covers
            </h2>
            <div className="mt-5 space-y-4">
              {overview.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-ink/65 md:text-base">{p}</p>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-navy/8 bg-cloud p-5">
              <span className="mt-0.5 h-8 w-1 shrink-0 rounded-full bg-orange-gradient" />
              <p className="text-[15px] font-semibold leading-snug text-navy">{tagline}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- What's included ---------- */
function ServiceIncludes({ service }) {
  const { includes, title } = service
  return (
    <section className="section-pad bg-cloud">
      <div className="container-px">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">What’s Included</span>
          <h2 className="mt-3 text-balance text-[1.75rem] font-bold leading-[1.15] text-navy sm:text-3xl lg:text-[2.3rem]">
            Everything you get with {title}
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {includes.map(({ title: t, desc }, i) => (
            <motion.div
              key={t}
              variants={itemFade}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-md shadow-navy/5 transition-shadow duration-300 hover:shadow-premium"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange/10 text-orange transition-colors duration-300 group-hover:bg-orange-gradient group-hover:text-white">
                <Check className="h-6 w-6" strokeWidth={2.5} />
              </span>
              <span className="pointer-events-none absolute right-5 top-4 font-heading text-4xl font-extrabold text-navy/5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-base font-bold text-navy">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Process (vertical stepper — distinct from AboutApproach) ---------- */
function ServiceProcess({ service }) {
  const { process } = service
  return (
    <section className="section-pad bg-white">
      <div className="container-px">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How It Works</span>
          <h2 className="mt-3 text-balance text-[1.75rem] font-bold leading-[1.15] text-navy sm:text-3xl lg:text-[2.3rem]">
            A simple, guided process
          </h2>
        </motion.div>

        <div className="relative mx-auto mt-12 max-w-3xl">
          <span className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-0.5 rounded-full bg-navy/10" />
          <motion.span
            className="absolute left-[27px] top-2 w-0.5 rounded-full bg-orange-gradient"
            initial={{ height: 0 }}
            whileInView={{ height: 'calc(100% - 1rem)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, ease: easeOut }}
          />

          <div className="space-y-6">
            {process.map((step, i) => (
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
                <div className="flex-1 rounded-2xl border border-navy/10 bg-cloud p-5">
                  <h3 className="text-base font-bold text-navy">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/60">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- FAQ accordion ---------- */
function ServiceFaq({ service }) {
  const { faqs, title } = service
  const [open, setOpen] = useState(0)

  return (
    <section className="section-pad bg-cloud">
      <div className="container-px">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={viewportOnce} className="lg:col-span-5">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.15] text-navy sm:text-3xl lg:text-[2.3rem]">
              Questions about {title}
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
              {faqs.map((f, i) => {
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

/* ---------- Related services ---------- */
function ServiceRelated({ related }) {
  return (
    <section className="section-pad bg-white">
      <div className="container-px">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Explore More</span>
          <h2 className="mt-3 text-balance text-[1.75rem] font-bold leading-[1.15] text-navy sm:text-3xl">
            Related services
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map(({ icon: Icon, title, short, slug }, i) => (
            <motion.article
              key={slug}
              variants={itemFade}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-md shadow-navy/5 transition-shadow duration-300 hover:shadow-premium"
            >
              <span className="border-gradient pointer-events-none absolute inset-0 rounded-2xl" />
              <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${RELATED_COLORS[i % RELATED_COLORS.length]} text-white shadow-lg`}>
                <Icon className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{short}</p>
              <Link
                to={`/services/${slug}`}
                className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange transition-all group-hover:gap-2.5"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- CTA ---------- */
function ServiceCta() {
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
              Ready to take the next step?
            </motion.h2>
            <motion.p variants={itemFade} className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
              Book a free consultation and get a personalized plan from a certified Bridgewayz advisor.
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