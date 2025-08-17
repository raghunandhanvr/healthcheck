import TopNavbar from "@/components/layout/top-navbar"

export default function AcceptInvitationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <TopNavbar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}