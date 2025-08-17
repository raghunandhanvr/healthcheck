import { PageHeader } from "@/components/layout/page-header"

export default function ProjectSettingsPage() {
  return (
    <div className="console-page-container">
      <PageHeader title="Settings" />
      <p>
        Configure your project settings, manage API keys, set up notification channels, and
        customize monitoring parameters for your services.
      </p>
    </div>
  )
}
