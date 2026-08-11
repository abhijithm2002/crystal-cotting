// Pure helpers — callers pass in the live contact/homepage-footer data fetched
// from the API instead of importing a hardcoded `business` object.

export function buildWhatsAppLink(
  whatsapp,
  message = 'I would like a free painting quotation.',
  whatsappHref,
) {
  const digits = (whatsapp || '').replace(/\D/g, '')
  const baseUrl = digits ? `https://wa.me/${digits}` : whatsappHref?.trim()

  if (!baseUrl) return '#contact'

  try {
    const url = new URL(baseUrl)
    if (!url.searchParams.has('text')) {
      url.searchParams.set('text', `Hi, ${message}`)
    }
    return url.toString()
  } catch {
    return '#contact'
  }
}

export function buildPhoneLink(phone, phoneHref) {
  const digits = (phone || '').replace(/\D/g, '')
  if (digits) return `tel:${phone?.trim().startsWith('+') ? '+' : ''}${digits}`
  return phoneHref?.trim() || '#contact'
}

export function buildMailto(email, formValues) {
  const subject = encodeURIComponent(`Quotation request from ${formValues.name || 'Website visitor'}`)
  const body = encodeURIComponent(
    [
      `Name: ${formValues.name || ''}`,
      `Phone: ${formValues.phone || ''}`,
      `Email: ${formValues.email || ''}`,
      `Service Required: ${formValues.service || ''}`,
      '',
      'Message:',
      formValues.message || '',
    ].join('\n'),
  )

  return `mailto:${email || ''}?subject=${subject}&body=${body}`
}

export function googleMapEmbed(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query || '')}&output=embed`
}

export function googleMapSearch(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query || '')}`
}
