import React from 'react'

export default function Badge({ children, variant = 'default' }) {
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold'
  const colors = {
    high: 'bg-red-900/50 text-red-200 border border-red-700/50',
    medium: 'bg-amber-900/50 text-amber-200 border border-amber-700/50',
    default: 'bg-gray-700 text-gray-100'
  }
  return <span className={`${base} ${colors[variant] || colors.default}`}>{children}</span>
}
