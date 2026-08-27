import React from 'react'

/**
 * Reusable Button & Link Component với explicit variants
 * Variant: 'default' | 'primary'
 */
export function Button({
  as: Component = 'button',
  variant = 'default',
  className = '',
  children,
  ...props
}) {
  const variantClass = variant === 'primary' ? 'dashed-btn dashed-btn-primary' : 'dashed-btn'

  return (
    <Component className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </Component>
  )
}

export default Button
