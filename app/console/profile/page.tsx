"use client"

import { useState, useEffect } from "react"
import { useSession, client } from "@/lib/auth/auth-client"
import { LoaderPinwheelIcon } from "@/components/ui/icons/loader-pinwheel"
import { PageHeader } from "@/components/layout/page-header"
import { EmailVerificationBanner } from "./_components/email-verification-banner"
import { ActiveSessions } from "./_components/active-sessions"
import { ProfileCard } from "./_components/profile-card"
import { UserWithProvider } from "@/lib/types/api/user"

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
  const [userDetails, setUserDetails] = useState<UserWithProvider | null>(null)

  useEffect(() => {
    if (session) {
      loadProfileData()
    }
  }, [session])

  const loadProfileData = async () => {
    try {
      const [sessionsResponse, userResponse] = await Promise.all([
        client.multiSession.listDeviceSessions(),
        fetch('/api/user').then(res => res.ok ? res.json() : null)
      ]);

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

      if (userResponse) {
        setUserDetails(userResponse);
      }
    } catch (error) {
      console.error("Failed to load profile data:", error)
    }
  }

  if (isPending || !session) {
    return (
      <div className="console-page-container">
        <div className="flex items-center justify-center">
          <LoaderPinwheelIcon size={12} />
        </div>
      </div>
    )
  }

  return (
    <div className="console-page-container">
      {/* Email Verification Banner */}
      <EmailVerificationBanner isVerified={session.user.emailVerified} />

      {/* Page Title */}
      <PageHeader title="Profile Settings" />

      {/* Mobile Layout: Profile Card First */}
      <div className="block lg:hidden mb-6">
        <ProfileCard user={session.user} userDetails={userDetails} />
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
          <ProfileCard user={session.user} userDetails={userDetails} />
        </div>
      </div>
    </div>
  )
}
