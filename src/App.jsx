import React from 'react'
import './App.css'
import { portfolioData } from './data/portfolioData'
import { NavigationProvider } from './context/NavigationContext'
import { useScrollSpy } from './hooks/useScrollSpy'
import Navbar from './components/layout/Navbar'
import SideNavigator from './components/layout/SideNavigator'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'

function PortfolioContent() {
  // Lắng nghe vị trí viewport để tự động cập nhật activeSection trong NavigationContext
  useScrollSpy()

  return (
    <div className="app-wrapper">
      <Navbar personalInfo={portfolioData.personal} />
      <SideNavigator />
      
      <main>
        <Hero personalInfo={portfolioData.personal} />
        <About personalInfo={portfolioData.personal} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Experience experience={portfolioData.experience} />
        <Contact contactInfo={portfolioData.contact} />
      </main>

      <Footer personalInfo={portfolioData.personal} />
    </div>
  )
}

export default function App() {
  return (
    <NavigationProvider>
      <PortfolioContent />
    </NavigationProvider>
  )
}