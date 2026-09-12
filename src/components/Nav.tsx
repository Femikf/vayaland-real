'use client'

import { useEffect, useState, useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { BrandMark } from './BrandMark'
import { waLink, WA_NUMBER, MAIL } from '@/lib/site'

export function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll and handle keyboard accessibility (Escape to close)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      closeBtnRef.current?.focus()

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMenuOpen(false)
          triggerRef.current?.focus()
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Normalize path without locale prefix
  const path = pathname.replace(/^\/(en|ml)/, '') || '/'
  const is = (p: string) => (path === p ? 'vl-nav-link--active' : '')
  
  const close = () => {
    setMenuOpen(false)
    triggerRef.current?.focus()
  }

  const navItems = [
    { href: '/projects', label: t('projects'), num: '01', key: 'projects' },
    { href: '/about', label: t('about'), num: '02', key: 'about' },
    { href: '/services', label: t('services'), num: '03', key: 'services' },
    { href: '/gallery', label: t('gallery'), num: '04', key: 'gallery' },
    { href: '/contact', label: t('contact'), num: '05', key: 'contact' },
  ]

  const consultMessage =
    locale === 'ml'
      ? 'നമസ്കാരം, വയലാൻഡിനെക്കുറിച്ചും വയനാട്ടിലെ പ്രോപ്പർട്ടികളെക്കുറിച്ചും സംസാരിക്കാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Hello Vayaland, I am interested in VAYALAND properties in Wayanad and would like to schedule a consultation.'

  return (
    <>
      <header className={`vl-header ${scrolled ? 'vl-header--scrolled' : ''}`}>
        <div className="vl-header__container">
          {/* Brand Logo & Wordmark */}
          <Link href="/" className="vl-brand" onClick={close}>
            <BrandMark size={44} className="vl-brand__mark" />
            <div className="vl-brand__text">
              <span className="vl-brand__name">VAYALAND</span>
              <span className="vl-brand__tag">THE REAL WAYANAD</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="vl-nav" aria-label="Main Navigation">
            <ul className="vl-nav__list">
              {navItems.map((item) => (
                <li key={`${item.key}-${item.num}`} className="vl-nav__item">
                  <Link
                    href={item.href}
                    className={`vl-nav-link ${is(item.href)}`}
                  >
                    <span className="vl-nav-link__text">{item.label}</span>
                    <span className="vl-nav-link__line" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="vl-actions">
            {/* Language Selector */}
            <div className="vl-lang" role="group" aria-label="Language selection">
              <Link
                href={path}
                locale="en"
                className={`vl-lang__btn ${locale === 'en' ? 'vl-lang__btn--active' : ''}`}
                aria-label="Switch to English"
              >
                EN
              </Link>
              <span className="vl-lang__sep" aria-hidden="true">/</span>
              <Link
                href={path}
                locale="ml"
                className={`vl-lang__btn ${locale === 'ml' ? 'vl-lang__btn--active' : ''}`}
                aria-label="മലയാളത്തിലേക്ക് മാറ്റുക"
              >
                മല
              </Link>
            </div>

            {/* Let's Talk CTA */}
            <a
              href={waLink(consultMessage)}
              className="vl-cta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire via WhatsApp"
            >
              <span className="vl-cta__text">{t('letsTalk')}</span>
              <svg
                className="vl-cta__arrow"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3.5 12.5L12.5 3.5M12.5 3.5H6M12.5 3.5V10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Mobile Menu Button (48x48px min touch target) */}
            <button
              ref={triggerRef}
              className={`vl-menu-trigger ${menuOpen ? 'vl-menu-trigger--open' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="vl-mobile-drawer"
              aria-haspopup="dialog"
              aria-label={menuOpen ? t('close') : t('menu')}
            >
              <span className="vl-menu-trigger__label">
                {menuOpen ? t('close') : t('menu')}
              </span>
              <span className="vl-menu-trigger__icon" aria-hidden="true">
                <span className="vl-menu-trigger__bar" />
                <span className="vl-menu-trigger__bar" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Editorial Mobile Drawer */}
      <div
        id="vl-mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`vl-drawer ${menuOpen ? 'vl-drawer--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="vl-drawer__backdrop" onClick={close} aria-hidden="true" />

        <div className="vl-drawer__content">
          {/* Top Bar inside Drawer */}
          <div className="vl-drawer__top">
            <Link href="/" className="vl-brand" onClick={close}>
              <BrandMark size={40} className="vl-brand__mark" />
              <div className="vl-brand__text">
                <span className="vl-brand__name">VAYALAND</span>
                <span className="vl-brand__tag">THE REAL WAYANAD</span>
              </div>
            </Link>

            <button
              ref={closeBtnRef}
              className="vl-drawer__close-btn"
              onClick={close}
              aria-label={t('close')}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="vl-drawer__body">
            {/* Navigation Links */}
            <nav className="vl-drawer__nav" aria-label="Mobile Directory">
              <ul className="vl-drawer__list">
                {navItems.map((item, idx) => {
                  const active = is(item.href) !== ''
                  return (
                    <li
                      key={`mobile-${item.key}-${idx}`}
                      className="vl-drawer__item"
                      style={{ transitionDelay: `${idx * 45 + 80}ms` }}
                    >
                      <Link
                        href={item.href}
                        className={`vl-drawer__link ${active ? 'vl-drawer__link--active' : ''}`}
                        onClick={close}
                      >
                        <span className="vl-drawer__num">{item.num}</span>
                        <span className="vl-drawer__label">{item.label}</span>
                        {active ? (
                          <span className="vl-drawer__active-indicator" aria-hidden="true">●</span>
                        ) : (
                          <span className="vl-drawer__arrow" aria-hidden="true">↗</span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Drawer Footer & Contact Strip */}
            <div className="vl-drawer__footer">
              <div className="vl-drawer__contact-info">
                <span className="vl-drawer__loc-label">HEADQUARTERS & ADVISORY DESK</span>
                <p className="vl-drawer__loc-val">Pulpally, Wayanad, Kerala — 673579</p>
                <div className="vl-drawer__direct-links">
                  <a href={`tel:+${WA_NUMBER}`} className="vl-drawer__contact-link">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>+91 95264 35619</span>
                  </a>
                  <a href={`mailto:${MAIL}`} className="vl-drawer__contact-link">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                    <span>{MAIL}</span>
                  </a>
                </div>
              </div>

              {/* Language Switcher & Full-Width CTA */}
              <div className="vl-drawer__action-row">
                <div className="vl-drawer__lang" role="group" aria-label="Mobile language switcher">
                  <Link
                    href={path}
                    locale="en"
                    className={`vl-drawer__lang-btn ${locale === 'en' ? 'active' : ''}`}
                    onClick={close}
                  >
                    English
                  </Link>
                  <span className="vl-drawer__lang-sep" aria-hidden="true">|</span>
                  <Link
                    href={path}
                    locale="ml"
                    className={`vl-drawer__lang-btn ${locale === 'ml' ? 'active' : ''}`}
                    onClick={close}
                  >
                    മലയാളം
                  </Link>
                </div>

                <a
                  href={waLink(consultMessage)}
                  className="vl-drawer__cta"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  aria-label="Direct WhatsApp consultation"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
                  </svg>
                  <span>{t('letsTalk')}</span>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M3 13L13 3M13 3H5M13 3V11" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
