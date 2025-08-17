import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile Settings – Data Atmos",
  description:
    "Manage your Data Atmos account profile, notification preferences, security settings, and billing information.",
  openGraph: {
    title: "Profile Settings – Data Atmos",
    description:
      "Manage your Data Atmos account profile, notification preferences, security settings, and billing information.",
    url: "https://dataatmos.com/console/profile",
  },
  twitter: {
    title: "Profile Settings – Data Atmos",
    description:
      "Manage your Data Atmos account profile, notification preferences, security settings, and billing information.",
  },
  alternates: {
    canonical: "https://dataatmos.com/console/profile",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children
}
