import React from 'react'

export function AdminLogo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <img
        src="/assets/logo.png"
        alt="VAYALAND — The Real Wayanad"
        style={{
          width: 80,
          height: 'auto',
          objectFit: 'contain',
        }}
      />
      <span style={{ color: '#085056', fontSize: 16, fontWeight: 700, letterSpacing: '0.14em' }}>
        VAYALAND
      </span>
    </div>
  )
}
