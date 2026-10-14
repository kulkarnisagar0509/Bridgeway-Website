import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Handles scroll behavior across route + hash changes:
//  - hash present → smooth-scroll to the element (works from any page)
//  - no hash (pure route change) → jump to top
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Allow the new page to mount before looking up the target.
      const id = hash.slice(1)
      const scroll = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else window.scrollTo({ top: 0 })
      }
      const t = setTimeout(scroll, 60)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])

  return null
}