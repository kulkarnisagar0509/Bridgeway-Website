import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Lock, ArrowRight } from 'lucide-react'
import { fadeUp, viewportOnce } from '../lib/motion.jsx'

// Banner linking to the /payment page. Shown on Home and Contact.
export default function PaymentCTA() {
  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="container-px">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[1.75rem] bg-navy-gradient px-6 py-8 shadow-glow-navy sm:px-10 md:py-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-orange/20 blur-[90px]" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-orange-gradient text-white shadow-lg">
                <CreditCard className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">Make a Payment Online</h2>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/70">
                  Already working with us? Pay your service fees or invoice securely in a few clicks.
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/50">
                  <Lock className="h-3.5 w-3.5" />
                  Secure card payments powered by Stripe
                </p>
              </div>
            </div>
            <Link to="/payment" className="btn-primary w-full shrink-0 md:w-auto">
              Make a Payment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
