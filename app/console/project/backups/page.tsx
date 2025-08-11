import { PageHeader } from "@/components/layout/page-header";

export default function ProjectBackupsPage() {
  return (
    <div className="console-page-container">
      <PageHeader title="Backups" />
      <p>
        Manage backup configurations, schedule automated backups, and restore monitoring data and configurations from previous snapshots.
      </p>
    </div>
  )
}