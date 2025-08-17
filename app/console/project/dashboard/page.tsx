import { PageHeader } from "@/components/layout/page-header"

export default function ProjectDashboardPage() {
  return (
    <div className="console-page-container">
      <PageHeader title="Dashboard" />
      <p>
        Monitor your project&apos;s health and performance metrics. View real-time status, uptime
        statistics, and recent alerts for your services.
      </p>
    </div>
  )
}
