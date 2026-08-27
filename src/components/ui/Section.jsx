import React from 'react'

/**
 * Compound Component: Section
 * Cung cấp khung bao chuẩn và phân chia Header / Body cho toàn bộ các Section trong trang
 */
export function Section({ id, className = '', children, ...props }) {
  return (
    <section id={id} className={`section-fullscreen ${className}`.trim()} {...props}>
      <div className="section-content">{children}</div>
    </section>
  )
}

function SectionHeader({ label, badge, title, subtitle, className = '', children }) {
  return (
    <div className={`section-header-compact ${className}`.trim()}>
      {badge ? (
        badge
      ) : label ? (
        <div className="section-label">{label}</div>
      ) : null}

      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {children}
    </div>
  )
}

function SectionBody({ className = '', children }) {
  return <div className={`section-body ${className}`.trim()}>{children}</div>
}

Section.Header = SectionHeader
Section.Body = SectionBody

export default Section
