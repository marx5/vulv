import { useEffect } from 'react'
import { useNavigation } from './useNavigation'

/**
 * Hook tự động lắng nghe vị trí viewport qua IntersectionObserver
 * để cập nhật activeSection trong NavigationContext
 */
export function useScrollSpy(sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']) {
  const { setActiveSection } = useNavigation()

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
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
  }, [sectionIds, setActiveSection])
}
