"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "@/components/ui/globe"
import { ArrowLeftIcon } from "@/components/ui/icons/arrow-left"
import { CircleCheckIcon } from "@/components/ui/icons/circle-check"
import { LoaderPinwheelIcon } from "@/components/ui/icons/loader-pinwheel"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { toast } from "@/components/ui/sonner"
import { client } from "@/lib/auth/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TwoFactorPage() {
  const [totpCode, setTotpCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

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
    markerColor: [9 / 255, 105 / 255, 218 / 255] as [number, number, number],
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

  const handleTotpVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (totpCode.length !== 6 || !/^\d+$/.test(totpCode)) {
      toast.error("TOTP code must be 6 digits")
      return
    }

    setLoading(true)
    try {
      const res = await client.twoFactor.verifyTotp({
        code: totpCode,
      })

      if (res.data?.token) {
        setSuccess(true)
        toast.success("Two-factor authentication successful!")
        setTimeout(() => {
          router.push("/console")
        }, 1500)
      } else {
        toast.error("Invalid TOTP code")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid verification code")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="layout-container centered">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl">
          <div className="order-2 lg:order-1 flex flex-col items-center justify-center relative hidden lg:flex">
            <div className="relative w-full max-w-md aspect-square">
              <Globe config={globeConfig} className="w-full h-full" />
            </div>
            <div className="text-center mt-6 space-y-2">
              <p className="text-sm text-muted-foreground">Your servers are up and running</p>
              <p className="text-xs text-muted-foreground/70 text-center">
                Authentication successful
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 w-full max-w-md mx-auto lg:mx-0">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <CircleCheckIcon size={12} />
                  </div>
                </div>
                <CardTitle className="text-center">Authentication Successful</CardTitle>
                <CardDescription className="text-center">
                  Redirecting you to the dashboard...
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="layout-container centered">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl">
        <div className="order-2 lg:order-1 flex flex-col items-center justify-center relative hidden lg:flex">
          <div className="relative w-full max-w-md aspect-square">
            <Globe config={globeConfig} className="w-full h-full" />
          </div>
          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-muted-foreground">Your servers are up and running</p>
            <p className="text-xs text-muted-foreground/70">Complete two-factor authentication</p>
          </div>
        </div>

        <div className="order-1 lg:order-2 w-full max-w-md mx-auto lg:mx-0">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleTotpVerification} className="space-y-4">
                <div className="space-y-2 flex flex-col items-center">
                  <InputOTP
                    value={totpCode}
                    onChange={value => setTotpCode(value)}
                    maxLength={6}
                    disabled={loading}
                    autoFocus
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <p className="text-xs text-muted-foreground">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || totpCode.length !== 6}
                >
                  {loading ? (
                    <>
                      <LoaderPinwheelIcon size={12} />
                      Verifying...
                    </>
                  ) : (
                    "Verify Code"
                  )}
                </Button>
              </form>

              <div className="text-center mt-6 border-t pt-6">
                <Link href="/auth">
                  <Button variant="ghost" size="sm">
                    <ArrowLeftIcon size={12} />
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
