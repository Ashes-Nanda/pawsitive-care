import { useEffect, useState } from "react"

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
}

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}

export const useResponsive = () => {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.sm})`)
  const isTablet = useMediaQuery(`(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.lg})`)
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg})`)

  return {
    isMobile,
    isTablet,
    isDesktop,
  }
}

export const getResponsiveValue = <T>(values: {
  mobile?: T
  tablet?: T
  desktop?: T
  default: T
}): T => {
  const { isMobile, isTablet, isDesktop } = useResponsive()

  if (isMobile && values.mobile !== undefined) return values.mobile
  if (isTablet && values.tablet !== undefined) return values.tablet
  if (isDesktop && values.desktop !== undefined) return values.desktop
  return values.default
} 