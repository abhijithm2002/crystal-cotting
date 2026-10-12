import { Accordion, Card, Chip } from '@heroui/react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useSiteContent } from '../../hooks/useSiteContent'
import { resolveMediaUrl } from '../../services/api'
import { resolveIcon } from '../../utils/iconMap'
import { fadeUp, scaleIn, staggerContainer, viewport } from '../../utils/motion'
import { SectionHeading } from '../common/SectionHeading'

export function AboutSection() {
  const { about, faq } = useSiteContent()
  const blocks = about?.blocks || []
  const qualityChips = about?.qualityChips || []
  const faqItems = faq || []

  return (
    <section id="about" className="section-pad bg-white">
      {about?.banner ? <img src={resolveMediaUrl(about.banner)} alt="About our company" className="container-premium mb-10 max-h-80 rounded-3xl object-cover" /> : null}
      <div className="container-premium grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          {about?.companyImage ? (
            <div className="image-shine relative overflow-hidden rounded-2xl shadow-premium">
              <img
                className="h-[480px] w-full object-cover"
                src={resolveMediaUrl(about.companyImage)}
                alt="Company at work"
                loading="lazy"
              />
            </div>
          ) : null}
          {about?.experienceCaption?.label ? (
            <div className="glass-panel absolute -bottom-7 left-5 right-5 rounded-[1.5rem] p-5 sm:left-auto sm:right-5 lg:right-[-2rem] sm:w-72">
              <span className="text-sm font-black uppercase tracking-[0.16em] text-royal">
                {about.experienceCaption.label}
              </span>
              <p className="mt-2 text-2xl font-black leading-tight text-charcoal">
                {about.experienceCaption.text}
              </p>
            </div>
          ) : null}
        </motion.div>

        <div>
          <SectionHeading
            eyebrow={about?.intro?.eyebrow || 'About Us'}
            title={about?.intro?.title || 'Who we are'}
            text={about?.intro?.description}
          />

          <motion.div
            className="mt-8 grid gap-4 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {blocks.map(({ title, text, icon }) => {
              const Icon = resolveIcon(icon)
              return (
                <motion.div key={title} variants={scaleIn}>
                  <Card className="h-full rounded-[1.35rem] border border-mist bg-cloud/70 p-5">
                    <Card.Content className="p-0">
                      <Icon className="text-royal" size={25} />
                      <h3 className="mt-4 text-lg font-black text-charcoal">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
                    </Card.Content>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {qualityChips.length ? (
            <div className="mt-7 flex flex-wrap gap-2">
              {qualityChips.map((item) => (
                <Chip key={item} className="border border-royal/10 bg-royal-100 px-3 py-1 text-sm font-bold text-charcoal">
                  {item}
                </Chip>
              ))}
            </div>
          ) : null}

          {faqItems.length ? (
            <Accordion className="mt-8 rounded-[1.5rem] border border-mist bg-white p-2 shadow-card">
              {faqItems.map((item) => (
                <Accordion.Item key={item._id || item.question} id={item._id || item.question} className="rounded-[1.15rem]">
                  <Accordion.Heading>
                    <Accordion.Trigger className="flex w-full items-center justify-between rounded-[1.15rem] px-4 py-4 text-left text-sm font-black text-charcoal hover:bg-royal-100">
                      {item.question}
                      <Accordion.Indicator>
                        <ChevronDown size={18} />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body className="px-4 pb-4 text-sm leading-7 text-slate-600">
                      {item.answer}
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : null}
        </div>
      </div>
      <div className="container-premium mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(about?.teamImages || []).map((member, index) => (
          <figure key={`team-${index}`}>
            {member.image ? <img src={resolveMediaUrl(member.image)} alt={member.name || 'Team member'} className="h-64 w-full rounded-2xl object-cover" loading="lazy" /> : null}
            <figcaption className="mt-3"><strong>{member.name}</strong><p>{member.role}</p></figcaption>
          </figure>
        ))}
        {(about?.certificates || []).map((certificate, index) => (
          <figure key={`certificate-${index}`}>
            {certificate.image ? <img src={resolveMediaUrl(certificate.image)} alt={certificate.title || 'Certificate'} className="h-64 w-full rounded-2xl object-contain" loading="lazy" /> : null}
            <figcaption className="mt-3 font-bold">{certificate.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
