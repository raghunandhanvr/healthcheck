import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password – Data Atmos",
  description: "Create a new password for your Data Atmos account. Choose a strong, secure password to protect your data operations.",
  openGraph: {
    title: "Reset Password – Data Atmos",
    description: "Create a new password for your Data Atmos account. Choose a strong, secure password to protect your data operations.",
    url: "https://dataatmos.ai/auth/reset-password",
  },
  twitter: {
    title: "Reset Password – Data Atmos",
    description: "Create a new password for your Data Atmos account. Choose a strong, secure password to protect your data operations.",
  },
  alternates: {
    canonical: "https://dataatmos.ai/auth/reset-password",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
