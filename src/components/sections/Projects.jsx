import React from 'react'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Tag } from '../ui/Tag'

export default function Projects({ projects = [] }) {
  return (
    <Section id="projects">
      <Section.Header
        label="03. PROJECTS"
        title="Dự án tiêu biểu"
        subtitle="Sản phẩm phần mềm thực tế với kiến trúc tối ưu."
      />

      <div className="projects-grid-compact">
        {projects.map((project) => (
          <Card key={project.id} className="project-card-compact">
            <div>
              <span className="project-category">// {project.category}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc-compact">{project.description}</p>
            </div>

            <div>
              <div className="project-tech-tags">
                {project.techStack?.map((tech, i) => (
                  <Tag key={i}>{tech}</Tag>
                ))}
              </div>

              <div className="project-footer-links">
                {project.githubUrl && (
                  <Button
                    as="a"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="default"
                    style={{ padding: '5px 10px', fontSize: '0.75rem', flex: 1 }}
                  >
                    Code ↗
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    as="a"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    style={{ padding: '5px 10px', fontSize: '0.75rem', flex: 1 }}
                  >
                    Demo ↗
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
