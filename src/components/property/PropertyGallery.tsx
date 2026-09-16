'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

export interface PropertyImageItem {
  url: string
  alt?: string
  title?: string
}

interface PropertyGalleryProps {
  images: PropertyImageItem[]
  title: string
  isSold?: boolean
  soldLabel?: string
  viewAllLabel?: string
  enlargeHint?: string
}

export function PropertyGallery({
  images = [],
  title,
  isSold = false,
  soldLabel = 'SOLD',
  viewAllLabel = 'View all photos',
  enlargeHint = 'Click to enlarge',
}: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)

  // Ensure selectedIndex is within bounds
  const currentImage = images[selectedIndex] || images[0]

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false)
  }, [])

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowRight') nextLightbox()
      else if (e.key === 'ArrowLeft') prevLightbox()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLightboxOpen, closeLightbox, nextLightbox, prevLightbox])

  // Touch handlers for mobile swipe in lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    const threshold = 40

    if (diff > threshold) {
      nextLightbox()
    } else if (diff < -threshold) {
      prevLightbox()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  if (!images || images.length === 0) {
    return null
  }

  const hasMultiple = images.length > 1

  return (
    <div className="vl-prop-gallery-root" aria-label="Property Image Gallery">
      {/* ========================================================================= */}
      {/* MAIN HERO STAGE                                                           */}
      {/* ========================================================================= */}
      <div
        className="vl-prop-gallery-stage"
        onClick={() => openLightbox(selectedIndex)}
        role="button"
        tabIndex={0}
        aria-label={`${enlargeHint}: ${title} (Photo ${selectedIndex + 1} of ${images.length})`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openLightbox(selectedIndex)
          }
        }}
      >
        <div className="vl-prop-gallery-stage-media">
          <Image
            src={currentImage?.url || '/assets/masterplanned-plots.jpg'}
            alt={currentImage?.alt || `${title} - View ${selectedIndex + 1}`}
            fill
            priority
            quality={92}
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="vl-prop-gallery-stage-img"
          />
          <div className="vl-prop-gallery-stage-scrim" />

          {isSold && <span className="vl-prop-sold-badge">{soldLabel}</span>}

          {/* Controls / Hints */}
          <div className="vl-prop-stage-top-bar">
            <span className="vl-prop-counter-pill">
              <span className="current">{String(selectedIndex + 1).padStart(2, '0')}</span>
              <span className="divider">/</span>
              <span className="total">{String(images.length).padStart(2, '0')}</span>
            </span>

            <button
              type="button"
              className="vl-prop-enlarge-pill-btn"
              onClick={(e) => {
                e.stopPropagation()
                openLightbox(selectedIndex)
              }}
              aria-label="Enlarge view"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
              <span>{enlargeHint}</span>
            </button>
          </div>

          <div className="vl-prop-stage-bottom-hint">
            <span className="vl-prop-stage-hint-text">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              <span>Tap to inspect enlarged view</span>
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MULTI-IMAGE THUMBNAIL RIBBON (Shows ALL uploaded angles)                  */}
      {/* ========================================================================= */}
      {hasMultiple && (
        <div className="vl-prop-gallery-thumbs-wrap">
          <div className="vl-prop-gallery-thumbs-header">
            <span className="vl-prop-thumbs-title">
              <span>All Views ({images.length})</span>
            </span>
            <span className="vl-prop-thumbs-hint">Select view or click to enlarge</span>
          </div>

          <div className="vl-prop-gallery-thumbs-track" ref={thumbsRef} role="tablist" aria-label="Property Angles">
            {images.map((img, idx) => {
              const isSelected = selectedIndex === idx
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`View angle ${idx + 1} of ${images.length}`}
                  className={`vl-prop-thumb-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => {
                    setSelectedIndex(idx)
                  }}
                  onDoubleClick={() => openLightbox(idx)}
                >
                  <div className="vl-prop-thumb-img-box">
                    <Image
                      src={img.url}
                      alt={img.alt || `${title} thumbnail ${idx + 1}`}
                      fill
                      sizes="160px"
                      className="vl-prop-thumb-img"
                    />
                    <div className="vl-prop-thumb-overlay" />
                    <span className="vl-prop-thumb-num">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  {isSelected && <span className="vl-prop-thumb-active-line" />}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULLSCREEN ENLARGED LIGHTBOX MODAL                                        */}
      {/* ========================================================================= */}
      {isLightboxOpen && (
        <div
          className="vl-prop-lightbox-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} - Enlarged View`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Backdrop Blur */}
          <div className="vl-prop-lightbox-backdrop" onClick={closeLightbox} />

          {/* Top Bar Controls */}
          <div className="vl-prop-lightbox-header">
            <div className="vl-prop-lightbox-info">
              <span className="vl-prop-lightbox-counter">
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
              <span className="vl-prop-lightbox-title">{title}</span>
            </div>

            <button
              type="button"
              className="vl-prop-lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close enlarged view"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Center Enlarged Viewer */}
          <div className="vl-prop-lightbox-center">
            {hasMultiple && (
              <button
                type="button"
                className="vl-prop-lightbox-nav-btn vl-nav-prev"
                onClick={(e) => {
                  e.stopPropagation()
                  prevLightbox()
                }}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            <div className="vl-prop-lightbox-stage-box" onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[lightboxIndex]?.url || '/assets/masterplanned-plots.jpg'}
                alt={images[lightboxIndex]?.alt || `${title} - Enlarged view ${lightboxIndex + 1}`}
                fill
                priority
                quality={95}
                sizes="100vw"
                className="vl-prop-lightbox-main-img"
              />
            </div>

            {hasMultiple && (
              <button
                type="button"
                className="vl-prop-lightbox-nav-btn vl-nav-next"
                onClick={(e) => {
                  e.stopPropagation()
                  nextLightbox()
                }}
                aria-label="Next image"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip in Lightbox */}
          {hasMultiple && (
            <div className="vl-prop-lightbox-bottom-strip" onClick={(e) => e.stopPropagation()}>
              <div className="vl-prop-lightbox-thumbs-track">
                {images.map((item, idx) => {
                  const isActive = lightboxIndex === idx
                  return (
                    <button
                      key={`lb-thumb-${idx}`}
                      type="button"
                      className={`vl-prop-lb-thumb-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`Jump to view ${idx + 1}`}
                    >
                      <div className="vl-prop-lb-thumb-box">
                        <Image
                          src={item.url}
                          alt=""
                          fill
                          sizes="80px"
                          className="vl-prop-lb-thumb-img"
                        />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
