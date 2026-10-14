import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Bridgewayz horizontal logo. The PNG (in /public) includes the wordmark, so
// we render the image alone and adapt to light/dark backgrounds via `light`.
export default function Logo({ className = '', showText = true, light = false }) {
  return (
    <Link to="/" className={`group inline-flex items-center ${className}`} aria-label="Bridgewayz home">
      <motion.img
        src="/logo.png"
        alt="Bridgewayz"
        className={`h-20 w-auto select-none ${light ? 'brightness-0 invert' : ''}`}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}