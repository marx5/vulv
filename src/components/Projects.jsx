import React from 'react'

export default function Projects({ projects }) {
  return (
    <section id="projects" className="section-fullscreen">
      <div className="section-content">
        <div className="section-header-compact">
          <div className="section-label">03. PROJECTS</div>
          <h2 className="section-title">Dự án tiêu biểu</h2>
          <p className="section-subtitle">Sản phẩm phần mềm thực tế với kiến trúc tối ưu.</p>
        </div>

        <div className="projects-grid-compact">
          {projects.map((project) => (
            <div key={project.id} className="dashed-box dashed-box-corner project-card-compact">
              <div>
                <span className="project-category">// {project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc-compact">{project.description}</p>
              </div>

              <div>
                <div className="project-tech-tags">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="dashed-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-footer-links">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="dashed-btn"
                    style={{ padding: '5px 10px', fontSize: '0.75rem', flex: 1 }}
                  >
                    Code ↗
                  </a>
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="dashed-btn dashed-btn-primary"
                    style={{ padding: '5px 10px', fontSize: '0.75rem', flex: 1 }}
                  >
                    Demo ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
