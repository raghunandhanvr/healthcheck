"use client"

import { useSession } from "@/lib/auth/auth-client"
import { shortcuts } from "@/lib/configs/shortcuts"
import { useSidebarContext } from "@/lib/providers/sidebar-provider"
import { useEffect } from "react"

export function ShortcutsHandler() {
  const { data: session } = useSession()
  const { setIsCollapsed, isCollapsed } = useSidebarContext()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isAuthenticated = !!session?.user

      for (const shortcut of shortcuts) {
        const metaPressed = shortcut.metaKey ? e.metaKey : true
        const ctrlPressed = shortcut.ctrlKey ? e.ctrlKey : true
        const keyMatches = e.key === shortcut.key

        if (keyMatches && metaPressed && ctrlPressed) {
          if (shortcut.requiresAuth && !isAuthenticated) {
            continue
          }

          e.preventDefault()

          switch (shortcut.action) {
            case "TOGGLE_SIDEBAR":
              setIsCollapsed(!isCollapsed)
              break
            default:
              break
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [session, setIsCollapsed, isCollapsed])

  return null
}
