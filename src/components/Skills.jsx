import React from 'react'

export default function Skills({ skills }) {
  return (
    <section id="skills" className="section-fullscreen">
      <div className="section-content">
        <div className="section-header-compact">
          <div className="section-label">02. TECH STACK</div>
          <h2 className="section-title">Kỹ năng chuyên môn</h2>
          <p className="section-subtitle">Các công nghệ chính yếu được áp dụng vào xây dựng sản phẩm.</p>
        </div>

        <div className="skills-grid-compact">
          {skills.map((cat, idx) => (
            <div key={idx} className="dashed-box dashed-box-corner skill-category-card">
              <h3 className="skill-category-title">
                <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>[{idx + 1}]</span>
                <span>{cat.category}</span>
              </h3>

              <div className="skill-chips-container">
                {cat.items.map((item, sIdx) => (
                  <span key={sIdx} className="skill-chip-compact">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
