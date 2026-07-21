import { useContext } from 'react'
import { LeadContext } from '../context/leadContextCore'

export function useLead() {
  const context = useContext(LeadContext)

  if (!context) {
    throw new Error('useLead must be used inside LeadProvider')
  }

  return context
}
