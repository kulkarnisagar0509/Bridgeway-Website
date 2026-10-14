import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion.jsx'

// Reusable premium section heading: eyebrow + headline + optional subheadline.
export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false, className = '' }) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : 'text-left'
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`max-w-3xl ${alignCls} ${className}`}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className={`eyebrow ${light ? 'border border-white/15 bg-white/10 text-white' : ''}`}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className={`mt-3 text-balance text-[1.75rem] font-bold leading-[1.15] sm:text-3xl lg:text-[2.4rem] ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`mt-3 max-w-2xl text-[15px] leading-relaxed md:text-base ${light ? 'text-white/70' : 'text-ink/55'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}