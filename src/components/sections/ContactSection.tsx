import { type FormEvent, useState } from 'react'
import { locations } from '../../data/site'
import { useI18n } from '../../lib/i18n'
import LineIcon from '../ui/LineIcon'

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  country: string
  message: string
}

const initialForm: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  message: '',
}

export default function ContactSection() {
  const { t } = useI18n()
  const [form, setForm] = useState<FormState>(initialForm)
  const [error, setError] = useState('')

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(t.form.required)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(t.form.invalidEmail)
      return
    }

    const subject = 'Website enquiry — ' + form.name
    const body = [
      'Name: ' + form.name,
      'Company: ' + (form.company || '—'),
      'Email: ' + form.email,
      'Phone: ' + (form.phone || '—'),
      'Country: ' + (form.country || '—'),
      '',
      form.message,
    ].join('\n')

    window.location.href = 'mailto:info11umojalogistique@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow"><span>—</span> {t.contact.kicker}</p>
          <h2>{t.contact.title}</h2>
          <p className="lead">{t.contact.body}</p>
          <div className="contact-details">
            <div>
              <span>{t.contact.locations}</span>
              {locations.map((location) => <p key={location}>{location}</p>)}
              <p className="contact-address">{t.contact.address}</p>
            </div>
            <div>
              <span>{t.contact.phone}</span>
              <a href="tel:+243893041363">+243 89 30 41 363</a>
            </div>
            <div>
              <span>{t.contact.whatsapp}</span>
              <a href="https://wa.me/27836316135" target="_blank" rel="noreferrer">+27 83 631 6135</a>
            </div>
            <div>
              <span>{t.contact.email}</span>
              <a href="mailto:info11umojalogistique@gmail.com">info11umojalogistique@gmail.com</a>
            </div>
          </div>
          <div className="social-soon">
            <span>{t.contact.social}</span>
            <p>LinkedIn <i /> Facebook <i /> Instagram — {t.contact.comingSoon}</p>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit} noValidate>
          <div className="form-field">
            <label htmlFor="name">{t.form.name} <em>*</em></label>
            <input id="name" name="name" value={form.name} onChange={(event) => updateField('name', event.target.value)} autoComplete="name" />
          </div>
          <div className="form-field">
            <label htmlFor="company">{t.form.company}</label>
            <input id="company" name="company" value={form.company} onChange={(event) => updateField('company', event.target.value)} autoComplete="organization" />
          </div>
          <div className="form-field">
            <label htmlFor="email">{t.form.email} <em>*</em></label>
            <input id="email" name="email" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} autoComplete="email" />
          </div>
          <div className="form-field">
            <label htmlFor="phone">{t.form.phone}</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} autoComplete="tel" />
          </div>
          <div className="form-field form-field--full">
            <label htmlFor="country">{t.form.country}</label>
            <input id="country" name="country" value={form.country} onChange={(event) => updateField('country', event.target.value)} autoComplete="country-name" />
          </div>
          <div className="form-field form-field--full">
            <label htmlFor="message">{t.form.message} <em>*</em></label>
            <textarea id="message" name="message" rows={5} value={form.message} onChange={(event) => updateField('message', event.target.value)} />
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button--dark form-submit" type="submit">
            {t.form.submit} <LineIcon name="arrow" />
          </button>
          <p className="form-note">{t.contact.formNote}</p>
        </form>
      </div>
    </section>
  )
}
