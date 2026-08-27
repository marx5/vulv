import React, { createContext, useState, useCallback, useMemo } from 'react'

export const NavigationContext = createContext(null)

export const NAV_SECTIONS = [
  { id: 'hero', label: 'Trang chủ', href: '#hero' },
  { id: 'about', label: 'Giới thiệu', href: '#about' },
  { id: 'skills', label: 'Kỹ năng', href: '#skills' },
  { id: 'projects', label: 'Dự án', href: '#projects' },
  { id: 'experience', label: 'Kinh nghiệm', href: '#experience' },
  { id: 'contact', label: 'Liên hệ', href: '#contact' },
]

export function NavigationProvider({ children, initialSection = 'hero' }) {
  const [activeSection, setActiveSection] = useState(initialSection)

  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(id)
    }
  }, [])

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      scrollTo,
      sections: NAV_SECTIONS,
    }),
    [activeSection, scrollTo]
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
