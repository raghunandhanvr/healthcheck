import { CircleDollarSignIcon } from "@/components/ui/icons/circle-dollar-sign"
import { CogIcon } from "@/components/ui/icons/cog"
import { FileTextIcon } from "@/components/ui/icons/file-text"
import { FoldersIcon } from "@/components/ui/icons/folders"
import { MonitorCheckIcon } from "@/components/ui/icons/monitor-check"
import { SettingsIcon } from "@/components/ui/icons/settings"
import { SquareActivityIcon } from "@/components/ui/icons/square-activity"
import { SquareStackIcon } from "@/components/ui/icons/square-stack"
import { UsersIcon } from "@/components/ui/icons/users"
import { SidebarConfig } from "@/lib/interface/sidebar"

export const SIDEBAR_CONFIG: SidebarConfig = {
  "/console/organization": [
    {
      id: "projects",
      label: "Projects",
      icon: FoldersIcon,
      href: "/console/organization/projects",
    },
    {
      id: "people",
      label: "People",
      icon: UsersIcon,
      href: "/console/organization/people",
    },
    {
      id: "billing",
      label: "Billing",
      icon: CircleDollarSignIcon,
      href: "/console/organization/billing",
    },
    {
      id: "settings",
      label: "Settings",
      icon: CogIcon,
      href: "/console/organization/settings",
    },
  ],
  "/console/project": [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: SquareActivityIcon,
      href: "/console/project/dashboard",
    },
    {
      id: "settings",
      label: "Settings",
      icon: SettingsIcon,
      href: "/console/project/settings",
    },
    {
      id: "configurations",
      label: "Configurations",
      icon: SettingsIcon,
      href: "/console/project/configurations",
    },
    {
      id: "monitoring",
      label: "Monitoring",
      icon: MonitorCheckIcon,
      href: "/console/project/monitoring",
    },
    {
      id: "editor",
      label: "Editor",
      icon: FileTextIcon,
      href: "/console/project/editor",
    },
    {
      id: "backups",
      label: "Backups",
      icon: SquareStackIcon,
      href: "/console/project/backups",
    },
  ],
  "/console/profile": [
    {
      id: "projects",
      label: "Projects",
      icon: FoldersIcon,
      href: "/console/organization/projects",
    },
    {
      id: "profile-settings",
      label: "Profile Settings",
      icon: CogIcon,
      href: "/console/profile",
    },
  ],
}

export function getSidebarItems(pathname: string) {
  if (pathname.startsWith("/console/organization/")) {
    return SIDEBAR_CONFIG["/console/organization"] || []
  }

  if (pathname.startsWith("/console/project/")) {
    return SIDEBAR_CONFIG["/console/project"] || []
  }

  if (pathname.startsWith("/console/profile")) {
    return SIDEBAR_CONFIG["/console/profile"] || []
  }

  if (pathname.match(/^\/console\/[^\/]+$/) && !pathname.includes("/profile")) {
    return SIDEBAR_CONFIG["/console/organization"] || []
  }

  return []
}
