import { Button } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, MessageCircle, Phone, X } from 'lucide-react'
import { useState } from 'react'
import { navItems } from '../../constants/siteData'
import { useScrolled } from '../../hooks/useScrolled'
import { useLead } from '../../hooks/useLead'
import { useSiteContent } from '../../hooks/useSiteContent'
import { resolveMediaUrl } from '../../services/api'
import { buildPhoneLink, buildWhatsAppLink } from '../../utils/contactLinks'

export function Header() {
  const scrolled = useScrolled(32)
  const [open, setOpen] = useState(false)
  const { openQuote } = useLead()
  const { settings, contact } = useSiteContent()

  const siteName = settings?.siteName || 'Painting Company'
  const logo = resolveMediaUrl(settings?.logoWhite || settings?.logo)
  const phoneHref = buildPhoneLink(contact?.phone, contact?.phoneHref)
  const whatsappLink = buildWhatsAppLink(
    contact?.whatsapp,
    'I would like a free painting quotation.',
    contact?.whatsappHref,
  )

  function closeMenu() {
    setOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`container-premium flex items-center justify-between gap-4 rounded-full border px-4 transition-all duration-300 ${
          scrolled
            ? 'border-white/70 bg-white/88 py-2 shadow-card backdrop-blur-xl'
            : 'border-white/35 bg-white/14 py-3 backdrop-blur-xl'
        }`}
      >
        <a className="flex items-center gap-3" href="#home" aria-label={`${siteName} home`}>
          <span className="grid h-12 w-40 place-items-center overflow-hidden rounded-full bg-white px-3 shadow-sm sm:w-44">
            {logo ? (
              <img className="h-10 w-full scale-125 object-contain" src={logo} alt={siteName} />
            ) : (
              <span className="text-sm font-black text-charcoal">{siteName}</span>
            )}
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={`rounded-full px-4 py-2 text-sm font-black transition ${
                scrolled ? 'text-charcoal hover:bg-royal-100' : 'text-white hover:bg-white/14'
              }`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-black transition ${
              scrolled
                ? 'border-mist bg-white text-royal hover:border-royal'
                : 'border-white/30 bg-white/12 text-white hover:bg-white/20'
            }`}
            href={whatsappLink}
            aria-label={`WhatsApp ${siteName}`}
            title="WhatsApp Now"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
          <a
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-black transition ${
              scrolled
                ? 'border-mist bg-white text-charcoal hover:border-royal'
                : 'border-white/30 bg-white/12 text-white hover:bg-white/20'
            }`}
            href={phoneHref}
          >
            <Phone size={16} />
            Call Now
          </a>
          <Button
            className="min-h-11 rounded-full bg-gradient-to-r from-amber-cta to-orange-cta px-5 text-sm font-black text-charcoal shadow-[0_14px_30px_rgba(249,115,22,0.28)]"
            onClick={openQuote}
          >
            Get Free Quote
          </Button>
        </div>

        <button
          className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${
            scrolled ? 'border-mist bg-white text-charcoal' : 'border-white/30 bg-white/12 text-white'
          }`}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="container-premium mt-3 overflow-hidden rounded-[1.4rem] border border-white/70 bg-white/95 p-3 shadow-card backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <nav className="grid" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-black text-charcoal hover:bg-royal-100"
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 text-sm font-black text-white"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                >
                  <MessageCircle size={17} /> WhatsApp
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-charcoal px-4 text-sm font-black text-white"
                  href={phoneHref}
                  onClick={closeMenu}
                >
                  <Phone size={17} /> Call
                </a>
                <button
                  className="min-h-12 rounded-full bg-gradient-to-r from-amber-cta to-orange-cta px-4 text-sm font-black text-charcoal"
                  type="button"
                  onClick={() => {
                    closeMenu()
                    window.setTimeout(openQuote, 0)
                  }}
                >
                  Free Quote
                </button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
