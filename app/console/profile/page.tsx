"use client"

import React from "react"
import { useSession, client } from "@/lib/auth/auth-client"
import { LoaderPinwheelIcon } from "@/components/ui/icons/loader-pinwheel"
import { PageHeader } from "@/components/layout/page-header"
import { EmailVerificationBanner } from "./_components/email-verification-banner"
import { ActiveSessions } from "./_components/active-sessions"
import { ProfileCard } from "./_components/profile-card"
import { useUserProfile } from "@/lib/api/hooks/user"

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
  const [activeSessions, setActiveSessions] = React.useState<SessionItem[]>([])
  
  const { 
    data: userDetails, 
    loading: userLoading 
  } = useUserProfile({ 
    enabled: Boolean(session?.user?.id) 
  })

  React.useEffect(() => {
    if (session?.user?.id) {
      loadActiveSessions()
    }
  }, [session?.user?.id])

  const loadActiveSessions = async () => {
    try {
      const sessionsResponse = await client.multiSession.listDeviceSessions()
      if (sessionsResponse.data) {
        setActiveSessions(
          sessionsResponse.data.map((item: SessionItem) => ({
            session: {
              id: item.session.id,
              userAgent: item.session.userAgent,
              token: item.session.token,
            },
            user: item.user,
          }))
        )
      }
    } catch (error) {
      console.error("Failed to load sessions:", error)
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
      <EmailVerificationBanner isVerified={session.user.emailVerified} />
      <PageHeader title="Profile Settings" />
      <div className="block lg:hidden mb-6">
        <ProfileCard 
          user={session.user} 
          userDetails={userDetails} 
          isLoading={userLoading && !userDetails}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-8">
          <ActiveSessions 
            activeSessions={activeSessions} 
            currentSessionId={session.session?.id}
            isLoading={activeSessions.length === 0}
          />
        </div>

        <div className="hidden lg:block lg:col-span-4">
          <ProfileCard 
            user={session.user} 
            userDetails={userDetails} 
            isLoading={userLoading && !userDetails}
          />
        </div>
      </div>
    </div>
  )
}
