import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password – healthcheck.sh",
  description: "Reset your healthcheck.sh account password. Enter your email address to receive a secure password reset link.",
  openGraph: {
    title: "Forgot Password – healthcheck.sh",
    description: "Reset your healthcheck.sh account password. Enter your email address to receive a secure password reset link.",
    url: "https://healthcheck.sh/auth/forgot-password",
  },
  twitter: {
    title: "Forgot Password – healthcheck.sh",
    description: "Reset your healthcheck.sh account password. Enter your email address to receive a secure password reset link.",
  },
  alternates: {
    canonical: "https://healthcheck.sh/auth/forgot-password",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
