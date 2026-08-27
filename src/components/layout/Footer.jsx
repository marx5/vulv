import React from 'react'
import { useNavigation } from '../../hooks/useNavigation'

export default function Footer({ personalInfo }) {
  const currentYear = new Date().getFullYear()
  const { scrollTo } = useNavigation()

  const handleScrollTop = (e) => {
    e.preventDefault()
    scrollTo('hero')
  }

  return (
    <footer className="footer-section">
      <div className="footer-inner">
        <div className="footer-brand">
          <span>&lt;{personalInfo?.shortName || 'VuLV'} /&gt;</span> • Designed with Dashed Blueprint Aesthetic • © {currentYear}
        </div>

        <div className="footer-links">
          <a 
            href="#hero" 
            className="footer-link"
            onClick={handleScrollTop}
          >
            [Đầu trang ↑]
          </a>
          <a href={personalInfo?.github || '#'} target="_blank" rel="noopener noreferrer" className="footer-link">
            [GitHub ↗]
          </a>
          <a href={personalInfo?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="footer-link">
            [LinkedIn ↗]
          </a>
        </div>
      </div>
    </footer>
  )
}
