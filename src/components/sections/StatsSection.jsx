import { useSiteContent } from '../../hooks/useSiteContent'
import { CounterStat } from '../common/CounterStat'

export function StatsSection() {
  const { homepage } = useSiteContent()
  const stats = homepage?.stats || []

  if (!stats.length) return null

  return (
    <section className="relative -mt-8 z-10">
      <div className="container-premium grid gap-4 rounded-[2rem] border border-white/75 bg-white/80 p-4 shadow-premium backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <CounterStat key={stat.label} {...stat} value={Number(stat.value) || 0} />
        ))}
      </div>
    </section>
  )
}
