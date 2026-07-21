import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '../../hooks/useCountUp'
import { scaleIn, viewport } from '../../utils/motion'

export function CounterStat({ value, suffix, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const count = useCountUp(value, 1500, inView)

  return (
    <motion.div
      ref={ref}
      className="rounded-[1.35rem] border border-white/70 bg-white/75 p-6 text-center shadow-card backdrop-blur-xl"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={scaleIn}
    >
      <strong className="block text-4xl font-black text-charcoal sm:text-5xl">
        {count}
        {suffix}
      </strong>
      <span className="mt-3 block text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>
    </motion.div>
  )
}
