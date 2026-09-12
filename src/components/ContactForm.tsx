'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact-form-card">
      <h3 className="contact-form-title">{t('formTitle')}</h3>
      {status === 'success' ? (
        <div className="contact-success" role="alert" aria-live="polite">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="var(--vl-amber)" strokeWidth="1.6" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p>{t('formSuccess')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="cf-field">
            <label htmlFor="cf-name" className="cf-label sr-only">
              {t('formName')}
            </label>
            <input
              id="cf-name"
              name="name"
              autoComplete="name"
              className="cf-input"
              type="text"
              placeholder={t('formName')}
              value={form.name}
              onChange={set('name')}
              required
              aria-required="true"
            />
          </div>

          <div className="cf-field">
            <label htmlFor="cf-email" className="cf-label sr-only">
              {t('formEmail')}
            </label>
            <input
              id="cf-email"
              name="email"
              autoComplete="email"
              className="cf-input"
              type="email"
              placeholder={t('formEmail')}
              value={form.email}
              onChange={set('email')}
            />
          </div>

          <div className="cf-field">
            <label htmlFor="cf-phone" className="cf-label sr-only">
              {t('formPhone')}
            </label>
            <input
              id="cf-phone"
              name="phone"
              autoComplete="tel"
              className="cf-input"
              type="tel"
              placeholder={t('formPhone')}
              value={form.phone}
              onChange={set('phone')}
            />
          </div>

          <div className="cf-field">
            <label htmlFor="cf-message" className="cf-label sr-only">
              {t('formMessage')}
            </label>
            <textarea
              id="cf-message"
              name="message"
              className="cf-input cf-textarea"
              placeholder={t('formMessage')}
              value={form.message}
              onChange={set('message')}
              rows={4}
            />
          </div>

          {status === 'error' && (
            <p className="cf-error" role="alert">
              {t('formError')}
            </p>
          )}

          <button
            type="submit"
            className="btn-gold cf-submit"
            disabled={status === 'sending'}
            aria-busy={status === 'sending'}
          >
            {status === 'sending' ? (
              <span className="cf-submit-loading">
                <span className="cf-spinner" aria-hidden="true" />
                <span>{t('formSending')}</span>
              </span>
            ) : (
              <span>{t('formSubmit')}</span>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
