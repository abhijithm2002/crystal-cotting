// Pure helpers — callers pass in the live contact/homepage-footer data fetched
// from the API instead of importing a hardcoded `business` object.

export function buildWhatsAppLink(whatsapp, message = 'I would like a free painting quotation.') {
  const digits = (whatsapp || '').replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(`Hi, ${message}`)}`
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
