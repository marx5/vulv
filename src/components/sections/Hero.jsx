import React from 'react'
import { useNavigation } from '../../hooks/useNavigation'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Tag } from '../ui/Tag'

export default function Hero({ personalInfo }) {
  const { scrollTo } = useNavigation()

  const handleNav = (e, targetId) => {
    e.preventDefault()
    scrollTo(targetId)
  }

  return (
    <Section id="hero">
      <Card className="hero-main-box">
        <div className="hero-status">
          <span className="hero-status-dot" />
          <Tag>{personalInfo?.status || 'Sẵn sàng'}</Tag>
        </div>

        <p className="hero-greeting">// Xin chào, tôi là</p>
        <h1 className="hero-name">{personalInfo?.name}</h1>
        <p className="hero-role">&lt;{personalInfo?.role} /&gt;</p>

        <p className="hero-bio">{personalInfo?.bio}</p>

        <div className="hero-actions">
          <Button 
            as="a"
            href="#projects" 
            variant="primary"
            onClick={(e) => handleNav(e, 'projects')}
          >
            <span>Xem dự án</span>
            <span>↓</span>
          </Button>

          <Button 
            as="a"
            href="#contact" 
            variant="default"
            onClick={(e) => handleNav(e, 'contact')}
          >
            <span>Liên hệ</span>
            <span>→</span>
          </Button>
        </div>
      </Card>
    </Section>
  )
}
