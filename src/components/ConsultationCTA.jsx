import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2, CheckCircle2, Send, CalendarHeart, Sparkles, ShieldCheck, Clock, BadgePercent } from 'lucide-react'
import { fadeRight, staggerContainer, itemFade, viewportOnce } from '../lib/motion.jsx'
import { submitWithFallback, HoneyPotField } from '../lib/forms.jsx'

const BENEFITS = [
  'Free 1-on-1 personalized consultation',
  'A clear roadmap to study in Canada',
  'Expert advice on programs, visas & scholarships',
  'No pressure — just clarity and next steps',
]

const TRUST = [
  { icon: BadgePercent, label: '100% Free' },
  { icon: Clock, label: '24-hour reply' },
  { icon: ShieldCheck, label: 'Confidential' },
]

const EMPTY = { name: '', email: '', phone: '' }

export default function ConsultationCTA() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.phone.trim()) e.phone = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    // Send via the backend (SMTP); if the backend can't send, fall back to
    // opening the visitor's email client pre-filled to info@bridgewayz.ca.
    await submitWithFallback({
      formKey: 'consultation',
      data: { ...form, source: 'home-cta' },
      subject: `Consultation request — ${form.name}`,
      intro: 'A new consultation request was submitted via the website:',
      fields: [
        ['Full name', form.name],
        ['Email', form.email],
        ['Phone', form.phone],
      ],
    })
    setStatus('success')
  }

  const fieldCls = (name) =>
    `w-full rounded-xl border bg-cloud px-4 py-3 text-sm text-ink outline-none transition-all focus:ring-2 focus:ring-orange/30 ${
      errors[name] ? 'border-red-400' : 'border-navy/12 focus:border-orange'
    }`

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="container-px">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left — value proposition + trust indicators */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col justify-center"
          >
            <motion.span variants={itemFade} className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-orange" />
              Get Started Today
            </motion.span>
            <motion.h2
              variants={itemFade}
              className="mt-4 text-balance text-[1.75rem] font-bold leading-[1.15] text-navy sm:text-3xl lg:text-[2.4rem]"
            >
              Book Your Free Consultation
            </motion.h2>
            <motion.p variants={itemFade} className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/60 md:text-base">
              Get a personalized roadmap to study in Canada from a certified advisor — no pressure, just clarity and clear next steps.
            </motion.p>

            {/* Benefits */}
            <motion.ul variants={itemFade} className="mt-6 space-y-2.5">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-ink/80">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-gradient text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </motion.ul>

            {/* Trust indicators */}
            <motion.div variants={itemFade} className="mt-7 flex flex-wrap gap-3">
              {TRUST.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3.5 py-2 text-xs font-semibold text-navy"
                >
                  <Icon className="h-4 w-4 text-orange" />
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — consultation card */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative rounded-[1.75rem] border border-navy/8 bg-white p-6 shadow-premium md:p-7"
          >
            {/* Top accent line */}
            <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent" />

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                  className="grid h-16 w-16 place-items-center rounded-full bg-orange/10"
                >
                  <CheckCircle2 className="h-9 w-9 text-orange" />
                </motion.div>
                <h3 className="mt-4 text-xl font-bold text-navy">Request Received!</h3>
                <p className="mt-2 max-w-xs text-sm text-ink/60">
                  Thank you, {form.name.split(' ')[0] || 'there'}. An advisor will reach out within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <HoneyPotField />
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-gradient text-white shadow-lg">
                    <CalendarHeart className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy">Book Free Consultation</h3>
                    <p className="text-xs text-ink/55">We'll reply within 24 hours.</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label htmlFor="cta-name" className="mb-1.5 block text-xs font-semibold text-ink/70">Full Name</label>
                    <input id="cta-name" name="name" value={form.name} onChange={onChange} className={fieldCls('name')} placeholder="Your full name" />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="cta-email" className="mb-1.5 block text-xs font-semibold text-ink/70">Email</label>
                    <input id="cta-email" name="email" type="email" value={form.email} onChange={onChange} className={fieldCls('email')} placeholder="you@email.com" />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="cta-phone" className="mb-1.5 block text-xs font-semibold text-ink/70">Phone</label>
                    <input id="cta-phone" name="phone" type="tel" value={form.phone} onChange={onChange} className={fieldCls('phone')} placeholder="+1 (000) 000-0000" />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <button type="submit" disabled={status === 'loading'} className="btn-primary mt-5 w-full disabled:opacity-80">
                  {status === 'loading' ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Booking...</>
                  ) : (
                    <>Book Free Consultation <Send className="h-4 w-4" /></>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-ink/45">
                  By submitting, you agree to be contacted about your enquiry.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}