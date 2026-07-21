import { Card, Chip, Tabs } from '@heroui/react'
import { motion } from 'framer-motion'
import { useSiteContent } from '../../hooks/useSiteContent'
import { resolveMediaUrl } from '../../services/api'
import { resolveIcon } from '../../utils/iconMap'
import { fadeUp, scaleIn, staggerContainer, viewport } from '../../utils/motion'
import { SectionHeading } from '../common/SectionHeading'

export function ServicesSection() {
  const { homepage, services } = useSiteContent()
  const intro = homepage?.servicesIntro || {}
  const mainServices = services?.main || []
  const secondaryServices = services?.secondary || []

  return (
    <section id="services" className="section-pad bg-white">
      <div className="container-premium">
        <SectionHeading
          eyebrow={intro.eyebrow || 'Services'}
          title={intro.title || 'Our services'}
          text={intro.text}
        />

        <Tabs
          className="mt-10"
          defaultSelectedKey="painting"
          variant="solid"
          aria-label="Service categories"
        >
          <Tabs.ListContainer className="mb-8 overflow-x-auto">
            <Tabs.List className="inline-flex rounded-full border border-mist bg-cloud p-1">
              <Tabs.Tab
                id="painting"
                className="rounded-full px-5 py-3 text-sm font-black text-charcoal data-[selected]:bg-royal data-[selected]:text-white"
              >
                Professional Painting
              </Tabs.Tab>
              <Tabs.Tab
                id="renovation"
                className="rounded-full px-5 py-3 text-sm font-black text-charcoal data-[selected]:bg-royal data-[selected]:text-white"
              >
                Renovation Support
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          <Tabs.Panel id="painting">
            <motion.div
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={staggerContainer}
            >
              {mainServices.map((service) => {
                const Icon = resolveIcon(service.icon)
                return (
                  <motion.div key={service._id || service.title} variants={scaleIn}>
                    <Card className="group h-full overflow-hidden rounded-[1.55rem] border border-mist bg-white shadow-card transition duration-500 hover:-translate-y-2 hover:shadow-premium">
                      <div className="image-shine relative aspect-[4/3] overflow-hidden">
                        <img
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          src={resolveMediaUrl(service.image)}
                          alt={service.title}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/72 to-transparent" />
                        <span
                          className={`absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${service.accent || 'from-royal to-royal-600'} text-white shadow-card`}
                        >
                          <Icon size={24} />
                        </span>
                      </div>
                      <Card.Content className="p-6">
                        <Card.Title className="text-xl font-black text-charcoal">
                          {service.title}
                        </Card.Title>
                        <Card.Description className="mt-3 text-sm leading-7 text-slate-600">
                          {service.description}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </Tabs.Panel>

          <Tabs.Panel id="renovation">
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={staggerContainer}
            >
              {secondaryServices.map((service) => {
                const Icon = resolveIcon(service.icon)
                return (
                  <motion.div key={service._id || service.title} variants={fadeUp}>
                    <Card className="h-full rounded-[1.35rem] border border-royal/10 bg-gradient-to-br from-royal-100 to-white p-5 shadow-card transition hover:-translate-y-1">
                      <Card.Content className="p-0">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-royal shadow-sm">
                          <Icon size={23} />
                        </span>
                        <h3 className="mt-4 text-lg font-black text-charcoal">{service.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {service.description || 'Available as part of complete home improvement and renovation work.'}
                        </p>
                      </Card.Content>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
            {intro.note ? (
              <Chip className="mt-8 border border-amber-cta/25 bg-amber-cta/10 px-4 py-2 text-sm font-black text-charcoal">
                {intro.note}
              </Chip>
            ) : null}
          </Tabs.Panel>
        </Tabs>
      </div>
    </section>
  )
}
