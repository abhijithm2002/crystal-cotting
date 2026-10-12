import { Card } from '@heroui/react'
import { motion } from 'framer-motion'
import { useSiteContent } from '../../hooks/useSiteContent'
import { resolveIcon } from '../../utils/iconMap'
import { fadeUp, scaleIn, staggerContainer, viewport } from '../../utils/motion'
import { SectionHeading } from '../common/SectionHeading'

export function WhyChooseSection() {
  const { homepage } = useSiteContent()
  const intro = homepage?.whyChooseIntro || {}
  const whyChoose = homepage?.whyChoose || []
  const premiumPromise = homepage?.premiumPromise || {}

  return (
    <section className="section-pad bg-gradient-to-b from-white to-cloud">
      <div className="container-premium">
        <SectionHeading
          align="center"
          eyebrow={intro.eyebrow || 'Why Choose Us'}
          title={intro.title || 'A company designed around trust'}
          text={intro.text}
        />

        <motion.div
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
        >
          {whyChoose.map(({ title, text, icon }) => {
            const Icon = resolveIcon(icon)
            return (
              <motion.div key={title} variants={scaleIn}>
                <Card className="group h-full rounded-xl border border-white/80 bg-white/76 p-6 shadow-card backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:shadow-premium">
                  <Card.Content className="p-0">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-royal-100 text-royal transition group-hover:bg-royal group-hover:text-white">
                      <Icon size={26} />
                    </span>
                    <h3 className="mt-5 text-xl font-black text-charcoal">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                  </Card.Content>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {premiumPromise.title ? (
          <motion.div
            className="mt-8 rounded-2xl bg-charcoal p-7 text-white shadow-premium lg:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <span className="text-sm font-black uppercase tracking-[0.18em] text-amber-cta">
                  {premiumPromise.eyebrow}
                </span>
                <h3 className="mt-3 text-3xl font-black leading-tight">{premiumPromise.title}</h3>
              </div>
              <p className="text-base leading-8 text-white/72">{premiumPromise.text}</p>
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
