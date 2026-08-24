import React from 'react'

export default function Footer({ personalInfo, onNavigate }) {
  const currentYear = new Date().getFullYear()

  const handleNav = (e, targetId) => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate(targetId)
    }
  }

  return (
    <footer className="footer-section">
      <div className="footer-inner">
        <div className="footer-brand">
          <span>&lt;{personalInfo.shortName} /&gt;</span> • Designed with Dashed Blueprint Aesthetic • © {currentYear}
        </div>

        <div className="footer-links">
          <a 
            href="#hero" 
            className="footer-link"
            onClick={(e) => handleNav(e, 'hero')}
          >
            [Đầu trang ↑]
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-link">[GitHub ↗]</a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">[LinkedIn ↗]</a>
        </div>
      </div>
    </footer>
  )
}
