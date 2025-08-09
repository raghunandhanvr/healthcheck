import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Settings – healthcheck.sh",
  description: "Manage your healthcheck.sh account profile, notification preferences, security settings, and billing information.",
  openGraph: {
    title: "Profile Settings – healthcheck.sh",
    description: "Manage your healthcheck.sh account profile, notification preferences, security settings, and billing information.",
    url: "https://healthcheck.sh/console/profile",
  },
  twitter: {
    title: "Profile Settings – healthcheck.sh",
    description: "Manage your healthcheck.sh account profile, notification preferences, security settings, and billing information.",
  },
  alternates: {
    canonical: "https://healthcheck.sh/console/profile",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
