import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle2,
  Facebook, Instagram, MessageSquare,
} from 'lucide-react'
import { fadeLeft, fadeRight, staggerContainer, itemFade, viewportOnce } from '../../lib/motion.jsx'
import { submitWithFallback, HoneyPotField } from '../../lib/forms.jsx'

const DETAILS = [
  { icon: Mail, title: 'Email Us', lines: ['info@bridgewayz.ca', 'We reply within 24 hours'], href: 'mailto:info@bridgewayz.ca' },
  { icon: Phone, title: 'Call Us', lines: ['+1 (437) 449-5504', 'Mon–Fri, 9am–6pm ET'], href: 'tel:+14374495504' },
  { icon: MapPin, title: 'Visit Us', lines: ['214-2 Automatic Road', 'Brampton ON L6S 6K8'] },
  { icon: Clock, title: 'Office Hours', lines: ['Mon–Fri: 9:00–18:00', 'Sat: 10:00–14:00'] },
]

const SOCIAL = [
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/1KhZ9sAsew/?mibextid=wwXIfr' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/bridgewayz.canada' },
]

const INTERESTS = [
  'College Admissions', 'Program Selection', 'Career Guidance',
  'Application Assistance', 'Visa Support', 'Scholarship Guidance', 'General Enquiry',
]

const EMPTY = { name: '', email: '', phone: '', interest: INTERESTS[0], message: '' }

export default function ContactMain() {
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
    if (!form.message.trim()) e.message = 'Tell us a little about your goals'
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
      formKey: 'contact',
      data: form,
      subject: `Website enquiry — ${form.name}`,
      intro: 'A new message was submitted via the contact form:',
      fields: [
        ['Full name', form.name],
        ['Email', form.email],
        ['Phone', form.phone],
        ['Interested in', form.interest],
        ['Message', form.message],
      ],
    })
    setStatus('success')
  }

  const fieldCls = (name) =>
    `w-full rounded-xl border bg-cloud px-4 py-3 text-sm text-ink outline-none transition-all focus:ring-2 focus:ring-orange/30 ${
      errors[name] ? 'border-red-400' : 'border-navy/12 focus:border-orange'
    }`

  return (
    <section id="contact-form" className="section-pad bg-white">
      <div className="container-px">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ---- Left — details (4 cols) ---- */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-5"
          >
            <motion.span variants={itemFade} className="eyebrow">Contact Details</motion.span>
            <motion.h2 variants={itemFade} className="mt-4 text-balance text-[1.6rem] font-bold leading-[1.15] text-navy sm:text-3xl">
              Let's Talk About Your Education Journey
            </motion.h2>
            <motion.p variants={itemFade} className="mt-3 text-[15px] leading-relaxed text-ink/60">
              Reach us through any channel below — or send a message and we'll match you with the right advisor.
            </motion.p>

            <motion.div variants={itemFade} className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {DETAILS.map(({ icon: Icon, title, lines, href }) => {
                const Card = (
                  <div className="group flex h-full items-start gap-3.5 rounded-2xl border border-navy/10 bg-white p-4 shadow-md shadow-navy/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy/8 text-navy transition-colors duration-300 group-hover:bg-orange-gradient group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-navy">{title}</p>
                      {lines.map((l) => (
                        <p key={l} className="text-xs leading-relaxed text-ink/55">{l}</p>
                      ))}
                    </div>
                  </div>
                )
                return href ? (
                  <a key={title} href={href} className="block">{Card}</a>
                ) : (
                  <div key={title}>{Card}</div>
                )
              })}
            </motion.div>

            {/* Social */}
            <motion.div variants={itemFade} className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">Follow Bridgewayz</p>
              <div className="mt-3 flex gap-3">
                {SOCIAL.map(({ Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3 }}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-navy/10 bg-white text-navy transition-colors hover:bg-orange-gradient hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ---- Right — form (7 cols, offset) ---- */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative rounded-[2rem] border border-navy/8 bg-white p-6 shadow-premium md:p-8 lg:col-span-7"
          >
            <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent" />

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                  className="grid h-16 w-16 place-items-center rounded-full bg-orange/10"
                >
                  <CheckCircle2 className="h-9 w-9 text-orange" />
                </motion.div>
                <h3 className="mt-4 text-xl font-bold text-navy">Message Sent!</h3>
                <p className="mt-2 max-w-sm text-sm text-ink/60">
                  Thanks, {form.name.split(' ')[0] || 'there'}. We've received your message and an advisor will reach out within 24 hours.
                </p>
                <button
                  onClick={() => { setForm(EMPTY); setStatus('idle') }}
                  className="btn-outline mt-6"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <HoneyPotField />
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-gradient text-white shadow-lg">
                    <MessageSquare className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy">Send Us a Message</h3>
                    <p className="text-xs text-ink/55">Fill in the form and we'll be in touch.</p>
                  </div>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="mb-1.5 block text-xs font-semibold text-ink/70">Full Name *</label>
                    <input id="c-name" name="name" value={form.name} onChange={onChange} className={fieldCls('name')} placeholder="Your full name" />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-email" className="mb-1.5 block text-xs font-semibold text-ink/70">Email *</label>
                    <input id="c-email" name="email" type="email" value={form.email} onChange={onChange} className={fieldCls('email')} placeholder="you@email.com" />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-phone" className="mb-1.5 block text-xs font-semibold text-ink/70">Phone <span className="text-ink/40">(optional)</span></label>
                    <input id="c-phone" name="phone" type="tel" value={form.phone} onChange={onChange} className={fieldCls('phone')} placeholder="+1 (000) 000-0000" />
                  </div>
                  <div>
                    <label htmlFor="c-interest" className="mb-1.5 block text-xs font-semibold text-ink/70">I'm Interested In</label>
                    <select id="c-interest" name="interest" value={form.interest} onChange={onChange} className={fieldCls('interest')}>
                      {INTERESTS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-3.5">
                  <label htmlFor="c-message" className="mb-1.5 block text-xs font-semibold text-ink/70">Message *</label>
                  <textarea
                    id="c-message" name="message" rows={5} value={form.message} onChange={onChange}
                    className={`${fieldCls('message')} resize-none`}
                    placeholder="Tell us about your goals, preferred programs, or any questions you have..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                <button type="submit" disabled={status === 'loading'} className="btn-primary mt-5 w-full disabled:opacity-80">
                  {status === 'loading' ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <>Send Message <Send className="h-4 w-4" /></>
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