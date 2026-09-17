'use client'

import { useState, useEffect, useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { waBuyLink, waSellLink } from '@/lib/site'

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)
  const locale = useLocale()
  const t = useTranslations('floatingWa')
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="vl-float-wa" ref={widgetRef}>
      {/* Popover Selection Card */}
      {isOpen && (
        <div
          className="vl-float-wa__card"
          role="dialog"
          aria-modal="true"
          aria-label={t('title')}
        >
          <div className="vl-float-wa__header">
            <div className="vl-float-wa__title-wrap">
              <div className="vl-float-wa__badge">
                <span className="vl-float-wa__online-dot" aria-hidden="true" />
                <span>WhatsApp</span>
              </div>
              <h4 className="vl-float-wa__title">{t('title')}</h4>
              <p className="vl-float-wa__subtitle">{t('subtitle')}</p>
            </div>
            <button
              type="button"
              className="vl-float-wa__close"
              onClick={() => setIsOpen(false)}
              aria-label={t('close')}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="vl-float-wa__options">
            {/* OPTION 1: BUY PROPERTY */}
            <a
              href={waBuyLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="vl-float-wa__option vl-float-wa__option--buy"
              onClick={() => setIsOpen(false)}
            >
              <div className="vl-float-wa__option-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className="vl-float-wa__option-text">
                <span className="vl-float-wa__option-title">{t('buyTitle')}</span>
                <span className="vl-float-wa__option-sub">{t('buySub')}</span>
              </div>
              <svg className="vl-float-wa__option-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>

            {/* OPTION 2: SELL PROPERTY */}
            <a
              href={waSellLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="vl-float-wa__option vl-float-wa__option--sell"
              onClick={() => setIsOpen(false)}
            >
              <div className="vl-float-wa__option-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="vl-float-wa__option-text">
                <span className="vl-float-wa__option-title">{t('sellTitle')}</span>
                <span className="vl-float-wa__option-sub">{t('sellSub')}</span>
              </div>
              <svg className="vl-float-wa__option-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>

          <div className="vl-float-wa__footer">
            <span>Direct Advisory • VAYALAND Wayanad</span>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        className={`vl-float-wa__btn ${isOpen ? 'vl-float-wa__btn--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={t('launcherAria')}
      >
        <span className="vl-float-wa__pulse" aria-hidden="true" />
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
        </svg>
        <span className="vl-float-wa__btn-label">
          {locale === 'ml' ? 'വാങ്ങാനും വിൽക്കാനും' : 'Buy / Sell'}
        </span>
      </button>
    </div>
  )
}
