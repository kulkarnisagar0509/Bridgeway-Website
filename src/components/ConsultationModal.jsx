import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, CheckCircle2, Send, CalendarHeart } from 'lucide-react'
import { useModal } from '../context/ModalContext.jsx'
import { submitWithFallback, HoneyPotField } from '../lib/forms.jsx'

const PROGRAMS = [
  'Healthcare', 'Business', 'Information Technology', 'Cyber Security',
  'Engineering', 'Artificial Intelligence', 'Hospitality', 'Marketing',
  'Accounting', 'Education', 'Construction', 'Nursing', 'Not sure yet',
]
const INTAKES = ['Spring 2026', 'Summer 2026', 'Fall 2026', 'Winter 2027', 'Flexible']

const EMPTY = {
  name: '', email: '', phone: '', location: '', program: '', intake: '', message: '',
}

export default function ConsultationModal() {
  const { isOpen, closeModal } = useModal()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success
  const firstFieldRef = useRef(null)

  // Lock scroll + escape to close + focus trap start
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstFieldRef.current?.focus(), 200)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleClose = () => {
    if (status === 'loading') return
    closeModal()
    // Reset shortly after close animation
    setTimeout(() => { setStatus('idle'); setForm(EMPTY); setErrors({}) }, 250)
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your full name'
    if (!form.email.trim()) e.email = 'Please enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Please enter your phone number'
    if (!form.location.trim()) e.location = 'Please enter your current location'
    if (!form.program) e.program = 'Select a program of interest'
    if (!form.intake) e.intake = 'Select a preferred intake'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    // Send via the backend (SMTP); if the backend can't send, fall back to
    // opening the visitor's email client pre-filled to info@bridgewayz.ca.
    await submitWithFallback({
      formKey: 'consultation',
      data: { ...form, source: 'modal' },
      subject: `Consultation request — ${form.name}`,
      intro: 'A new consultation request was submitted via the website:',
      fields: [
        ['Full name', form.name],
        ['Email', form.email],
        ['Phone', form.phone],
        ['Current location', form.location],
        ['Interested program', form.program],
        ['Preferred intake', form.intake],
        ['Message', form.message],
      ],
    })
    setStatus('success')
  }

  const fieldCls = (name) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-all focus:ring-2 focus:ring-orange/30 ${
      errors[name] ? 'border-red-400 focus:border-red-400' : 'border-navy/12 focus:border-orange'
    }`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="consult-title"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="relative overflow-hidden bg-navy-gradient px-6 py-8 md:px-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange/20 blur-2xl" />
              </div>
              <button
                onClick={handleClose}
                aria-label="Close dialog"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  <CalendarHeart className="h-3.5 w-3.5 text-orange" />
                  Free Consultation
                </span>
                <h2 id="consult-title" className="mt-3 text-2xl font-extrabold text-white md:text-3xl">
                  Book Your Free Consultation
                </h2>
                <p className="mt-1.5 text-sm text-white/70">
                  Tell us about your goals — we'll build your personalized study-in-Canada roadmap.
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-10">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-orange/10"
                  >
                    <CheckCircle2 className="h-11 w-11 text-orange" />
                  </motion.div>
                  <h3 className="mt-5 text-xl font-bold text-navy">Request Received!</h3>
                  <p className="mt-2 max-w-sm text-sm text-ink/60">
                    Thank you, {form.name.split(' ')[0] || 'there'}. One of our advisors will reach out within 24 hours.
                  </p>
                  <button onClick={handleClose} className="btn-primary mt-7">Done</button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
                  <HoneyPotField />
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-ink/70">Full Name *</label>
                    <input ref={firstFieldRef} id="name" name="name" value={form.name} onChange={onChange} className={fieldCls('name')} placeholder="Your full name" />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-ink/70">Email *</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={onChange} className={fieldCls('email')} placeholder="you@email.com" />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-ink/70">Phone *</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} className={fieldCls('phone')} placeholder="+1 (000) 000-0000" />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="location" className="mb-1.5 block text-xs font-semibold text-ink/70">Current Location *</label>
                    <input id="location" name="location" value={form.location} onChange={onChange} className={fieldCls('location')} placeholder="City, Country" />
                    {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
                  </div>
                  <div>
                    <label htmlFor="program" className="mb-1.5 block text-xs font-semibold text-ink/70">Interested Program *</label>
                    <select id="program" name="program" value={form.program} onChange={onChange} className={fieldCls('program')}>
                      <option value="">Select a program</option>
                      {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.program && <p className="mt-1 text-xs text-red-500">{errors.program}</p>}
                  </div>
                  <div>
                    <label htmlFor="intake" className="mb-1.5 block text-xs font-semibold text-ink/70">Preferred Intake *</label>
                    <select id="intake" name="intake" value={form.intake} onChange={onChange} className={fieldCls('intake')}>
                      <option value="">Select an intake</option>
                      {INTAKES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.intake && <p className="mt-1 text-xs text-red-500">{errors.intake}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-ink/70">Message</label>
                    <textarea id="message" name="message" value={form.message} onChange={onChange} rows={3} className={fieldCls('message')} placeholder="Tell us about your goals, questions, or anything we should know." />
                  </div>

                  <div className="sm:col-span-2 mt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      {status === 'loading' ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                      ) : (
                        <>Submit Request <Send className="h-4 w-4" /></>
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs text-ink/45">
                      By submitting, you agree to be contacted about your enquiry. We respect your privacy.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}