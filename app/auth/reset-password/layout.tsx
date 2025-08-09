import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password – healthcheck.sh",
  description: "Create a new password for your healthcheck.sh account. Choose a strong, secure password to protect your monitoring data.",
  openGraph: {
    title: "Reset Password – healthcheck.sh",
    description: "Create a new password for your healthcheck.sh account. Choose a strong, secure password to protect your monitoring data.",
    url: "https://healthcheck.sh/auth/reset-password",
  },
  twitter: {
    title: "Reset Password – healthcheck.sh",
    description: "Create a new password for your healthcheck.sh account. Choose a strong, secure password to protect your monitoring data.",
  },
  alternates: {
    canonical: "https://healthcheck.sh/auth/reset-password",
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
