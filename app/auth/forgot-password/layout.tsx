import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password – Data Atmos",
  description:
    "Reset your Data Atmos account password. Enter your email address to receive a secure password reset link.",
  openGraph: {
    title: "Forgot Password – Data Atmos",
    description:
      "Reset your Data Atmos account password. Enter your email address to receive a secure password reset link.",
    url: "https://dataatmos.ai/auth/forgot-password",
  },
  twitter: {
    title: "Forgot Password – Data Atmos",
    description:
      "Reset your Data Atmos account password. Enter your email address to receive a secure password reset link.",
  },
  alternates: {
    canonical: "https://dataatmos.ai/auth/forgot-password",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return children
}
