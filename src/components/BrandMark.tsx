import React from 'react'

interface BrandMarkProps {
  className?: string
  size?: number
  height?: number
  width?: number
  priority?: boolean
}

export function BrandMark({ className, size = 42, height, width }: BrandMarkProps) {
  const h = height || size
  const w = width || Math.round(h * 1.12)

  return (
    <span
      className={`vl-brand-mark ${className || ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        lineHeight: 0,
      }}
      aria-hidden="true"
    >
      <img
        src="/assets/logo.png"
        alt="VAYALAND — The Real Wayanad"
        width={w}
        height={h}
        style={{
          width: 'auto',
          height: h,
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.12))',
        }}
      />
    </span>
  )
}
