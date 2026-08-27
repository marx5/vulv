import React from 'react'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'
import { Tag } from '../ui/Tag'

export default function Experience({ experience = [] }) {
  return (
    <Section id="experience">
      <Section.Header
        label="04. EXPERIENCE"
        title="Kinh nghiệm làm việc"
        subtitle="Chặng đường phát triển và đóng góp trong ngành phần mềm."
      />

      <div className="timeline-grid-compact">
        {experience.map((item) => (
          <Card key={item.id} className="timeline-card-compact">
            <div className="timeline-period-badge">
              <Tag>{item.period}</Tag>
            </div>
            
            <h3 className="timeline-role">{item.role}</h3>
            <div className="timeline-company">@ {item.company}</div>

            <p className="timeline-desc-compact">{item.description}</p>

            <div className="timeline-tags">
              {item.tags?.map((tag, idx) => (
                <Tag key={idx} style={{ fontSize: '0.68rem' }}>
                  #{tag}
                </Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
