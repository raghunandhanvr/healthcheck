import { ConsoleLayout } from "@/components/layout/console-layout"
import TopNavbar from "@/components/layout/top-navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarProvider as ConsoleSidebarProvider } from "@/lib/providers/sidebar-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard – Data Atmos",
  description:
    "Your Data Atmos management dashboard. Manage datastores, view performance metrics, configure AI workloads, and optimize your data operations.",
  openGraph: {
    title: "Dashboard – Data Atmos",
    description:
      "Your Data Atmos management dashboard. Manage datastores, view performance metrics, configure AI workloads, and optimize your data operations.",
    url: "https://dataatmos.ai/console",
  },
  twitter: {
    title: "Dashboard – Data Atmos",
    description:
      "Your Data Atmos management dashboard. Manage datastores, view performance metrics, configure AI workloads, and optimize your data operations.",
  },
  alternates: {
    canonical: "https://dataatmos.ai/console",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ConsoleSidebarProvider>
      <SidebarProvider>
        <div className="h-full flex flex-col">
          <TopNavbar />
          <div className="flex-1 flex overflow-hidden">
            <ConsoleLayout>{children}</ConsoleLayout>
          </div>
        </div>
      </SidebarProvider>
    </ConsoleSidebarProvider>
  )
}
