import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronRight, Home, Lock, CreditCard, Loader2, CheckCircle2, XCircle, ShieldCheck,
} from 'lucide-react'
import { staggerContainer, itemFade } from '../lib/motion.jsx'

const API_BASE = import.meta.env.VITE_API_URL || ''
const QUICK_AMOUNTS = [50, 100, 250, 500]
const EMPTY = { amount: '', name: '', email: '', description: '' }

// Payment page: the visitor enters an amount, the server creates a Stripe
// Checkout Session (server.js → /api/payments/checkout) and we redirect to
// Stripe's hosted page. Stripe sends the visitor back here with ?status=.
export default function Payment() {
  const [params, setParams] = useSearchParams()
  const status = params.get('status') // success | cancelled | null
  const sessionId = params.get('session_id')

  const [config, setConfig] = useState({ enabled: true, currency: 'cad', min: 1, max: 50000 })
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [receipt, setReceipt] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/payments/config`)
      .then((r) => r.json())
      .then(setConfig)
      .catch(() => setConfig((c) => ({ ...c, enabled: ttrue })))
  }, [])

  useEffect(() => {
    if (status !== 'success' || !sessionId) return
    fetch(`${API_BASE}/api/payments/session/${encodeURIComponent(sessionId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setReceipt)
      .catch(() => {})
  }, [status, sessionId])

  const currency = config.currency.toUpperCase()
  const fmt = (n) =>
    new Intl.NumberFormat('en-CA', { style: 'currency', currency }).format(Number(n) || 0)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
    setServerError('')
  }

  const validate = () => {
    const e = {}
    const amt = Number(form.amount)
    if (!form.amount) e.amount = 'Enter an amount'
    else if (!Number.isFinite(amt) || amt < config.min) e.amount = `Minimum is ${fmt(config.min)}`
    else if (amt > config.max) e.amount = `Maximum is ${fmt(config.max)}`
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setServerError('')
    try {
      const res = await fetch(`${API_BASE}/api/payments/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.url) throw new Error(data.error || 'Could not start the payment.')
      window.location.href = data.url
    } catch (err) {
      setServerError(err.message)
      setLoading(false)
    }
  }

  const reset = () => {
    setParams({})
    setForm(EMPTY)
    setReceipt(null)
  }

  const fieldCls = (name) =>
    `w-full rounded-xl border bg-cloud px-4 py-3 text-sm text-ink outline-none transition-all focus:ring-2 focus:ring-orange/30 ${
      errors[name] ? 'border-red-400' : 'border-navy/12 focus:border-orange'
    }`

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-gradient pb-16 pt-32 md:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-worldmap opacity-40" />
          <div className="absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full bg-orange/12 blur-[120px]" />
        </div>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="container-px relative mx-auto max-w-3xl text-center"
        >
          <motion.nav
            variants={itemFade}
            aria-label="Breadcrumb"
            className="mb-6 flex items-center justify-center gap-1.5 text-xs font-medium text-white/55"
          >
            <Link to="/#home" className="inline-flex items-center gap-1 transition-colors hover:text-white">
              <Home className="h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <span className="text-white/85">Payment</span>
          </motion.nav>
          <motion.h1
            variants={itemFade}
            className="text-balance text-[2.2rem] font-extrabold leading-[1.08] text-white sm:text-5xl"
          >
            Make a <span className="gradient-text-orange">Payment</span>
          </motion.h1>
          <motion.p variants={itemFade} className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/70">
            Pay your Bridgeway service fees securely online. Enter the amount you were quoted and complete payment with Stripe.
          </motion.p>
        </motion.div>
      </section>

      {/* Card */}
      <section className="section-pad bg-white">
        <div className="container-px">
          <div className="mx-auto max-w-lg rounded-3xl border border-navy/10 bg-white p-6 shadow-premium sm:p-8">
            {status === 'success' ? (
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
                <h2 className="mt-4 text-2xl font-bold text-ink">Payment successful</h2>
                <p className="mt-2 text-sm text-ink/70">
                  {receipt?.paid
                    ? `We received ${new Intl.NumberFormat('en-CA', { style: 'currency', currency: receipt.currency.toUpperCase() }).format(receipt.amount)}. A receipt has been sent to ${receipt.email || 'your email'}.`
                    : 'Thank you! Your payment is being confirmed. A receipt will be emailed to you.'}
                </p>
                <button onClick={reset} className="btn-primary mt-6">Make another payment</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                {status === 'cancelled' && (
                  <div className="mb-5 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    <XCircle className="h-4 w-4 shrink-0" />
                    Payment was cancelled. You can try again below.
                  </div>
                )}
                {!config.enabled && (
                  <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    Online payments are temporarily unavailable. Please contact us at info@bridgewayz.ca.
                  </div>
                )}

                <label className="mb-1.5 block text-sm font-semibold text-ink" htmlFor="amount">
                  Amount ({currency})
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-ink/50">$</span>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    inputMode="decimal"
                    min={config.min}
                    max={config.max}
                    step="0.01"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={onChange}
                    className={`${fieldCls('amount')} pl-9 text-lg font-semibold`}
                  />
                </div>
                {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}

                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => onChange({ target: { name: 'amount', value: String(a) } })}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                        Number(form.amount) === a
                          ? 'border-orange bg-orange/10 text-orange-600'
                          : 'border-navy/12 text-ink/70 hover:border-orange/50'
                      }`}
                    >
                      ${a}
                    </button>
                  ))}
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink" htmlFor="name">Full name</label>
                    <input id="name" name="name" value={form.name} onChange={onChange} className={fieldCls('name')} />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink" htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={onChange} className={fieldCls('email')} />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1.5 block text-sm font-semibold text-ink" htmlFor="description">
                    Payment for <span className="font-normal text-ink/50">(optional)</span>
                  </label>
                  <input
                    id="description"
                    name="description"
                    placeholder="e.g. Consultation fee, Invoice #1234"
                    value={form.description}
                    onChange={onChange}
                    className={fieldCls('description')}
                  />
                </div>

                {serverError && (
                  <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || !config.enabled}
                  className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                  {loading ? 'Redirecting to Stripe…' : `Pay ${form.amount ? fmt(form.amount) : ''}`}
                </button>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink/50">
                  <Lock className="h-3.5 w-3.5" />
                  Secured by Stripe — we never see your card details
                  <ShieldCheck className="h-3.5 w-3.5" />
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
