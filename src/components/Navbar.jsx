import React, { useState } from 'react'

export default function Navbar({ personalInfo, activeSection = 'hero', onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { id: 'hero', label: 'Trang chủ', href: '#hero' },
    { id: 'about', label: 'Giới thiệu', href: '#about' },
    { id: 'skills', label: 'Kỹ năng', href: '#skills' },
    { id: 'projects', label: 'Dự án', href: '#projects' },
    { id: 'experience', label: 'Kinh nghiệm', href: '#experience' },
    { id: 'contact', label: 'Liên hệ', href: '#contact' },
  ]

  const handleLinkClick = (e, targetId) => {
    setMobileMenuOpen(false)
    if (onNavigate) {
      e.preventDefault()
      onNavigate(targetId)
    }
  }

  return (
    <header className="navbar-fixed">
      <div className="navbar-inner">
        <a 
          href="#hero" 
          className="navbar-logo"
          onClick={(e) => handleLinkClick(e, 'hero')}
        >
          <span className="navbar-logo-badge">&lt;/&gt;</span>
          <span>{personalInfo.shortName}</span>
        </a>

        <button 
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '[Đóng]' : '[Menu]'}
        </button>

        <nav>
          <ul className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
            {navLinks.map((item) => (
              <li key={item.id}>
                <a 
                  href={item.href} 
                  className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a 
                href="#contact" 
                className="dashed-btn dashed-btn-primary" 
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                onClick={(e) => handleLinkClick(e, 'contact')}
              >
                Hợp tác ngay
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
