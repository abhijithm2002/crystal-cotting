import { motion } from 'framer-motion'
import { Chip } from '@heroui/react'
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
      <Chip className="mb-4 border border-royal/15 bg-royal-100 px-3 py-1 text-[0.72rem] font-black uppercase tracking-[0.16em] text-royal">
        {eyebrow}
      </Chip>
      <h2 className="text-3xl font-black leading-tight text-charcoal sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{text}</p> : null}
    </motion.div>
  )
}
