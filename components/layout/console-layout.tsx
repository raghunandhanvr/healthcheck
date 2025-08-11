"use client"

import type React from "react"

import { SidebarInset } from "@/components/ui/sidebar"
import { ConsoleSidebar } from "./console-sidebar"

interface ConsoleLayoutProps {
  children: React.ReactNode
}

export function ConsoleLayout({ children }: ConsoleLayoutProps) {
  return (
    <>
      <ConsoleSidebar />
      <SidebarInset className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 flex flex-col min-h-0 w-full">
          <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 w-full">{children}</div>
        </main>
      </SidebarInset>
    </>
  )
}
