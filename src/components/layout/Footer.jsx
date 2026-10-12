import { Camera, CirclePlay, Mail, MapPin, MessageCircle, Phone, Share2 } from 'lucide-react'
import { navItems } from '../../constants/siteData'
import { useSiteContent } from '../../hooks/useSiteContent'
import { resolveMediaUrl } from '../../services/api'
import { buildPhoneLink, buildWhatsAppLink, googleMapSearch } from '../../utils/contactLinks'

const socialIcons = {
  Instagram: Camera,
  Facebook: Share2,
  YouTube: CirclePlay,
}

export function Footer() {
  const { homepage, settings, services, contact } = useSiteContent()
  const footer = homepage?.footer || {}
  const siteName = settings?.siteName || 'Painting Company'
  const logo = resolveMediaUrl(settings?.logoWhite || settings?.logo)
  const mainServices = services?.main || []
  const secondaryServices = services?.secondary || []

  return (
    <footer className="bg-charcoal text-white">
      <div className="container-premium grid gap-10 py-14 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr]">
        <div>
          {logo ? (
            <img
              className="h-16 w-52 scale-110 rounded-2xl bg-white object-contain p-2"
              src={logo}
              alt={siteName}
            />
          ) : (
            <span className="text-xl font-black">{siteName}</span>
          )}
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/68">
            {footer.description ||
              'Premium painting services and complete home renovation solutions, crafted with quality workmanship and careful finishing.'}
          </p>
          <div className="mt-5 flex gap-2">
            {(footer.socials || []).map((social) => {
              const Icon = socialIcons[social.label] ?? Share2
              return (
                <a
                  key={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/8 text-white transition hover:bg-amber-cta hover:text-charcoal"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>

        <FooterColumn title="Quick Links" items={navItems.map((item) => [item.label, item.href])} />
        <FooterColumn
          title="Services"
          items={[
            ...mainServices.map((service) => [service.title, '#services']),
            ...secondaryServices.slice(0, 4).map((service) => [service.title, '#services']),
          ]}
        />

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-amber-cta">Contact</h3>
          <div className="mt-5 grid gap-4 text-sm text-white/72">
            <a className="flex gap-3 transition hover:text-white" href={buildPhoneLink(footer.phone || contact?.phone, footer.phone ? undefined : contact?.phoneHref)}>
              <Phone className="mt-0.5 text-amber-cta" size={18} />
              {footer.phone || contact?.phone}
            </a>
            <a
              className="flex gap-3 transition hover:text-white"
              href={buildWhatsAppLink(footer.whatsapp || contact?.whatsapp, undefined, footer.whatsapp ? undefined : contact?.whatsappHref)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="mt-0.5 text-amber-cta" size={18} />
              {footer.whatsapp || contact?.whatsapp}
            </a>
            <a className="flex gap-3 transition hover:text-white" href={`mailto:${footer.email || ''}`}>
              <Mail className="mt-0.5 text-amber-cta" size={18} />
              {footer.email}
            </a>
            <a
              className="flex gap-3 transition hover:text-white"
              href={googleMapSearch(footer.address)}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin className="mt-0.5 text-amber-cta" size={18} />
              {footer.address}
            </a>
            {footer.hours ? <p>{footer.hours}</p> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-premium flex flex-col gap-3 py-5 text-xs font-bold text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {settings?.footerText || `Copyright ${new Date().getFullYear()} ${siteName}. All rights reserved.`}
          </p>
          <p>Professional Painting Services | Complete Home Renovation Solutions</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.18em] text-amber-cta">{title}</h3>
      <div className="mt-5 grid gap-3">
        {items.map(([label, href]) => (
          <a key={`${title}-${label}`} className="text-sm font-bold text-white/68 transition hover:text-white" href={href}>
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
