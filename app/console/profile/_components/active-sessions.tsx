import { Button } from "@/components/ui/button"
import { Smartphone, Monitor, X } from "lucide-react"

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
}

export function ActiveSessions({ activeSessions, currentSessionId }: ActiveSessionsProps) {
  const getDeviceIcon = (userAgent?: string | null) => {
    if (!userAgent) return <Monitor className="w-4 h-4" />
    return userAgent.toLowerCase().includes("mobile") ? (
      <Smartphone className="w-4 h-4" />
    ) : (
      <Monitor className="w-4 h-4" />
    )
  }

  const getDeviceName = (userAgent?: string | null) => {
    if (!userAgent) return "Unknown Device"
    
    // Extract browser and OS info
    const browser = userAgent.includes("Chrome") ? "Chrome" :
                   userAgent.includes("Firefox") ? "Firefox" :
                   userAgent.includes("Safari") ? "Safari" :
                   userAgent.includes("Edge") ? "Edge" : "Browser"
    
    const os = userAgent.includes("Windows") ? "Windows" :
               userAgent.includes("Mac") ? "macOS" :
               userAgent.includes("Linux") ? "Linux" :
               userAgent.includes("Android") ? "Android" :
               userAgent.includes("iOS") ? "iOS" : "OS"
    
    return `${browser} on ${os}`
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
          <Monitor className="w-8 h-8 mx-auto mb-2 opacity-50" />
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
                        {isCurrentSession ? "Current Session" : "Other Session"}
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
                      title="Revoke session"
                    >
                      <X className="w-4 h-4" />
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
