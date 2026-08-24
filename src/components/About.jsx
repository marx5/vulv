import React from 'react'

export default function About({ personalInfo }) {
  return (
    <section id="about" className="section-fullscreen">
      <div className="section-content">
        <div className="section-header-compact">
          <div className="section-label">01. ABOUT ME</div>
          <h2 className="section-title">Giới thiệu bản thân</h2>
          <p className="section-subtitle">Tập trung vào hiệu năng, trải nghiệm người dùng và mã nguồn chất lượng cao.</p>
        </div>

        <div className="about-grid-compact">
          <div className="dashed-box dashed-box-corner about-info-box">
            <div>
              <p className="about-text">
                Tôi là một lập trình viên Fullstack đam mê giải quyết các bài toán kỹ thuật thực tế. Định hướng phát triển phần mềm chú trọng vào tính ổn định, giao diện mượt mà và tối ưu hóa hệ thống.
              </p>
            </div>

            <ul className="about-details-list">
              <li className="about-detail-item">
                <span>Họ tên:</span> {personalInfo.name}
              </li>
              <li className="about-detail-item">
                <span>Địa điểm:</span> {personalInfo.location}
              </li>
              <li className="about-detail-item">
                <span>Email:</span> {personalInfo.email}
              </li>
              <li className="about-detail-item">
                <span>Trạng thái:</span> Sẵn sàng
              </li>
            </ul>
          </div>

          <div className="stats-grid-compact">
            {personalInfo.stats.map((item) => (
              <div key={item.id} className="dashed-box dashed-box-corner stat-card-compact">
                <div className="stat-number">{item.number}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
