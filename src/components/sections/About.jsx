import React from 'react'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'

export default function About({ personalInfo }) {
  return (
    <Section id="about">
      <Section.Header 
        label="01. ABOUT ME"
        title="Giới thiệu bản thân"
        subtitle="Tập trung vào hiệu năng, trải nghiệm người dùng và mã nguồn chất lượng cao."
      />

      <div className="about-grid-compact">
        <Card className="about-info-box">
          <div>
            <p className="about-text">
              Tôi là một lập trình viên Fullstack đam mê giải quyết các bài toán kỹ thuật thực tế. Định hướng phát triển phần mềm chú trọng vào tính ổn định, giao diện mượt mà và tối ưu hóa hệ thống.
            </p>
          </div>

          <ul className="about-details-list">
            <li className="about-detail-item">
              <span>Họ tên:</span> {personalInfo?.name}
            </li>
            <li className="about-detail-item">
              <span>Địa điểm:</span> {personalInfo?.location}
            </li>
            <li className="about-detail-item">
              <span>Email:</span> {personalInfo?.email}
            </li>
            <li className="about-detail-item">
              <span>Trạng thái:</span> Sẵn sàng
            </li>
          </ul>
        </Card>

        <div className="stats-grid-compact">
          {personalInfo?.stats?.map((item) => (
            <Card key={item.id} className="stat-card-compact">
              <div className="stat-number">{item.number}</div>
              <div className="stat-label">{item.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
