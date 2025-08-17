"use client"

import { usePathname } from "next/navigation"
import type React from "react"

interface LayoutRouterProps {
  children: React.ReactNode
  consoleLayout: React.ReactNode
  defaultLayout: React.ReactNode
}

export function LayoutRouter({ consoleLayout, defaultLayout }: LayoutRouterProps) {
  const pathname = usePathname()
  const isConsole = pathname.startsWith("/console")

  return isConsole ? consoleLayout : defaultLayout
}
