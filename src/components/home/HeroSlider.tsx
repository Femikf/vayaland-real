'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { waLink } from '@/lib/site'
import './HeroSlider.css'

export interface HeroSlideItem {
  id: string
  image: string
  eyebrow: string
  serviceBadge: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaLink: string
  secondaryLabel?: string
  secondaryLink?: string
}

interface HeroSliderProps {
  slides: HeroSlideItem[]
  locale: string
}

export function HeroSlider({ slides, locale }: HeroSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const totalSlides = slides.length

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null)

  const goToSlide = useCallback(
    (idx: number) => {
      setCurrentIdx((idx + totalSlides) % totalSlides)
    },
    [totalSlides]
  )

  const nextSlide = useCallback(() => {
    goToSlide(currentIdx + 1)
  }, [currentIdx, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentIdx - 1)
  }, [currentIdx, goToSlide])

  // Continuous automatic sliding timer (5.5 seconds per slide)
  useEffect(() => {
    if (totalSlides <= 1) return

    autoPlayTimer.current = setTimeout(() => {
      nextSlide()
    }, 5500)

    return () => {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current)
    }
  }, [currentIdx, nextSlide, totalSlides])

  // Optional keyboard navigation (accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      else if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  // Silent mobile touch swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    const threshold = 45

    if (diff > threshold) {
      nextSlide()
    } else if (diff < -threshold) {
      prevSlide()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  if (!slides || slides.length === 0) return null

  const currentSlide = slides[currentIdx]

  return (
    <section
      className="vl-hero-slider"
      aria-label="VAYALAND Real Estate Showcase"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Slides Layer - Continuous Automatic Transitions */}
      <div className="vl-hero-slider-media-track">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIdx
          return (
            <div
              key={slide.id}
              className={`vl-hero-slide-item ${isActive ? 'is-active' : ''}`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                quality={92}
                sizes="100vw"
                className="vl-hero-slide-img"
              />
              <div className="vl-hero-slide-scrim" />
            </div>
          )
        })}
      </div>

      {/* Editorial Content Overlay */}
      <div className="vl-hero-slider-content-container">
        <div className="vl-container">
          <div className="vl-hero-slider-content-box" key={currentSlide.id}>
            {/* Clean Service & Eyebrow Badge (No controller / counter) */}
            <div className="vl-hero-slide-badge-row">
              <span className="vl-hero-service-badge">
                <span className="vl-hero-live-dot" />
                <span>{currentSlide.serviceBadge}</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="vl-hero-slide-title">
              {currentSlide.title}
            </h1>

            {/* Narrative Subtitle */}
            <p className="vl-hero-slide-subtitle">
              {currentSlide.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="vl-hero-slide-actions">
              <Link href={currentSlide.ctaLink} className="vl-btn-gold">
                <span>{currentSlide.ctaLabel}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {currentSlide.secondaryLink ? (
                <Link href={currentSlide.secondaryLink} className="vl-btn-outline-white">
                  <span>{currentSlide.secondaryLabel || (locale === 'ml' ? 'അന്വേഷിക്കുക' : 'Enquire Now')}</span>
                </Link>
              ) : (
                <a
                  href={waLink(
                    locale === 'ml'
                      ? `നമസ്കാരം, ${currentSlide.title} സംബന്ധിച്ച വിവരങ്ങൾ അറിയാൻ താല്പര്യപ്പെടുന്നു.`
                      : `Hello Vayaland, I am inquiring about "${currentSlide.title}". Please share full details.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vl-btn-outline-white"
                >
                  <span>{locale === 'ml' ? 'വാട്സ്ആപ്പ് വഴി ചോദിക്കുക' : 'WhatsApp Enquiry'}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}