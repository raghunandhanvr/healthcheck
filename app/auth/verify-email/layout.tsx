import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Verify Email – Data Atmos",
  description:
    "Verify your email address to complete your Data Atmos account setup and start managing your data operations.",
  openGraph: {
    title: "Verify Email – Data Atmos",
    description:
      "Verify your email address to complete your Data Atmos account setup and start managing your data operations.",
    url: "https://dataatmos.ai/auth/verify-email",
  },
  twitter: {
    title: "Verify Email – Data Atmos",
    description:
      "Verify your email address to complete your Data Atmos account setup and start managing your data operations.",
  },
  alternates: {
    canonical: "https://dataatmos.ai/auth/verify-email",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function VerifyEmailLayout({ children }: { children: React.ReactNode }) {
  return children
}
