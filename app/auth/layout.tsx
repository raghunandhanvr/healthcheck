import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication – healthcheck.sh",
  description: "Sign in or create your healthcheck.sh account to start monitoring your websites, APIs, servers, and AI models. Secure authentication with email verification and password reset options.",
  openGraph: {
    title: "Authentication – healthcheck.sh",
    description: "Sign in or create your healthcheck.sh account to start monitoring your websites, APIs, servers, and AI models.",
    url: "https://healthcheck.sh/auth",
  },
  twitter: {
    title: "Authentication – healthcheck.sh",
    description: "Sign in or create your healthcheck.sh account to start monitoring your websites, APIs, servers, and AI models.",
  },
  alternates: {
    canonical: "https://healthcheck.sh/auth",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
