import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email – healthcheck.sh",
  description: "Verify your email address to complete your healthcheck.sh account setup and start monitoring your services.",
  openGraph: {
    title: "Verify Email – healthcheck.sh",
    description: "Verify your email address to complete your healthcheck.sh account setup and start monitoring your services.",
    url: "https://healthcheck.sh/auth/verify-email",
  },
  twitter: {
    title: "Verify Email – healthcheck.sh",
    description: "Verify your email address to complete your healthcheck.sh account setup and start monitoring your services.",
  },
  alternates: {
    canonical: "https://healthcheck.sh/auth/verify-email",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
