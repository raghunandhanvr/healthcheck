import { ArchiveIcon } from "@/components/ui/icons/archive"
import { ChartLineIcon } from "@/components/ui/icons/chart-line"
import { CircleDollarSignIcon } from "@/components/ui/icons/circle-dollar-sign"
import { CogIcon } from "@/components/ui/icons/cog"
import { HomeIcon } from "@/components/ui/icons/home"
import { LayersIcon } from "@/components/ui/icons/layers"
import { LockIcon } from "@/components/ui/icons/lock"
import { MonitorCheckIcon } from "@/components/ui/icons/monitor-check"
import { PenToolIcon } from "@/components/ui/icons/pen-tool"
import { TerminalIcon } from "@/components/ui/icons/terminal"
import { UserIcon } from "@/components/ui/icons/user"
import { UsersIcon } from "@/components/ui/icons/users"

export interface NavigationPage {
  title: string
  href: string
  icon: React.ComponentType<{ size?: number }>
  group: string
  requiresAuth?: boolean
}

export const navigationPages: NavigationPage[] = [
  // Marketing
  { title: "Home", href: "/", icon: HomeIcon, group: "Marketing", requiresAuth: false },
  {
    title: "Pricing",
    href: "/pricing",
    icon: CircleDollarSignIcon,
    group: "Marketing",
    requiresAuth: false,
  },

  // Auth
  { title: "Sign In", href: "/auth", icon: LockIcon, group: "Auth", requiresAuth: false },
  {
    title: "Forgot Password",
    href: "/auth/forgot-password",
    icon: LockIcon,
    group: "Auth",
    requiresAuth: false,
  },
  {
    title: "Reset Password",
    href: "/auth/reset-password",
    icon: LockIcon,
    group: "Auth",
    requiresAuth: false,
  },
  {
    title: "Two Factor",
    href: "/auth/two-factor",
    icon: LockIcon,
    group: "Auth",
    requiresAuth: false,
  },
  {
    title: "Verify Email",
    href: "/auth/verify-email",
    icon: LockIcon,
    group: "Auth",
    requiresAuth: false,
  },

  // Console
  { title: "Console", href: "/console", icon: TerminalIcon, group: "Console", requiresAuth: true },

  // Profile
  {
    title: "Profile",
    href: "/console/profile",
    icon: UserIcon,
    group: "Profile",
    requiresAuth: true,
  },

  // Organization
  {
    title: "Organization Projects",
    href: "/console/organization/projects",
    icon: LayersIcon,
    group: "Organization",
    requiresAuth: true,
  },
  {
    title: "Organization People",
    href: "/console/organization/people",
    icon: UsersIcon,
    group: "Organization",
    requiresAuth: true,
  },
  {
    title: "Organization Settings",
    href: "/console/organization/settings",
    icon: CogIcon,
    group: "Organization",
    requiresAuth: true,
  },
  {
    title: "Organization Billing",
    href: "/console/organization/billing",
    icon: CircleDollarSignIcon,
    group: "Organization",
    requiresAuth: true,
  },

  // Project
  {
    title: "Project Dashboard",
    href: "/console/project/dashboard",
    icon: ChartLineIcon,
    group: "Project",
    requiresAuth: true,
  },
  {
    title: "Project Editor",
    href: "/console/project/editor",
    icon: PenToolIcon,
    group: "Project",
    requiresAuth: true,
  },
  {
    title: "Project Monitoring",
    href: "/console/project/monitoring",
    icon: MonitorCheckIcon,
    group: "Project",
    requiresAuth: true,
  },
  {
    title: "Project Configurations",
    href: "/console/project/configurations",
    icon: CogIcon,
    group: "Project",
    requiresAuth: true,
  },
  {
    title: "Project Backups",
    href: "/console/project/backups",
    icon: ArchiveIcon,
    group: "Project",
    requiresAuth: true,
  },
  {
    title: "Project Settings",
    href: "/console/project/settings",
    icon: CogIcon,
    group: "Project",
    requiresAuth: true,
  },
]
