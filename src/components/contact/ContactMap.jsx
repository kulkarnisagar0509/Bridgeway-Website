import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'
import { fadeUp, viewportOnce } from '../../lib/motion.jsx'

export default function ContactMap() {
  return (
    <section className="relative overflow-hidden bg-cloud pb-16 md:pb-20 lg:pb-24">
      <div className="container-px">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[2rem] border border-navy/8 shadow-premium"
        >
          {/* Embedded map — 214-2 Automatic Road, Brampton, ON */}
          <div className="relative h-[360px] w-full md:h-[440px]">
            <iframe
              title="Bridgewayz office location — 214-2 Automatic Road, Brampton, ON L6S 6K8"
              src="https://www.google.com/maps?q=214-2+Automatic+Road,+Brampton,+ON+L6S+6K8&z=15&output=embed"
              className="absolute inset-0 h-full w-full grayscale-[0.2] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Top gradient for legibility */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cloud/80 to-transparent" />

            {/* Floating info card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80"
            >
              <div className="rounded-2xl border border-navy/10 bg-white/95 p-5 shadow-premium backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-orange-gradient text-white shadow-lg">
                    <MapPin className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">Bridgewayz Head Office</p>
                    <p className="text-xs text-ink/55">214-2 Automatic Road, Brampton ON L6S 6K8</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=214-2+Automatic+Road,+Brampton,+ON+L6S+6K8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-navy/12 bg-white px-4 py-2.5 text-sm font-semibold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:text-white"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}