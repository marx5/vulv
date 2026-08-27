import React from 'react'

/**
 * Reusable Tag / Badge Component
 * Variant: 'dashed' | 'pill' | 'badge'
 */
export function Tag({
  variant = 'dashed',
  className = '',
  dot = false,
  children,
  ...props
}) {
  if (variant === 'pill') {
    return (
      <div className={`liquid-skill-pill ${className}`.trim()} {...props}>
        {dot && <span className="pill-dot" />}
        <span className="pill-text">{children}</span>
      </div>
    )
  }

  return (
    <span className={`dashed-tag ${className}`.trim()} {...props}>
      {children}
    </span>
  )
}

export default Tag
