import { motion } from 'framer-motion'
import { fadeUp, viewport } from '../../utils/motion'

export function SectionHeading({ eyebrow, title, text, align = 'left', className = '' }) {
  const centered = align === 'center'

  return (
    <motion.div
      className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
    >
      <span className="section-kicker">
        {eyebrow}
      </span>
      <h2 className="section-title text-charcoal">
        {title}
      </h2>
      {text ? <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{text}</p> : null}
    </motion.div>
  )
}
