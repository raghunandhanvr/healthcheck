import DefaultNavbar from "@/components/layout/default-navbar"

export default function AcceptInvitationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <DefaultNavbar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}