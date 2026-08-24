import React from 'react'

export default function Hero({ personalInfo, onNavigate }) {
  const handleNav = (e, targetId) => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate(targetId)
    }
  }

  return (
    <section id="hero" className="section-fullscreen">
      <div className="section-content">
        <div className="dashed-box dashed-box-corner hero-main-box">
          <div className="hero-status">
            <span className="hero-status-dot"></span>
            <span className="dashed-tag">{personalInfo.status}</span>
          </div>

          <p className="hero-greeting">// Xin chào, tôi là</p>
          <h1 className="hero-name">{personalInfo.name}</h1>
          <p className="hero-role">&lt;{personalInfo.role} /&gt;</p>

          <p className="hero-bio">{personalInfo.bio}</p>

          <div className="hero-actions">
            <a 
              href="#projects" 
              className="dashed-btn dashed-btn-primary"
              onClick={(e) => handleNav(e, 'projects')}
            >
              <span>Xem dự án</span>
              <span>↓</span>
            </a>
            <a 
              href="#contact" 
              className="dashed-btn"
              onClick={(e) => handleNav(e, 'contact')}
            >
              <span>Liên hệ</span>
              <span>→</span>
            </a>
            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="dashed-btn"
            >
              <span>GitHub</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
