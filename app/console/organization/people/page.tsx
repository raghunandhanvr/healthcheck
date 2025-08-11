import { PageHeader } from "@/components/layout/page-header";

export default function OrganizationPeoplePage() {
  return (
    <div className="console-page-container">
      <PageHeader title="People" />
      <p>
        Manage your organization&apos;s team members. Invite users, assign roles, and control access permissions for your monitoring infrastructure.
      </p>
    </div>
  )
}