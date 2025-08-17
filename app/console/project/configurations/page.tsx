import { PageHeader } from "@/components/layout/page-header"

export default function ProjectConfigurationsPage() {
  return (
    <div className="console-page-container">
      <PageHeader title="Configurations" />
      <p>
        Manage monitoring configurations for your services. Set up health checks, define alert
        thresholds, and configure monitoring intervals.
      </p>
    </div>
  )
}
