'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Globe } from '@/components/ui/globe'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

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
              Verify your email to get started
            </p>
          </div>
        </div>


        <div className="order-1 lg:order-2 w-full max-w-md mx-auto lg:mx-0">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Check your email</CardTitle>
              <CardDescription>
                We&apos;ve sent a verification link to your email address
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {email && (
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Email sent to:
                  </p>
                  <p className="font-mono text-sm font-medium break-all">
                    {email}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div className="text-sm">
                    <p className="font-medium">Click the verification link</p>
                    <p className="text-muted-foreground text-xs">
                      Check your email and click the verification link to activate your account
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                  <div className="text-sm">
                    <p className="font-medium">Check your spam folder</p>
                    <p className="text-muted-foreground text-xs">
                      If you don&apos;t see the email, check your spam or junk folder
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Didn&apos;t receive the email?
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.reload()}
                  >
                    Resend verification email
                  </Button>
                </div>

                <div className="text-center">
                  <Link href="/auth">
                    <Button variant="ghost" size="sm">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to sign in
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground border-t pt-4">
                <p>
                  Need help? Contact us at{' '}
                  <a 
                    href="mailto:support@healthcheck.sh" 
                    className="text-primary hover:underline"
                  >
                    support@healthcheck.sh
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="layout-container centered pt-24">
        <div className="w-full max-w-md mx-auto flex items-center justify-center">
          Loading...
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}