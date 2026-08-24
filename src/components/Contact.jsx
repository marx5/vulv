import React, { useState } from 'react'

export default function Contact({ contactInfo }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setIsSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
    }, 2000)
  }

  return (
    <section id="contact" className="section-fullscreen">
      <div className="section-content">
        <div className="section-header-compact">
          <div className="section-label">05. CONTACT</div>
          <h2 className="section-title">Liên hệ hợp tác</h2>
          <p className="section-subtitle">Gửi tin nhắn hoặc liên hệ trực tiếp để bắt đầu trao đổi dự án.</p>
        </div>

        <div className="contact-grid-compact">
          <div className="dashed-box dashed-box-corner contact-info-card">
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                {contactInfo.heading}
              </h3>
              <p className="contact-info-desc">{contactInfo.subheading}</p>

              <div className="contact-items-list">
                <div className="contact-item">
                  <div className="contact-item-icon">@</div>
                  <div>
                    <div className="contact-item-label">Email</div>
                    <div className="contact-item-value">{contactInfo.email}</div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">📍</div>
                  <div>
                    <div className="contact-item-label">Địa điểm</div>
                    <div className="contact-item-value">{contactInfo.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.2rem' }}>
              <span className="dashed-tag">● Phản hồi nhanh trong 24h</span>
            </div>
          </div>

          <div className="dashed-box dashed-box-corner contact-form-card">
            <form className="contact-form" onSubmit={handleSubmit}>
              {isSubmitted ? (
                <div className="form-success-banner">
                  <span>✓</span> Cảm ơn bạn! Tin nhắn đã được gửi thành công.
                </div>
              ) : null}

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
                ></textarea>
              </div>

              <button type="submit" className="dashed-btn dashed-btn-primary" style={{ marginTop: '0.3rem' }}>
                <span>Gửi tin nhắn ✉</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
