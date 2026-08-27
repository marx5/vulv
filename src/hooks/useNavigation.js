import { use } from 'react'
import { NavigationContext } from '../context/NavigationContext'

/**
 * Hook để truy cập NavigationContext (sử dụng React 19 use API)
 */
export function useNavigation() {
  const context = use(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
