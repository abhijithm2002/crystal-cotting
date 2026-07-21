import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { resolveMediaUrl } from '../../services/api'
import { fadeUp, viewport } from '../../utils/motion'

export function BeforeAfterSlider({ item }) {
  const [position, setPosition] = useState(52)

  return (
    <motion.article
      className="overflow-hidden rounded-[1.6rem] border border-white/75 bg-white shadow-card"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal sm:aspect-[16/10]">
        <img
          className="h-full w-full object-cover"
          src={resolveMediaUrl(item.before)}
          alt={`${item.title} before`}
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          aria-hidden="true"
        >
          <img className="h-full w-full object-cover" src={resolveMediaUrl(item.after)} alt="" />
        </div>
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(9,21,37,0.18)]"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amber-cta text-charcoal shadow-premium">
            <ArrowLeftRight size={20} />
          </span>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-charcoal/78 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white backdrop-blur">
          {item.beforeLabel}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-amber-cta px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-charcoal">
          {item.afterLabel}
        </span>
        <input
          className="before-after-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          type="range"
          min="8"
          max="92"
          value={position}
          aria-label={`Compare ${item.title}`}
          onChange={(event) => setPosition(Number(event.target.value))}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-black text-charcoal">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Drag the slider to compare surface work, color impact, and finishing quality.
        </p>
      </div>
    </motion.article>
  )
}
