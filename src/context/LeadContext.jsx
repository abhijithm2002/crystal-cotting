import { useOverlayState } from '@heroui/react'
import { useMemo } from 'react'
import { LeadContext } from './leadContextCore'

export function LeadProvider({ children }) {
  const quoteModal = useOverlayState({})

  const value = useMemo(
    () => ({
      quoteModal,
      openQuote: quoteModal.open,
      closeQuote: quoteModal.close,
    }),
    [quoteModal],
  )

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>
}
