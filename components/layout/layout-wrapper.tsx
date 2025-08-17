import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarProvider as ConsoleSidebarProvider } from "@/lib/providers/sidebar-provider"
import type React from "react"
import { LayoutRouter } from "./layout-router"
import TopNavbar from "./top-navbar"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const consoleLayout = (
    <ConsoleSidebarProvider>
      <SidebarProvider>
        <div className="min-h-screen w-full flex flex-col">
          <TopNavbar />
          <div className="flex-1 flex w-full">{children}</div>
        </div>
      </SidebarProvider>
    </ConsoleSidebarProvider>
  )

  const defaultLayout = (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <TopNavbar />
      <div className="flex-1">{children}</div>
    </div>
  )

  return (
    <LayoutRouter consoleLayout={consoleLayout} defaultLayout={defaultLayout}>
      {children}
    </LayoutRouter>
  )
}
