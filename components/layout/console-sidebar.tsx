"use client"

import { PanelLeftCloseIcon } from "@/components/ui/icons/panel-left-close"
import { PanelLeftOpenIcon } from "@/components/ui/icons/panel-left-open"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSidebarContext } from "@/lib/providers/sidebar-provider"
import Link from "next/link"

export function ConsoleSidebar() {
  const { menuItems, currentPath } = useSidebarContext()
  const { state, setOpenMobile, toggleSidebar } = useSidebar()
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
        <SidebarSeparator className="mx-0 w-full" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={state === "collapsed" ? "Expand Menu" : undefined}
              className="console-sidebar-collapse-button hover:bg-transparent hover:text-current transition-none"
              onClick={toggleSidebar}
            >
              {state === "collapsed" ? (
                <PanelLeftOpenIcon size={14} className="pointer-events-none" />
              ) : (
                <PanelLeftCloseIcon size={14} className="pointer-events-none" />
              )}
              <span
                className={`console-sidebar-collapse-text ${state === "collapsed" && !isMobile ? "sr-only" : ""}`}
              >
                {state === "collapsed" ? "Expand Menu" : "Collapse Menu"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
