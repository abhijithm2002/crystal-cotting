import { Badge, Chip } from '@heroui/react'
import { motion } from 'framer-motion'
import { CheckCircle2, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { useSiteContent } from '../../hooks/useSiteContent'
import { useLead } from '../../hooks/useLead'
import { resolveMediaUrl } from '../../services/api'
import { buildPhoneLink, buildWhatsAppLink } from '../../utils/contactLinks'
import { resolveIcon } from '../../utils/iconMap'
import { fadeUp, staggerContainer } from '../../utils/motion'
import { PremiumButton } from '../common/PremiumButton'

const buttonIcons = {
  whatsapp: <MessageCircle size={18} />,
  call: <Phone size={17} />,
}

const buttonVariants = {
  primary: 'cta',
  whatsapp: 'blue',
  call: 'glass',
}

export function HeroSection() {
  const { openQuote } = useLead()
  const { homepage, contact } = useSiteContent()
  const hero = homepage?.hero || {}
  const heroStats = homepage?.heroStats || []

  // Every button's destination is fully admin-controlled via `link`
  // (e.g. "tel:...", "https://wa.me/...", "#contact"). "#quote" is a
  // reserved value that opens the in-page quote modal instead of navigating.
  function buttonProps(button) {
    const variant = buttonVariants[button.type] || 'outline'
    const icon = buttonIcons[button.type]
    if (button.link === '#quote') {
      return { onClick: openQuote, variant, icon, showArrow: variant === 'cta' }
    }
    if (button.type === 'whatsapp') {
      return {
        href: buildWhatsAppLink(contact?.whatsapp, 'I would like a free painting quotation.', contact?.whatsappHref),
        target: '_blank',
        rel: 'noreferrer',
        variant,
        icon,
      }
    }
    if (button.type === 'call') {
      return { href: buildPhoneLink(contact?.phone, contact?.phoneHref), variant, icon }
    }
    return { href: button.link, variant, icon }
  }

  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden bg-charcoal text-white">
      {hero.backgroundImage ? (
        <img
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          src={resolveMediaUrl(hero.backgroundImage)}
          alt={hero.title || 'Hero banner'}
          fetchPriority="high"
        />
      ) : null}
      <div className="hero-mesh absolute inset-0 -z-10" />
      <motion.div
        className="container-premium grid min-h-screen items-center gap-12 pb-12 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:pt-36"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            {hero.eyebrow ? (
              <Chip className="border border-white/15 bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl">
                {hero.eyebrow}
              </Chip>
            ) : null}
            {hero.badgeText ? (
              <Badge className="border border-amber-cta/40 bg-amber-cta/20 px-3 py-1 text-xs font-black text-amber-100">
                {hero.badgeText}
              </Badge>
            ) : null}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="premium-gradient-text mt-6 max-w-4xl text-4xl font-black leading-[0.98] sm:text-6xl lg:text-7xl"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            {(hero.buttons || []).map((button) => {
              const { icon, ...rest } = buttonProps(button)
              return (
                <PremiumButton key={button.text} icon={icon} {...rest}>
                  {button.text}
                </PremiumButton>
              )
            })}
          </motion.div>

          {hero.highlightTags?.length ? (
            <motion.div variants={fadeUp} className="mt-8 grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:flex sm:flex-wrap">
              {hero.highlightTags.map((item) => (
                <span
                  className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-2 text-center text-sm font-bold text-white/88 backdrop-blur-xl sm:px-4"
                  key={item}
                >
                  <CheckCircle2 size={16} className="text-amber-cta" />
                  {item}
                </span>
              ))}
            </motion.div>
          ) : null}
        </div>

        <motion.div
          variants={fadeUp}
          className="dark-glass relative hidden rounded-[2rem] p-5 lg:block"
        >
          {hero.floatingBadgeText ? (
            <div className="absolute -right-5 -top-5 grid h-24 w-24 place-items-center rounded-full bg-amber-cta text-center text-sm font-black leading-tight text-charcoal shadow-premium">
              {hero.floatingBadgeText}
            </div>
          ) : null}
          {hero.sideImage ? (
            <div className="overflow-hidden rounded-[1.55rem] image-shine relative">
              <img
                className="h-[420px] w-full object-cover"
                src={resolveMediaUrl(hero.sideImage)}
                alt={hero.sideCaption?.title || 'Featured work'}
                loading="eager"
              />
            </div>
          ) : null}
          {hero.sideCaption?.title ? (
            <div className="mt-5 grid gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/12 text-amber-cta">
                  <ShieldCheck size={24} />
                </span>
                <div>
                  <strong className="block text-lg font-black">{hero.sideCaption.title}</strong>
                  <span className="text-sm text-white/65">{hero.sideCaption.text}</span>
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>

        {heroStats.length ? (
          <motion.div
            variants={fadeUp}
            className="col-span-full grid gap-3 rounded-[1.5rem] border border-white/15 bg-white/10 p-3 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
          >
            {heroStats.map(({ label, value, icon }) => {
              const Icon = resolveIcon(icon)
              return (
                <div key={label} className="flex items-center gap-3 rounded-[1.15rem] bg-white/10 p-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-cta text-charcoal">
                    <Icon size={21} />
                  </span>
                  <span>
                    <strong className="block text-2xl font-black">{value}</strong>
                    <small className="text-xs font-bold uppercase tracking-[0.12em] text-white/62">
                      {label}
                    </small>
                  </span>
                </div>
              )
            })}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  )
}
