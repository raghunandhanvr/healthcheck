"use client"

import { ChevronLeftIcon } from "@/components/ui/icons/chevron-left"
import { ChevronRightIcon } from "@/components/ui/icons/chevron-right"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSidebarContext } from "@/lib/providers/sidebar-provider"
import Link from "next/link"

export function ConsoleSidebar() {
  const { menuItems, currentPath } = useSidebarContext()
  const { state, setOpenMobile } = useSidebar()
  const isMobile = useIsMobile()

  return (
    <Sidebar
      variant="sidebar"
      side="left"
      collapsible="icon"
      className="console-sidebar-fn"
      data-state={state}
    >
      <SidebarContent className="console-sidebar-content-fn">
        <SidebarMenu className="console-sidebar-menu-fn">
          {menuItems.map(item => {
            const Icon = item.icon
            const isActive = currentPath === item.href

            return (
              <SidebarMenuItem key={item.id} className="console-sidebar-menu-item-fn">
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={state === "collapsed" ? item.label : undefined}
                  className={`console-sidebar-menu-button-fn ${isActive ? "active" : ""}`}
                >
                  <Link
                    href={item.href}
                    className="console-sidebar-link-fn"
                    onClick={() => isMobile && setOpenMobile(false)}
                  >
                    <Icon
                      size={14}
                      className={`console-sidebar-menu-icon-fn ${isActive ? "active-icon" : "inactive-icon"}`}
                    />
                    <span
                      className={`console-sidebar-menu-label ${isActive ? "active-text" : "inactive-text"} ${state === "collapsed" && !isMobile ? "sr-only" : ""}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="console-sidebar-footer-fn">
        <div className="console-sidebar-collapse-section">
          <SidebarTrigger className="console-sidebar-collapse-button">
            {state === "collapsed" ? <ChevronRightIcon size={14} /> : <ChevronLeftIcon size={14} />}
            <span
              className={`console-sidebar-collapse-text ${state === "collapsed" && !isMobile ? "sr-only" : ""}`}
            >
              {state === "collapsed" ? "Expand" : "Collapse"}
            </span>
          </SidebarTrigger>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
