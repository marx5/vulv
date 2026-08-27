import React from 'react'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Tag } from '../ui/Tag'
import { useContactForm } from '../../hooks/useContactForm'
import Footer from '../layout/Footer'

export default function Contact({ contactInfo, personalInfo }) {
  const { 
    formData, 
    errors, 
    serverError, 
    isSubmitted, 
    isSubmitting, 
    handleChange, 
    handleSubmit 
  } = useContactForm()

  return (
    <Section id="contact" className="contact-section-container">
      <div className="contact-main-flow">
        <Section.Header
          label="05. CONTACT"
          title="Liên hệ hợp tác"
          subtitle="Gửi tin nhắn hoặc liên hệ trực tiếp để bắt đầu trao đổi dự án."
        />

        <div className="contact-grid-compact">
          <Card className="contact-info-card">
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                {contactInfo?.heading}
              </h3>
              <p className="contact-info-desc">{contactInfo?.subheading}</p>

              <div className="contact-items-list">
                <div className="contact-item">
                  <div className="contact-item-icon">@</div>
                  <div>
                    <div className="contact-item-label">Email</div>
                    <div className="contact-item-value">{contactInfo?.email}</div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">📍</div>
                  <div>
                    <div className="contact-item-label">Địa điểm</div>
                    <div className="contact-item-value">{contactInfo?.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.2rem' }}>
              <Tag>● Phản hồi nhanh trong 24h</Tag>
            </div>
          </Card>

          <Card className="contact-form-card">
            <form className="contact-form" onSubmit={handleSubmit}>
              {isSubmitted && (
                <div className="form-success-banner">
                  <span>✓</span> Cảm ơn bạn! Tin nhắn đã được gửi thành công.
                </div>
              )}

              {serverError && (
                <div className="form-success-banner" style={{ borderColor: '#ef4444', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }}>
                  <span>⚠</span> {serverError}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">// Tên của bạn *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  className="dashed-input"
                  placeholder="Nguyễn Văn A"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span style={{ color: '#ef4444', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">// Email liên hệ *</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  className="dashed-input"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span style={{ color: '#ef4444', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">// Tin nhắn *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  className="dashed-textarea"
                  placeholder="Nội dung cần trao đổi..."
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && <span style={{ color: '#ef4444', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>{errors.message}</span>}
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                disabled={isSubmitting}
                style={{ marginTop: '0.3rem', opacity: isSubmitting ? 0.7 : 1 }}
              >
                <span>{isSubmitting ? 'Đang gửi... ⏳' : 'Gửi tin nhắn ✉'}</span>
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <Footer personalInfo={personalInfo} />
    </Section>
  )
}
