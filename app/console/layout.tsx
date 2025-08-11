import type { Metadata } from "next";
import { ConsoleLayout } from '@/components/layout/console-layout'

export const metadata: Metadata = {
  title: "Dashboard – healthcheck.sh",
  description: "Your healthcheck.sh monitoring dashboard. Manage uptime monitors, view performance metrics, configure alerts, and keep your services healthy 24/7.",
  openGraph: {
    title: "Dashboard – healthcheck.sh",
    description: "Your healthcheck.sh monitoring dashboard. Manage uptime monitors, view performance metrics, configure alerts, and keep your services healthy 24/7.",
    url: "https://healthcheck.sh/console",
  },
  twitter: {
    title: "Dashboard – healthcheck.sh",
    description: "Your healthcheck.sh monitoring dashboard. Manage uptime monitors, view performance metrics, configure alerts, and keep your services healthy 24/7.",
  },
  alternates: {
    canonical: "https://healthcheck.sh/console",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConsoleLayout>
      {children}
    </ConsoleLayout>
  );
}
