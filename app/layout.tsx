import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import TopNavbar from '@/components/layout/top-navbar';

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://healthcheck.sh"),
  title: "healthcheck.sh – Uptime & Performance Monitoring for Websites, APIs & AI Models",
  description: "healthcheck.sh is a powerful uptime and performance monitoring platform for websites, APIs, servers, and AI models. Get instant alerts, detailed reports, and ensure your systems stay healthy 24/7.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "healthcheck.sh – Uptime & Performance Monitoring for Websites, APIs & AI Models",
    description: "Monitor your websites, APIs, servers, and AI models with real-time alerts and detailed performance insights. Keep your systems healthy with healthcheck.sh.",
    url: "https://healthcheck.sh",
    siteName: "healthcheck.sh",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "healthcheck.sh – Uptime & Performance Monitoring",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "healthcheck.sh – Uptime & Performance Monitoring for Websites, APIs & AI Models",
    description: "Real-time uptime and performance monitoring for websites, APIs, servers, and AI models. Get alerts before your users notice issues.",
    images: ["/og-image.png"],
    creator: "@healthchecksh",
  },
  alternates: {
    canonical: "https://healthcheck.sh",
  },
  robots: {
    index: true,
    follow: true,
  },
  applicationName: "healthcheck.sh",
  keywords: [
    "uptime kuma alternative",
    "healthcheck",
    "uptime monitoring",
    "website monitoring",
    "API monitoring",
    "server monitoring",
    "AI model monitoring",
    "performance monitoring",
    "downtime alerts",
    "status page",
    "infrastructure monitoring",
  ],
  authors: [
    {
      name: "Raghunandhan V R",
      url: "https://github.com/raghunandhanvr",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col">
            <TopNavbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
