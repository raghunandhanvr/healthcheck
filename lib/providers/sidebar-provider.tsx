"use client"

import React, { createContext, useContext, useState } from "react"
import { usePathname } from "next/navigation"
import { SidebarContextType, SidebarProviderProps } from "@/lib/interface/sidebar"
import { getSidebarItems } from "@/lib/configs/sidebar-config"

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebarContext() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider")
  }
  return context
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const isConsoleRoute = pathname.startsWith("/console")
  const menuItems = getSidebarItems(pathname)

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        menuItems,
        currentPath: pathname,
        isConsoleRoute,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
