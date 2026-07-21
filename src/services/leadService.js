import { buildMailto } from '../utils/contactLinks'
import { submitContactMessage } from './contentApi'

export async function submitLeadForm(values, { email } = {}) {
  const errors = {}

  if (!values.name?.trim()) errors.name = 'Please enter your name.'
  if (!values.phone?.trim()) errors.phone = 'Please enter your phone number.'
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.message?.trim()) errors.message = 'Please share a few project details.'

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  // Persist the enquiry so it shows up under Contact Messages in the admin
  // dashboard. If the API is unreachable we still let the visitor continue
  // via their email client so a lead is never silently lost.
  try {
    await submitContactMessage(values)
  } catch {
    // non-fatal — fall through to mailto below
  }

  window.location.href = buildMailto(email, values)
  return { ok: true, errors: {} }
}
