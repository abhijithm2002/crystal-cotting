import { Tooltip } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, MessageCircle, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSiteContent } from '../../hooks/useSiteContent'
import { buildWhatsAppLink } from '../../utils/contactLinks'

export function FloatingActions() {
  const { contact } = useSiteContent()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setShowTop(window.scrollY > 620)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const phoneHref = contact?.phoneHref || `tel:${contact?.phone || ''}`

  return (
    <div className="fixed bottom-5 right-4 z-40 grid gap-3 sm:right-6">
      <FloatLink label="Call Now" href={phoneHref} className="bg-charcoal text-white">
        <Phone size={21} />
      </FloatLink>
      <FloatLink label="WhatsApp Now" href={buildWhatsAppLink(contact?.whatsapp)} className="bg-emerald-500 text-white">
        <MessageCircle size={22} />
      </FloatLink>
      <AnimatePresence>
        {showTop ? (
          <motion.button
            className="grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-white text-royal shadow-card backdrop-blur-xl"
            type="button"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp size={21} />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function FloatLink({ href, label, className, children }) {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <a
          className={`grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full shadow-premium transition hover:-translate-y-1 ${className}`}
          href={href}
          aria-label={label}
        >
          {children}
        </a>
      </Tooltip.Trigger>
      <Tooltip.Content showArrow className="rounded-xl bg-charcoal px-3 py-2 text-xs font-bold text-white">
        {label}
      </Tooltip.Content>
    </Tooltip>
  )
}
