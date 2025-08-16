import { Button } from "@/components/ui/button"
import { MonitorCheckIcon } from "@/components/ui/icons/monitor-check"
import { XIcon } from "@/components/ui/icons/x"
import { DEVICE_CONSTANTS, UI_MESSAGES } from "@/lib/constants"
import { Skeleton } from "@/components/ui/skeleton"

interface SessionItem {
  session: {
    id: string
    userAgent?: string | null
    token: string
  }
  user: Record<string, unknown>
}

interface ActiveSessionsProps {
  activeSessions: SessionItem[]
  currentSessionId?: string
  isLoading?: boolean
}

export function ActiveSessions({ activeSessions, currentSessionId, isLoading }: ActiveSessionsProps) {
  const getDeviceIcon = (userAgent?: string | null) => {
    if (!userAgent) return <MonitorCheckIcon size={12} />
    return userAgent.toLowerCase().includes("mobile") ? (
      <MonitorCheckIcon size={12} />
    ) : (
      <MonitorCheckIcon size={12} />
    )
  }

  const getDeviceName = (userAgent?: string | null) => {
    if (!userAgent) return UI_MESSAGES.LABELS.UNKNOWN_DEVICE
    
    // Extract browser and OS info
    const browser = userAgent.includes("Chrome") ? DEVICE_CONSTANTS.BROWSERS.CHROME :
                   userAgent.includes("Firefox") ? DEVICE_CONSTANTS.BROWSERS.FIREFOX :
                   userAgent.includes("Safari") ? DEVICE_CONSTANTS.BROWSERS.SAFARI :
                   userAgent.includes("Edge") ? DEVICE_CONSTANTS.BROWSERS.EDGE : DEVICE_CONSTANTS.BROWSERS.BROWSER
    
    const os = userAgent.includes("Windows") ? DEVICE_CONSTANTS.OPERATING_SYSTEMS.WINDOWS :
               userAgent.includes("Mac") ? DEVICE_CONSTANTS.OPERATING_SYSTEMS.MACOS :
               userAgent.includes("Linux") ? DEVICE_CONSTANTS.OPERATING_SYSTEMS.LINUX :
               userAgent.includes("Android") ? DEVICE_CONSTANTS.OPERATING_SYSTEMS.ANDROID :
               userAgent.includes("iOS") ? DEVICE_CONSTANTS.OPERATING_SYSTEMS.IOS : DEVICE_CONSTANTS.OPERATING_SYSTEMS.OS
    
    return `${browser} on ${os}`
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-5 w-20" />
        </div>
        
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border bg-muted/20"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-muted">
                  <Skeleton className="w-3 h-3" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-36 mb-1" />
                  <Skeleton className="h-3 w-full" />
                </div>
                
                <Skeleton className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Active Sessions</h3>
        <span className="text-sm text-muted-foreground">
          {activeSessions.length} session{activeSessions.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {activeSessions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MonitorCheckIcon size={12} />
          <p className="text-sm">No active sessions found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activeSessions.map((sessionItem, index) => {
            const isCurrentSession = sessionItem.session.id === currentSessionId
            const deviceIcon = getDeviceIcon(sessionItem.session.userAgent)
            const deviceName = getDeviceName(sessionItem.session.userAgent)
            
            return (
              <div
                key={sessionItem.session.id || index}
                className="p-4 rounded-lg border bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-muted text-muted-foreground">
                    {deviceIcon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">
                        {isCurrentSession ? UI_MESSAGES.LABELS.CURRENT_SESSION : UI_MESSAGES.LABELS.OTHER_SESSION}
                      </p>
                      {isCurrentSession && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{deviceName}</p>
                    {sessionItem.session.userAgent && (
                      <p className="text-xs text-muted-foreground truncate">
                        {sessionItem.session.userAgent}
                      </p>
                    )}
                  </div>
                  
                  {!isCurrentSession && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      title={UI_MESSAGES.TITLES.REVOKE_SESSION}
                    >
                      <XIcon size={12} />
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
