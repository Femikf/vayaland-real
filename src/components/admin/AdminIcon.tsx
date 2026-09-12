import React from 'react'

export function AdminIcon() {
  return (
    <div style={{
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      overflow: 'hidden',
    }}>
      <img
        src="/assets/logo-icon.png"
        alt="VAYALAND"
        style={{
          width: 34,
          height: 34,
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
