import { setRequestLocale, getTranslations } from 'next-intl/server'
import { WA_NUMBER, ALT_NUMBER, MAIL, waBuyLink, waSellLink } from '@/lib/site'
import { ContactForm } from '@/components/ContactForm'

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')

  const mapSrc = `https://maps.google.com/maps?q=11.7925,76.1636+(VAYALAND)&t=&z=14&ie=UTF8&iwloc=&output=embed`

  return (
    <main className="contact-page">
      <header className="page-head">
        <div className="inner">
          <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('eyebrow')}</span></span>
          <h1 className="display">{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </div>
      </header>

      <div className="contact-wrap">

        {/* LEFT — info + map */}
        <div className="contact-left">
          <div className="contact-info">
            <div className="ci-row">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--vl-olive)" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" />
              </svg>
              <div>
                <span className="ci-label">{t('address')}</span>
                <span className="ci-value">{t('addressValue')}</span>
              </div>
            </div>
            <div className="ci-row">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--vl-olive)" strokeWidth="1.5" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 4.18 2 2 0 0 1 5.09 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div>
                <span className="ci-label">{t('phone')}</span>
                <a className="ci-value ci-link" href={`tel:+${WA_NUMBER}`}>+{WA_NUMBER}</a>
              </div>
            </div>
            <div className="ci-row">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--vl-olive)" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
              </svg>
              <div>
                <span className="ci-label">{t('email')}</span>
                <a className="ci-value ci-link" href={`mailto:${MAIL}`}>{MAIL}</a>
              </div>
            </div>
          </div>

          {/* DUAL WHATSAPP DIRECT ACTION CARDS (BUY OR SELL) */}
          <div className="contact-dual-wa">
            <h4 className="contact-dual-wa__title">{t('dualCtaTitle')}</h4>
            <p className="contact-dual-wa__sub">{t('dualCtaSub')}</p>

            <div className="contact-dual-wa__grid">
              {/* BUY ACTION */}
              <a
                href={waBuyLink(locale)}
                className="contact-wa-card contact-wa-card--buy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-wa-card__header">
                  <span className="contact-wa-card__tag">{t('waBuyTitle')}</span>
                  <svg className="contact-wa-card__icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                  </svg>
                </div>
                <div className="contact-wa-card__cta">{t('waBuyBtn')} →</div>
                <p className="contact-wa-card__desc">{t('waBuyDesc')}</p>
              </a>

              {/* SELL ACTION */}
              <a
                href={waSellLink(locale)}
                className="contact-wa-card contact-wa-card--sell"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-wa-card__header">
                  <span className="contact-wa-card__tag">{t('waSellTitle')}</span>
                  <svg className="contact-wa-card__icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                  </svg>
                </div>
                <div className="contact-wa-card__cta">{t('waSellBtn')} →</div>
                <p className="contact-wa-card__desc">{t('waSellDesc')}</p>
              </a>
            </div>

            <div className="contact-call-row">
              <a href={`tel:+${WA_NUMBER}`} className="btn-ghost">{t('call')} (+{WA_NUMBER})</a>
            </div>
          </div>

          <div className="contact-map">
            <iframe
              src={mapSrc}
              width="100%"
              height="240"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vayaland Location"
            />
          </div>
          <a
            href="https://maps.google.com/?q=11.7925,76.1636+(VAYALAND)"
            target="_blank"
            rel="noopener"
            className="map-link"
          >
            {t('openMap')} ↗
          </a>
        </div>

        {/* RIGHT — form */}
        <ContactForm />

      </div>
    </main>
  )
}
