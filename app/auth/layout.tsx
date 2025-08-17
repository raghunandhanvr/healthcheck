import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication – Data Atmos",
  description: "Sign in or create your Data Atmos account to start managing your data operations, OLTP/OLAP workloads, and AI orchestration. Secure authentication with email verification and password reset options.",
  openGraph: {
    title: "Authentication – Data Atmos",
    description: "Sign in or create your Data Atmos account to start managing your data operations, OLTP/OLAP workloads, and AI orchestration.",
    url: "https://dataatmos.ai/auth",
  },
  twitter: {
    title: "Authentication – Data Atmos",
    description: "Sign in or create your Data Atmos account to start managing your data operations, OLTP/OLAP workloads, and AI orchestration.",
  },
  alternates: {
    canonical: "https://dataatmos.ai/auth",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
