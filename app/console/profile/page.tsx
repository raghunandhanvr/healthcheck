"use client"

import { useState, useEffect } from "react"
import { useSession, authClient } from "@/lib/auth/auth-client"
import { Loader2 } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { EmailVerificationBanner } from "./_components/email-verification-banner"
import { ActiveSessions } from "./_components/active-sessions"
import { ProfileCard } from "./_components/profile-card"

interface SessionItem {
  session: {
    id: string
    userAgent?: string | null
    token: string
  }
  user: Record<string, unknown>
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession()
  const [activeSessions, setActiveSessions] = useState<SessionItem[]>([])

  useEffect(() => {
    if (session) {
      loadProfileData()
    }
  }, [session])

  const loadProfileData = async () => {
    try {
      const sessionsResponse = await authClient.multiSession.listDeviceSessions()
      if (sessionsResponse.data) {
        setActiveSessions(
          sessionsResponse.data.map((item: SessionItem) => ({
            session: {
              id: item.session.id,
              userAgent: item.session.userAgent,
              token: item.session.token,
            },
            user: item.user,
          })),
        )
      }
    } catch (error) {
      console.error("Failed to load profile data:", error)
    }
  }

  if (isPending || !session) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      {/* Email Verification Banner */}
      <EmailVerificationBanner isVerified={session.user.emailVerified} />

      {/* Page Title */}
      <PageHeader title="Profile Settings" />

      {/* Mobile Layout: Profile Card First */}
      <div className="block lg:hidden mb-6">
        <ProfileCard user={session.user} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Main Content - Active Sessions Only */}
        <div className="lg:col-span-8">
          <ActiveSessions 
            activeSessions={activeSessions} 
            currentSessionId={session.session?.id} 
          />
        </div>

        {/* Right Sidebar - Profile (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-4">
          <ProfileCard user={session.user} />
        </div>
      </div>
    </div>
  )
}
