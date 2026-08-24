import React from 'react'

export default function SideNavigator({ activeSection, onNavigate }) {
  const sections = [
    { id: 'hero', label: 'Trang chủ' },
    { id: 'about', label: 'Giới thiệu' },
    { id: 'skills', label: 'Kỹ năng' },
    { id: 'projects', label: 'Dự án' },
    { id: 'experience', label: 'Kinh nghiệm' },
    { id: 'contact', label: 'Liên hệ' },
  ]

  return (
    <aside className="side-navigator" aria-label="Section navigator">
      {sections.map((sec) => (
        <div key={sec.id} className="side-dot-item">
          <button
            className={`side-dot-btn ${activeSection === sec.id ? 'active' : ''}`}
            onClick={() => onNavigate(sec.id)}
            aria-label={`Cuộn đến ${sec.label}`}
          />
          <span className="side-dot-tooltip">{sec.label}</span>
        </div>
      ))}
    </aside>
  )
}
