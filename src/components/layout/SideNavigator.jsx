import React from 'react'
import { useNavigation } from '../../hooks/useNavigation'

export default function SideNavigator() {
  const { activeSection, scrollTo, sections } = useNavigation()

  return (
    <aside className="side-navigator" aria-label="Section navigator">
      {sections.map((sec) => (
        <div key={sec.id} className="side-dot-item">
          <button
            className={`side-dot-btn ${activeSection === sec.id ? 'active' : ''}`}
            onClick={() => scrollTo(sec.id)}
            aria-label={`Cuộn đến ${sec.label}`}
          />
          <span className="side-dot-tooltip">{sec.label}</span>
        </div>
      ))}
    </aside>
  )
}
