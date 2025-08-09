'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import { authClient } from "@/lib/auth/auth-client"
import { toast } from "@/components/ui/sonner"
import { Globe } from '@/components/ui/globe'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await authClient.forgetPassword({
        email,
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      
      if (response.error) {
        toast.error(response.error.message)
      } else {
        setEmailSent(true)
        toast.success("Password reset email sent! Check your inbox.")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send reset email")
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
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
                Reset your password securely
              </p>
            </div>
          </div>


          <div className="order-1 lg:order-2 w-full max-w-md mx-auto lg:mx-0">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <CardTitle>Check your email</CardTitle>
                <CardDescription>
                  We&apos;ve sent a password reset link to your email address
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Email sent to:
                  </p>
                  <p className="font-mono text-sm font-medium break-all">
                    {email}
                  </p>
                </div>

                <div className="space-y-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Click the link in your email to reset your password. The link will expire in 1 hour.
                  </p>
                  
                  <p className="text-sm text-muted-foreground">
                    Didn&apos;t receive the email? Check your spam folder or{' '}
                    <button
                      onClick={() => setEmailSent(false)}
                      className="text-primary hover:underline"
                    >
                      try again
                    </button>
                  </p>
                </div>

                <div className="text-center border-t pt-6">
                  <Link href="/auth">
                    <Button variant="ghost" size="sm">
                      <ArrowLeft className="w-4 h-4 mr-2" />
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
              Reset your password securely
            </p>
          </div>
        </div>


        <div className="order-1 lg:order-2 w-full max-w-md mx-auto lg:mx-0">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Forgot your password?</CardTitle>
              <CardDescription>
                Enter your email address and we&apos;ll send you a link to reset your password
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email address</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    autoFocus
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading || !email.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Sending reset link...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>

              <div className="text-center mt-6 border-t pt-6">
                <Link href="/auth">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
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