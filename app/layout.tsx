import { ApiErrorHandler } from "@/components/api-error-handler"
import { CommandPalette } from "@/components/command-palette"
import { ShortcutsHandler } from "@/components/shortcuts-handler"
import { Toaster } from "@/components/ui/sonner"
import { SidebarProvider } from "@/lib/providers/sidebar-provider"
import { ThemeProvider } from "@/lib/providers/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://dataatmos.ai"),
  title: "Data Atmos – OLTP, OLAP, and AI Orchestration Platform",
  description:
    "Data Atmos makes OLTP, OLAP, and AI orchestration easier with serverless datastores, real-time analytics, and modular GPU pods. Transform your data operations with our comprehensive platform.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Data Atmos – OLTP, OLAP, and AI Orchestration Platform",
    description:
      "Transform your data operations with serverless datastores, real-time analytics, and AI orchestration. Control plane for OLTP, OLAP, and AI workloads.",
    url: "https://dataatmos.ai",
    siteName: "Data Atmos",
    images: [
      {
        url: "https://raghu.app/api/og?title=Data+Atmos:+The+single+platform+for+all+your+data+needs",
        width: 1200,
        height: 630,
        alt: "Data Atmos – OLTP, OLAP, and AI Orchestration Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Atmos – OLTP, OLAP, and AI Orchestration Platform",
    description:
      "Transform your data operations with serverless datastores, real-time analytics, and AI orchestration. OLTP, OLAP, and AI made simple.",
    images: [
      "https://raghu.app/api/og?title=Data+Atmos:+The+single+platform+for+all+your+data+needs",
    ],
    creator: "@dataatmos",
  },
  alternates: {
    canonical: "https://dataatmos.ai",
  },
  robots: {
    index: true,
    follow: true,
  },
  applicationName: "Data Atmos",
  keywords: [
    "OLTP",
    "OLAP",
    "AI orchestration",
    "serverless databases",
    "data platform",
    "real-time analytics",
    "GPU pods",
    "data ops",
    "database management",
    "AI training",
    "data warehouse",
    "CDC streams",
  ],
  authors: [
    {
      name: "Raghunandhan V R",
      url: "https://github.com/raghunandhanvr",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <ApiErrorHandler />
            <div className="h-full flex flex-col bg-background">{children}</div>
            <CommandPalette />
            <ShortcutsHandler />
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
