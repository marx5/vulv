import React, { useState } from 'react'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'
import ThreeSkillsCanvas from './ThreeSkillsCanvas'

export default function Skills({ skills = [] }) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const [hoveredTech, setHoveredTech] = useState(null)
  const categoryIcons = ['⚡', '🛡️', '🚀']

  const totalTech = skills.reduce((acc, cat) => acc + cat.items.length, 0)

  return (
    <Section id="skills" className="skills-liquid-section">
      <Section.Header
        badge={
          <div className="liquid-glass-badge">
            <span className="liquid-badge-dot" />
            <span>02. FULLSTACK ARCHITECTURE & 3D MATRIX</span>
          </div>
        }
        title="Kỹ năng chuyên môn"
        subtitle="Hệ sinh thái công nghệ & kiến trúc fullstack"
      />

      <div className="skills-liquid-layout">
        {/* Left Column: 3D Interactive Three.js Hub */}
        <div className="skills-3d-panel liquid-glass-panel">
          <div className="liquid-glass-glow-orb" />
          <div className="panel-header-bar">
            <span className="panel-status-indicator">LIVE ARCHITECTURE</span>
            <span className="panel-category-tag">
              {hoveredTech ? `${hoveredTech}` : (skills[activeCategoryIndex]?.category || 'Fullstack Stack')}
            </span>
          </div>

          <ThreeSkillsCanvas activeCategoryIndex={activeCategoryIndex} hoveredTech={hoveredTech} />

          <div className="skills-3d-stats">
            <div className="stats-glass-chip">
              <span className="stats-label">TOTAL TECH</span>
              <span className="stats-value">{totalTech}+</span>
            </div>
            <div className="stats-glass-chip">
              <span className="stats-label">SYSTEM LAYERS</span>
              <span className="stats-value">3 Tiers</span>
            </div>
            <div className="stats-glass-chip">
              <span className="stats-label">TOPOLOGY</span>
              <span className="stats-value">Exploded 3D</span>
            </div>
          </div>
        </div>

        {/* Right Column: Liquid Glass Interactive Cards */}
        <div className="skills-cards-column">
          {skills.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx
            return (
              <div
                key={idx}
                className={`liquid-glass-card ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategoryIndex(idx)}
                onMouseEnter={() => setActiveCategoryIndex(idx)}
              >
                <div className="card-ambient-light" />
                
                <div className="liquid-card-header">
                  <div className="card-icon-badge">
                    <span className="card-emoji">{categoryIcons[idx % categoryIcons.length]}</span>
                    <span className="card-index-tag">0{idx + 1}</span>
                  </div>
                  <div className="card-title-group">
                    <h3 className="liquid-category-title">{cat.category}</h3>
                  </div>
                </div>

                <div className="liquid-chips-grid">
                  {cat.items.map((item, sIdx) => {
                    const isHovered = hoveredTech === item
                    return (
                      <div
                        key={sIdx}
                        onMouseEnter={(e) => {
                          e.stopPropagation()
                          setActiveCategoryIndex(idx)
                          setHoveredTech(item)
                        }}
                        onMouseLeave={() => setHoveredTech(null)}
                        style={{ display: 'inline-block' }}
                      >
                        <Tag variant="pill" dot={true} className={isHovered ? 'tech-tag-highlight' : ''}>
                          {item}
                        </Tag>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
