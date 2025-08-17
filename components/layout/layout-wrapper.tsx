import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarProvider as ConsoleSidebarProvider } from "@/lib/providers/sidebar-provider"
import type React from "react"
import TopNavbar from "./top-navbar"

interface LayoutWrapperProps {
  children: React.ReactNode
  isConsole?: boolean
}

export function LayoutWrapper({ children, isConsole = false }: LayoutWrapperProps) {
  if (isConsole) {
    return (
      <ConsoleSidebarProvider>
        <SidebarProvider>
          <div className="h-full flex flex-col">
            <TopNavbar />
            <div className="flex-1 flex overflow-hidden">{children}</div>
          </div>
        </SidebarProvider>
      </ConsoleSidebarProvider>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <TopNavbar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
