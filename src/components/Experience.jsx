import React from 'react'

export default function Experience({ experience }) {
  return (
    <section id="experience" className="section-fullscreen">
      <div className="section-content">
        <div className="section-header-compact">
          <div className="section-label">04. EXPERIENCE</div>
          <h2 className="section-title">Kinh nghiệm làm việc</h2>
          <p className="section-subtitle">Chặng đường phát triển và đóng góp trong ngành phần mềm.</p>
        </div>

        <div className="timeline-grid-compact">
          {experience.map((item) => (
            <div key={item.id} className="dashed-box dashed-box-corner timeline-card-compact">
              <div className="timeline-period-badge">
                <span className="dashed-tag">{item.period}</span>
              </div>
              
              <h3 className="timeline-role">{item.role}</h3>
              <div className="timeline-company">@ {item.company}</div>

              <p className="timeline-desc-compact">{item.description}</p>

              <div className="timeline-tags">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="dashed-tag" style={{ fontSize: '0.68rem' }}>
                    #{tag}
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
