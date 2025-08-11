"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarProvider as ConsoleSidebarProvider } from "@/lib/providers/sidebar-provider"
import TopNavbar from "./top-navbar"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isConsole = pathname.startsWith("/console")

  if (isConsole) {
    return (
      <ConsoleSidebarProvider>
        <SidebarProvider>
          <div className="min-h-screen w-full flex flex-col">
            <TopNavbar />
            <div className="flex-1 flex w-full">{children}</div>
          </div>
        </SidebarProvider>
      </ConsoleSidebarProvider>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <TopNavbar />
      <div className="flex-1">{children}</div>
    </div>
  )
}
