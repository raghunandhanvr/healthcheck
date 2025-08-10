import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LogOut, Edit, Mail, Shield, ShieldOff, Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "@/components/ui/sonner"
import { authClient, client } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import QRCode from "react-qr-code"

interface ProfileCardProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    emailVerified?: boolean | null
    twoFactorEnabled?: boolean | null
  }
}

export function ProfileCard({ user }: ProfileCardProps) {
  const router = useRouter()
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [twoFactorDialog, setTwoFactorDialog] = useState(false)
  const [twoFactorVerifyURI, setTwoFactorVerifyURI] = useState("")
  const [isPendingTwoFa, setIsPendingTwoFa] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editName, setEditName] = useState(user.name || "")
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  
  // 2FA states
  const [twoFaPassword, setTwoFaPassword] = useState("")

  const handleUpdateProfile = async () => {
    if (!editName.trim()) return
    setLoading(true)
    try {
      await authClient.updateUser({ name: editName })
      toast.success("Profile updated successfully")
      setShowEditProfile(false)
    } catch {
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }
    setLoading(true)
    try {
      await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: false,
      })
      toast.success("Password changed successfully")
      setShowChangePassword(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch {
      toast.error("Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  const handle2FAToggle = async () => {
    if (twoFaPassword.length < 8 && !twoFactorVerifyURI) {
      toast.error("Password must be at least 8 characters")
      return
    }
    setIsPendingTwoFa(true)
    if (user.twoFactorEnabled) {
      try {
        await client.twoFactor.disable({
          password: twoFaPassword,
          fetchOptions: {
            onError(context) {
              toast.error(context.error.message)
            },
            onSuccess() {
              toast.success("2FA disabled successfully")
              setTwoFactorDialog(false)
              setTwoFaPassword("")
              setTwoFactorVerifyURI("")
            },
          },
        })
      } catch {
        toast.error("Failed to disable 2FA")
      }
    } else {
      if (twoFactorVerifyURI) {
        try {
          await client.twoFactor.verifyTotp({
            code: twoFaPassword,
            fetchOptions: {
              onError(context) {
                setIsPendingTwoFa(false)
                setTwoFaPassword("")
                toast.error(context.error.message)
              },
              onSuccess() {
                toast.success("2FA enabled successfully")
                setTwoFactorVerifyURI("")
                setIsPendingTwoFa(false)
                setTwoFaPassword("")
                setTwoFactorDialog(false)
              },
            },
          })
          return
        } catch {
          toast.error("Failed to verify TOTP")
        }
      } else {
        try {
          await client.twoFactor.enable({
            password: twoFaPassword,
            fetchOptions: {
              onError(context) {
                toast.error(context.error.message)
              },
              onSuccess(ctx) {
                setTwoFactorVerifyURI(ctx.data.totpURI)
                setTwoFaPassword("")
              },
            },
          })
        } catch {
          toast.error("Failed to enable 2FA")
        }
      }
    }
    setIsPendingTwoFa(false)
  }

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await authClient.signOut()
      router.push("/")
    } catch {
      toast.error("Failed to sign out")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lg:sticky lg:top-8">
      <div className="border rounded-lg p-4 lg:p-6 bg-muted/20">
        {/* Profile Info */}
        <div className="text-center space-y-3 mb-6">
          <Avatar className="w-16 h-16 lg:w-20 lg:h-20 mx-auto">
            <AvatarImage src={user.image || undefined} />
            <AvatarFallback className="text-lg">{user.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
          </Avatar>

          <div>
            <p className="text-base font-medium">{user.name}</p>
            <div className="flex items-center justify-center gap-2 flex-wrap mt-1">
              <p className="text-sm text-muted-foreground">{user.email}</p>
              {user.emailVerified && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  <Mail className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Security Actions */}
        <div className="space-y-3 mb-6">
          <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-pwd">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-pwd"
                      type={showPasswords.current ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
                    >
                      {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pwd">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-pwd"
                      type={showPasswords.new ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                    >
                      {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-pwd">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-pwd"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
                    >
                      {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={() => setShowChangePassword(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleChangePassword} disabled={loading} className="flex-1">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Change"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex gap-2">
            
            <Dialog open={twoFactorDialog} onOpenChange={setTwoFactorDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant={user.twoFactorEnabled ? "destructive" : "default"} 
                  size="sm" 
                  className="flex-1"
                >
                  {user.twoFactorEnabled ? (
                    <>
                      <ShieldOff className="w-4 h-4 mr-1" />
                      Disable 2FA
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-1" />
                      Enable 2FA
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{user.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}</DialogTitle>
                </DialogHeader>
                {twoFactorVerifyURI ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <QRCode value={twoFactorVerifyURI} size={200} />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Scan the QR code with your TOTP app, then enter the 6-digit code
                    </p>
                    <div className="space-y-2">
                      <Label>Verification Code</Label>
                      <Input
                        value={twoFaPassword}
                        onChange={(e) => setTwoFaPassword(e.target.value)}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input
                        type="password"
                        value={twoFaPassword}
                        onChange={(e) => setTwoFaPassword(e.target.value)}
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={() => setTwoFactorDialog(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handle2FAToggle} disabled={isPendingTwoFa} className="flex-1">
                    {isPendingTwoFa ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {user.twoFactorEnabled
                      ? "Disable 2FA"
                      : twoFactorVerifyURI
                        ? "Verify & Enable"
                        : "Enable 2FA"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="space-y-3">
          <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full bg-transparent">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={() => setShowEditProfile(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateProfile} disabled={loading} className="flex-1">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="destructive" onClick={handleSignOut} disabled={loading} className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            {loading ? "Signing out..." : "Sign Out"}
          </Button>
        </div>
      </div>
    </div>
  )
}
