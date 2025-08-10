import { PageHeader } from "@/components/layout/page-header";

export default function ConsolePage() {
  return (
    <div className="page-container">
        <PageHeader title="Console" />

        <p>
          This is your monitoring dashboard. Here you can manage your uptime monitors, view performance metrics, and configure alerts.
        </p>
    </div>
  )
}