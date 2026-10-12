import { Card, Separator } from '@heroui/react'
import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { resolveMediaUrl } from '../../services/api'
import { useSiteContent } from '../../hooks/useSiteContent'
import { buildPhoneLink, buildWhatsAppLink, googleMapSearch } from '../../utils/contactLinks'
import { LeadForm } from '../forms/LeadForm'
import { SectionHeading } from '../common/SectionHeading'

export function ContactSection() {
  const { contact } = useSiteContent()
  const data = contact || {}

  return (
    <section id="contact" className="section-pad bg-gradient-to-br from-charcoal via-charcoal-700 to-royal text-white">
      <div className="container-premium">
        {data.banner ? <img src={resolveMediaUrl(data.banner)} alt="Contact us" className="mb-8 max-h-80 w-full rounded-3xl object-cover" /> : null}
        <SectionHeading
          eyebrow={data.intro?.eyebrow || 'Contact'}
          title={data.intro?.title || 'Request a quotation today'}
          text={data.intro?.text}
          className="[&_*]:!text-white [&_.bg-royal-100]:!bg-white/10"
        />

        <div className="mt-8 grid gap-7 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="overflow-hidden rounded-[1.8rem] border border-white/15 bg-white/10 shadow-premium backdrop-blur-xl">
            <Card.Content className="p-0">
              <div className="grid gap-4 p-6 sm:p-7">
                <ContactRow icon={<Phone size={20} />} label="Phone" value={data.phone} href={buildPhoneLink(data.phone, data.phoneHref)} />
                <ContactRow
                  icon={<MessageCircle size={20} />}
                  label="WhatsApp"
                  value={data.whatsapp}
                  href={buildWhatsAppLink(data.whatsapp, undefined, data.whatsappHref)}
                />
                <ContactRow icon={<Mail size={20} />} label="Email" value={data.email} href={`mailto:${data.email || ''}`} />
                <ContactRow
                  icon={<MapPin size={20} />}
                  label="Address"
                  value={data.address}
                  href={googleMapSearch(data.mapQuery || data.address)}
                />
                <ContactRow icon={<Clock3 size={20} />} label="Business Hours" value={data.hours} />
              </div>
              <div className="flex flex-wrap gap-4 px-6 pb-6">
                {(data.socials || []).map((social, index) => <a key={index} href={social.href} target="_blank" rel="noreferrer" className="font-bold underline">{social.label}</a>)}
              </div>
              <Separator className="bg-white/10" />
              {data.mapEmbedUrl ? (
                <iframe
                  className="h-80 w-full border-0 bg-white/10"
                  src={data.mapEmbedUrl}
                  title="Location on Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : null}
            </Card.Content>
          </Card>

          <div className="rounded-[1.8rem] border border-white/60 bg-white p-2 shadow-premium">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ icon, label, value, href }) {
  const content = (
    <>
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-cta text-charcoal">
        {icon}
      </span>
      <span>
        <small className="block text-xs font-black uppercase tracking-[0.16em] text-white/48">
          {label}
        </small>
        <strong className="mt-1 block text-sm font-black text-white">{value}</strong>
      </span>
    </>
  )

  if (!href || !value) {
    return <div className="flex items-center gap-3 rounded-[1.25rem] bg-white/8 p-4">{content}</div>
  }

  return (
    <a
      className="flex items-center gap-3 rounded-[1.25rem] bg-white/8 p-4 transition hover:bg-white/14"
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
    >
      {content}
    </a>
  )
}
