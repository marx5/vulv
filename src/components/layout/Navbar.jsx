import React, { useState } from 'react'
import { useNavigation } from '../../hooks/useNavigation'
import { Button } from '../ui/Button'

export default function Navbar({ personalInfo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { activeSection, scrollTo, sections } = useNavigation()

  const handleLinkClick = (e, targetId) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    scrollTo(targetId)
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
          <span>{personalInfo?.shortName || 'VuLV'}</span>
        </a>

        <button 
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-nav-list"
        >
          {mobileMenuOpen ? '[Đóng]' : '[Menu]'}
        </button>

        <nav aria-label="Điều hướng chính">
          <ul id="primary-nav-list" className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
            {sections.map((item) => (
              <li key={item.id}>
                <a 
                  href={item.href} 
                  className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Button
                as="a"
                href="#contact"
                variant="primary"
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                onClick={(e) => handleLinkClick(e, 'contact')}
              >
                Hợp tác ngay
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
