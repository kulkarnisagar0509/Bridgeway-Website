import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Same number shown on the contact page: +1 (437) 449-5504
const PHONE = '14374495504'
const MESSAGE = "Hi Bridgewayz, I'd like to know more about your services."
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`

const WhatsAppIcon = ({ className = 'h-7 w-7' }) => (
  <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M16.04 4C9.93 4 4.98 8.95 4.98 15.06c0 2.05.6 3.96 1.63 5.56L4.5 27.5l7.05-2.07a11.04 11.04 0 0 0 4.49.95h.01c6.11 0 11.06-4.95 11.06-11.06C27.11 8.95 22.15 4 16.04 4zm0 20.27h-.01c-1.4 0-2.78-.38-3.97-1.09l-.28-.17-4.18 1.23 1.12-4.08-.18-.31a9.18 9.18 0 0 1-1.41-4.9c0-5.08 4.13-9.21 9.22-9.21 2.46 0 4.78.96 6.52 2.71a9.16 9.16 0 0 1 2.7 6.52c0 5.08-4.13 9.21-9.22 9.21zm5.05-6.9c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.38-.82-.74-1.38-1.65-1.54-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.41-.49.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.48-.16-.01-.35-.01-.53-.01-.18 0-.49.07-.74.35-.25.28-.97.95-.97 2.31 0 1.36.99 2.68 1.13 2.86.14.18 1.95 2.98 4.73 4.18.66.29 1.18.46 1.58.59.66.21 1.27.18 1.74.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" />
  </svg>
)

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false)
  const [hint, setHint] = useState(false)

  // Show on load (after a short delay so it doesn't fight the hero entrance).
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 800)
    return () => clearTimeout(t)
  }, [])

  // Auto flash the label once shortly after the button appears.
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => setHint(true), 1400)
    const t2 = setTimeout(() => setHint(false), 5400)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: -40 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0],
            rotate: [0, -3, 3, 0],
          }}
          exit={{ opacity: 0, scale: 0, y: -40 }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { type: 'spring', stiffness: 320, damping: 14, delay: 0.1 },
            y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="fixed bottom-5 right-5 z-[70] sm:bottom-6 sm:right-6"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            onMouseEnter={() => setHint(true)}
            onMouseLeave={() => setHint(false)}
            className="group relative flex items-center"
          >
            {/* Pulsing ring */}
            <span className="absolute right-0 top-0 h-14 w-14 rounded-full bg-[#25D366] animate-wa-pulse sm:h-[60px] sm:w-[60px]" />

            {/* Label */}
            <AnimatePresence>
              {hint && (
                <motion.span
                  initial={{ opacity: 0, x: 8, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: 8, width: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mr-3 hidden whitespace-nowrap rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-navy/30 md:inline-block"
                >
                  Chat with us on WhatsApp
                </motion.span>
              )}
            </AnimatePresence>

            {/* Button */}
            <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 sm:h-[60px] sm:w-[60px]">
              <span className="absolute inset-0 rounded-full ring-1 ring-white/30" />
              <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}