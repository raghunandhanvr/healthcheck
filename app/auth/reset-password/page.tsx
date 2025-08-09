'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { authClient } from "@/lib/auth/auth-client"
import { toast } from "@/components/ui/sonner"
import { Globe } from '@/components/ui/globe'

function ResetPasswordContent() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)
  const [resetSuccess, setResetSuccess] = useState(false)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const globeConfig = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1] as [number, number, number],
    markerColor: [9/255, 105/255, 218/255] as [number, number, number],
    glowColor: [1, 1, 1] as [number, number, number],
    markers: [
      { location: [14.5995, 120.9842] as [number, number], size: 0.03 },
      { location: [19.076, 72.8777] as [number, number], size: 0.1 },
      { location: [23.8103, 90.4125] as [number, number], size: 0.05 },
      { location: [30.0444, 31.2357] as [number, number], size: 0.07 },
      { location: [39.9042, 116.4074] as [number, number], size: 0.08 },
      { location: [-23.5505, -46.6333] as [number, number], size: 0.1 },
      { location: [19.4326, -99.1332] as [number, number], size: 0.1 },
      { location: [40.7128, -74.006] as [number, number], size: 0.1 },
      { location: [34.6937, 135.5022] as [number, number], size: 0.05 },
      { location: [41.0082, 28.9784] as [number, number], size: 0.06 },
    ],
  }

  useEffect(() => {
    if (!token) {
      setIsValidToken(false)
    } else {
      setIsValidToken(true)
    }
  }, [token])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    if (!token) {
      toast.error("Invalid or missing reset token")
      return
    }

    setLoading(true)
    
    try {
      const response = await authClient.resetPassword({
        newPassword: password,
        token,
      })
      
      if (response.error) {
        toast.error(response.error.message || "Reset password failed")
        if (response.error.message?.includes('expired') || response.error.message?.includes('invalid')) {
          setIsValidToken(false)
        }
      } else {
        setResetSuccess(true)
        toast.success("Password reset successful!")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to reset password")
    } finally {
      setLoading(false)
    }
  }


  if (isValidToken === false) {
    return (
      <div className="layout-container centered pt-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl">

          <div className="order-2 lg:order-1 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-md aspect-square">
              <Globe config={globeConfig} className="w-full h-full" />
            </div>
            <div className="text-center mt-6 space-y-2">
              <p className="text-sm text-muted-foreground">
                Your servers are up and running
              </p>
              <p className="text-xs text-muted-foreground/70">
                Secure password reset
              </p>
            </div>
          </div>


          <div className="order-1 lg:order-2 w-full max-w-md mx-auto lg:mx-0">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <CardTitle>Invalid reset link</CardTitle>
                <CardDescription>
                  This password reset link is invalid or has expired
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Password reset links expire after 1 hour for security reasons.
                </p>
                
                <div className="space-y-2">
                  <Link href="/auth/forgot-password">
                    <Button className="w-full">
                      Request new reset link
                    </Button>
                  </Link>
                  
                  <Link href="/auth">
                    <Button variant="ghost" className="w-full">
                      Back to sign in
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }


  if (resetSuccess) {
    return (
      <div className="layout-container centered pt-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl">

          <div className="order-2 lg:order-1 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-md aspect-square">
              <Globe config={globeConfig} className="w-full h-full" />
            </div>
            <div className="text-center mt-6 space-y-2">
              <p className="text-sm text-muted-foreground">
                Your servers are up and running
              </p>
              <p className="text-xs text-muted-foreground/70">
                Password reset successful
              </p>
            </div>
          </div>


          <div className="order-1 lg:order-2 w-full max-w-md mx-auto lg:mx-0">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <CardTitle>Password reset successful</CardTitle>
                <CardDescription>
                  Your password has been updated successfully
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                  You can now sign in with your new password.
                </p>
                
                <Link href="/auth">
                  <Button className="w-full">
                    Continue to sign in
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }


  if (isValidToken === null) {
    return (
      <div className="layout-container centered pt-24">
        <div className="w-full max-w-md mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Validating reset link...</span>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="layout-container centered pt-24">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl">

        <div className="order-2 lg:order-1 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-md aspect-square">
            <Globe config={globeConfig} className="w-full h-full" />
          </div>
          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-muted-foreground">
              Your servers are up and running
            </p>
            <p className="text-xs text-muted-foreground/70">
              Create a new secure password
            </p>
          </div>
        </div>


        <div className="order-1 lg:order-2 w-full max-w-md mx-auto lg:mx-0">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Reset your password</CardTitle>
              <CardDescription>
                Enter your new password below
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      autoComplete="new-password"
                      minLength={8}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters long
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm new password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={loading}
                      autoComplete="new-password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !password.trim() || !confirmPassword.trim()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Resetting password...
                    </>
                  ) : (
                    "Reset password"
                  )}
                </Button>
              </form>

              <div className="text-center mt-6 border-t pt-6">
                <Link href="/auth">
                  <Button variant="ghost" size="sm">
                    Back to sign in
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="layout-container centered">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}