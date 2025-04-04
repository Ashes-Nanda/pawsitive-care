import React, { useEffect, useRef } from "react"

export const useFocusTrap = (isActive: boolean = true) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return

    const container = containerRef.current
    if (!container) return

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = focusableElements[0] as HTMLElement
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus()
          e.preventDefault()
        }
      }
    }

    container.addEventListener("keydown", handleKeyDown)
    return () => container.removeEventListener("keydown", handleKeyDown)
  }, [isActive])

  return containerRef
}

export const AriaLive: React.FC<{
  message: string
  priority?: "polite" | "assertive"
}> = ({ message, priority = "polite" }) => {
  const ariaLiveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ariaLiveRef.current) {
      ariaLiveRef.current.textContent = message
    }
  }, [message])

  return (
    <div
      ref={ariaLiveRef}
      aria-live={priority}
      className="sr-only"
      role="status"
    />
  )
}

export const useKeyboardNavigation = (
  onKeyDown: (e: KeyboardEvent) => void,
  deps: any[] = []
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      onKeyDown(e)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, deps)
}

export const getAriaLabel = (label: string, required?: boolean) => {
  return required ? `${label} (required)` : label
}

export const getAriaDescribedBy = (error?: string, description?: string) => {
  const ids: string[] = []
  if (error) ids.push("error")
  if (description) ids.push("description")
  return ids.length > 0 ? ids.join(" ") : undefined
} 