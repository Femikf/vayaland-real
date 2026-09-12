'use client'

import { useEffect, useRef, useState } from 'react'

export type Slide = {
  id: string
  title: string
  eyebrow?: string
  subtitle?: string
  ctaLabel?: string
  ctaLink?: string
  imageUrl?: string
}

export function HeroCarousel({ slides, scrollLabel }: { slides: Slide[]; scrollLabel: string }) {
  const defaultSlides: Slide[] = [
    {
      id: 'default-1',
      title: 'Architectural Living & Land in Wayanad',
      eyebrow: 'VAYALAND · THE REAL WAYANAD',
      subtitle: 'Curated plots, plantation estates, and contemporary villas nestled in the Western Ghats.',
      ctaLabel: 'Explore Properties',
      ctaLink: '/gallery',
      imageUrl: '/assets/hero-villa.jpg',
    },
    {
      id: 'default-2',
      title: 'Land Plots & Masterplanned Estates',
      eyebrow: 'EXCLUSIVE WAYANAD PARCELS',
      subtitle: 'Permanence, understated luxury, and verified titles in the heart of Kerala.',
      ctaLabel: 'Our Services',
      ctaLink: '/services',
      imageUrl: '/assets/architecture-mood.jpg',
    },
  ]

  const activeSlides = slides.length > 0 ? slides : defaultSlides
  const [idx, setIdx] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const n = activeSlides.length

  const go = (to: number) => setIdx(((to % n) + n) % n)

  useEffect(() => {
    if (n < 2) return
    timer.current = setTimeout(() => setIdx((i) => (i + 1) % n), 6000)
    return () => clearTimeout(timer.current)
  }, [idx, n])

  return (
    <header
      className="hero"
      onMouseEnter={() => clearTimeout(timer.current)}
      onMouseLeave={() => { timer.current = setTimeout(() => setIdx((i) => (i + 1) % n), 6000) }}
    >
      <div className="slides">
        {activeSlides.map((s, i) => (
          <div key={s.id} className={`slide ${i === idx ? 'active' : ''}`}>
            <div className="slide-bg" style={{ backgroundImage: s.imageUrl ? `url('${s.imageUrl}')` : undefined }} />
          </div>
        ))}
      </div>

      {/* gold skyline line-draw */}
      <svg className="skyline" viewBox="0 0 260 420" fill="none" preserveAspectRatio="xMidYMax meet">
        <polyline points="20,420 20,180 60,180 60,120 100,120 100,420" />
        <polyline points="100,420 100,90 150,60 150,420" />
        <polyline points="150,420 150,140 195,140 195,80 235,80 235,420" />
        <line x1="35" y1="210" x2="45" y2="210" /><line x1="35" y1="250" x2="45" y2="250" /><line x1="35" y1="290" x2="45" y2="290" />
        <line x1="118" y1="150" x2="132" y2="150" /><line x1="118" y1="200" x2="132" y2="200" /><line x1="118" y1="250" x2="132" y2="250" /><line x1="118" y1="300" x2="132" y2="300" />
        <line x1="205" y1="160" x2="225" y2="160" /><line x1="205" y1="220" x2="225" y2="220" /><line x1="205" y1="280" x2="225" y2="280" />
      </svg>

      <div className="hero-top">
        {activeSlides.map((s, i) => (
          <div key={s.id} className={`slide-content ${i === idx ? 'show' : ''}`}>
            {s.eyebrow && <span className="eyebrow">{s.eyebrow}</span>}
            <h1 className="display" key={`${s.id}-${idx}`}>
              {s.title.split(' ').map((w, wi) => (
                <span className="w" key={wi} style={{ animationDelay: `${0.35 + wi * 0.09}s` }}>
                  {w}{' '}
                </span>
              ))}
            </h1>
            {s.ctaLabel && s.ctaLink && (
              <div className="hero-cta">
                <a href={s.ctaLink} className="btn-gold">{s.ctaLabel}</a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="hero-bottom">
        {activeSlides.map((s, i) => (
          <div key={s.id} className={`slide-content ${i === idx ? 'show' : ''}`}>
            {s.subtitle && <p className="sub">{s.subtitle}</p>}
          </div>
        ))}
      </div>

      <div className="hero-controls">
        <div className="dots">
          {activeSlides.map((_, i) => (
            <button key={i} className={`dot ${i === idx ? 'active' : ''}`} onClick={() => go(i)} aria-label={`Slide ${i + 1}`}>
              <span />
            </button>
          ))}
        </div>
        <div className="slide-count"><b>{String(idx + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}</div>
      </div>
      <div className="scroll-hint">{scrollLabel}</div>
    </header>
  )
}
