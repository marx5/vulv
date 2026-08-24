import React, { useState, useEffect } from 'react'
import './App.css'
import { portfolioData } from './data/portfolioData'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SideNavigator from './components/SideNavigator'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.1,
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(id)
    }
  }

  return (
    <div className="app-wrapper">
      <Navbar 
        personalInfo={portfolioData.personal} 
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      <SideNavigator 
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      <main>
        <Hero personalInfo={portfolioData.personal} onNavigate={scrollToSection} />
        <About personalInfo={portfolioData.personal} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Experience experience={portfolioData.experience} />
        <Contact contactInfo={portfolioData.contact} />
      </main>
      <Footer personalInfo={portfolioData.personal} onNavigate={scrollToSection} />
    </div>
  )
}

export default App