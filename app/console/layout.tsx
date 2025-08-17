import { LayoutWrapper } from "@/components/layout/layout-wrapper"
import { ConsoleLayout } from "@/components/layout/console-layout"
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
    <LayoutWrapper isConsole>
      <ConsoleLayout>{children}</ConsoleLayout>
    </LayoutWrapper>
  )
}
