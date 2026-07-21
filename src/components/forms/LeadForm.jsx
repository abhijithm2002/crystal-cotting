import { Button, Input, TextArea } from '@heroui/react'
import { Send } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSiteContent } from '../../hooks/useSiteContent'
import { submitLeadForm } from '../../services/leadService'

const initialValues = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
}

export function LeadForm({ compact = false, onSuccess }) {
  const { services, contact } = useSiteContent()
  const serviceOptions = useMemo(() => {
    const titles = [...(services?.main || []), ...(services?.secondary || [])].map((item) => item.title)
    return titles.length ? titles : ['Interior Painting', 'Exterior Painting']
  }, [services])

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function updateValue(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    const result = await submitLeadForm(
      { ...values, service: values.service || serviceOptions[0] },
      { email: contact?.email },
    )
    setSubmitting(false)
    setErrors(result.errors)

    if (result.ok) {
      setSent(true)
      onSuccess?.()
    }
  }

  return (
    <form className={`grid gap-4 ${compact ? '' : 'rounded-[1.5rem] bg-white p-5 shadow-card sm:p-7'}`} onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <Input
            name="name"
            value={values.name}
            onChange={updateValue}
            placeholder="Your full name"
            className="min-h-12 rounded-2xl border border-mist bg-cloud px-4 text-charcoal"
            aria-label="Name"
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <Input
            name="phone"
            type="tel"
            value={values.phone}
            onChange={updateValue}
            placeholder="+91..."
            className="min-h-12 rounded-2xl border border-mist bg-cloud px-4 text-charcoal"
            aria-label="Phone"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" error={errors.email}>
          <Input
            name="email"
            type="email"
            value={values.email}
            onChange={updateValue}
            placeholder="you@example.com"
            className="min-h-12 rounded-2xl border border-mist bg-cloud px-4 text-charcoal"
            aria-label="Email"
          />
        </Field>
        <Field label="Service Required">
          <select
            name="service"
            value={values.service}
            onChange={updateValue}
            className="min-h-12 w-full rounded-2xl border border-mist bg-cloud px-4 text-sm font-bold text-charcoal outline-none transition focus:border-royal focus:ring-4 focus:ring-royal/10"
            aria-label="Service required"
          >
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" error={errors.message}>
        <TextArea
          name="message"
          value={values.message}
          onChange={updateValue}
          placeholder="Tell us your location, property size, wall condition, and timeline."
          rows={compact ? 4 : 6}
          className="min-h-32 rounded-2xl border border-mist bg-cloud px-4 py-3 text-charcoal"
          aria-label="Message"
        />
      </Field>

      <Button
        type="submit"
        isDisabled={submitting}
        className="min-h-13 rounded-full bg-gradient-to-r from-amber-cta to-orange-cta px-7 font-black text-charcoal shadow-[0_18px_40px_rgba(249,115,22,0.3)] transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {submitting ? 'Submitting…' : 'Submit Quote Request'}
        <Send size={17} aria-hidden="true" />
      </Button>

      {sent ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
          Your email app is opening with the enquiry details. You can also send us a WhatsApp for a faster reply.
        </p>
      ) : null}
    </form>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="grid gap-2 text-sm font-black text-charcoal">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs font-bold text-red-600">{error}</span> : null}
    </label>
  )
}
