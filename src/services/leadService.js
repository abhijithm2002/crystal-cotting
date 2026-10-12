import { submitContactMessage } from './contentApi'

export async function submitLeadForm(values) {
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

  try {
    await submitContactMessage(values)
    return { ok: true, errors: {} }
  } catch (error) {
    return { ok: false, errors: { submit: error.message || 'Could not send your request. Please try again.' } }
  }
}
