'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignInTab } from './_components/sign-in-tab'
import { SignUpTab } from './_components/sign-up-tab'
import { Globe } from '@/components/ui/globe'
import { cn } from '@/lib/utils/common'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin")
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
    <div className="flex items-center justify-center pt-8 lg:pt-24 px-4 pb-8">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <div className="hidden lg:flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-[500px] h-[500px]">
              <Globe config={globeConfig} className="w-full h-full" />
            </div>
            <div className="text-center mt-8 space-y-2">
              <p className="text-sm text-muted-foreground">
                Your servers are up and running
              </p>
              <p className="text-xs text-muted-foreground/70">
                Monitor your infrastructure with confidence
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto lg:mx-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="relative">
            <TabsList className="grid w-full grid-cols-2 h-9 p-1 bg-muted/50 mb-4">
              <TabsTrigger 
                value="signin" 
                className={cn(
                  "relative h-7 text-sm font-medium transition-all",
                  "data-[state=active]:bg-background data-[state=active]:text-foreground",
                  "data-[state=inactive]:text-muted-foreground hover:text-foreground"
                )}
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className={cn(
                  "relative h-7 text-sm font-medium transition-all",
                  "data-[state=active]:bg-background data-[state=active]:text-foreground",
                  "data-[state=inactive]:text-muted-foreground hover:text-foreground"
                )}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <div className="relative">
              <TabsContent value="signin" className="m-0 data-[state=inactive]:hidden">
                <div className="min-h-[700px]">
                  <SignInTab onSwitchToSignUp={() => setActiveTab("signup")} />
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="m-0 data-[state=inactive]:hidden">
                <div className="min-h-[700px]">
                  <SignUpTab />
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
        </div>
      </div>
    </div>
  )
}