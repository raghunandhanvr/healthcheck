import type React from "react"
import { cn } from "@/lib/utils/common"
import { ActivityIcon } from "@/components/ui/icons/activity"
import { ClockIcon } from "@/components/ui/icons/clock"
import { CircleDollarSignIcon } from "@/components/ui/icons/circle-dollar-sign"
import { ShieldCheckIcon } from "@/components/ui/icons/shield-check"
import { BellIcon } from "@/components/ui/icons/bell"
import { ChartBarIncreasingIcon } from "@/components/ui/icons/chart-bar-increasing"
import { EarthIcon } from "@/components/ui/icons/earth"
import { UsersIcon } from "@/components/ui/icons/users"
import { GithubIcon } from "@/components/ui/icons/github"

import { Button } from "@/components/ui/button"
import Link from "next/link"

function FeaturesSectionDemo() {
  const leftFeatures = [
    {
      aboveTitle: "Your Services, Always On.",
      title: "Know your servers are up with healthcheck.sh",
      description:
        "A lightweight uptime and performance monitoring tool for your websites, APIs, GraphQL endpoints, webhooks, servers, and even AI models. Build trust with status pages. Way cheaper in cost compared to alternatives.",
      size: "large",
      type: "marketing",
    },
    {
      title: "Real-time Monitoring",
      description: "Monitor your websites, APIs, GraphQL endpoints, and servers with sub-minute precision.",
      icon: <ActivityIcon size={16} />,
      size: "medium",
      type: "feature",
    },
    {
      title: "99.9% Uptime SLA",
      description: "Reliable monitoring infrastructure that's always watching your services and webhooks.",
      icon: <ClockIcon size={16} />,
      size: "medium",
      type: "feature",
    },
    {
      title: "Affordable Pricing",
      description: "Enterprise-grade monitoring at a fraction of the cost of competitors.",
      icon: <CircleDollarSignIcon size={16} />,
      size: "small",
      type: "feature",
    },
    {
      title: "SSL & Security Checks",
      description: "Monitor certificate expiry and security vulnerabilities across all endpoints.",
      icon: <ShieldCheckIcon size={16} />,
      size: "small",
      type: "feature",
    },
    {
      title: "Smart Alerts",
      description: "Get notified via email, SMS, Slack, Discord, or custom webhooks when issues arise.",
      icon: <BellIcon size={16} />,
      size: "medium",
      type: "feature",
    },
    {
      title: "Performance Analytics",
      description: "Detailed insights into response times, uptime trends, and performance metrics.",
      icon: <ChartBarIncreasingIcon size={16} />,
      size: "small",
      type: "feature",
    },
    {
      title: "Global Monitoring",
      description: "Check your services from multiple locations worldwide for accurate results.",
      icon: <EarthIcon size={16} />,
      size: "small",
      type: "feature",
    },
    {
      title: "Team Collaboration",
      description: "Share status pages and collaborate with your team on incident response.",
      icon: <UsersIcon size={16} />,
      size: "medium",
      type: "feature",
    },
  ]

  const rightFeatures = [
    {
      title: "Global Coverage",
      description: "",
      size: "full",
      type: "globe",
    },
    {
      title: "Start monitoring today",
      description: "Join thousands of developers who trust healthcheck.sh to keep their services running smoothly. Start with our free plan – no credit card required.",
      size: "full",
      type: "cta",
    },
  ]

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-fr lg:auto-rows-[230px] border border-neutral-200 dark:border-neutral-800">
              {leftFeatures.map((feature) => (
                <Feature key={feature.title} {...feature} />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="grid grid-rows-2 h-full lg:min-h-[900px] border-r border-b border-neutral-200 dark:border-neutral-800">
              {rightFeatures.map((feature) => (
                <Feature key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full border-l border-r border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-4 md:p-6 lg:p-8 transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 group">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-center">
            <div className="flex items-center space-x-2">
              <div className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-300">
                <GithubIcon size={16} />
              </div>
              <p className="text-xs sm:text-sm text-neutral-900 dark:text-neutral-100">
                Like to contribute?
              </p>
            </div>
            <Link 
              href="https://github.com/raghunandhanvr/healthcheck" 
              target="_blank" 
              rel="noopener noreferrer"
                             className="inline-flex items-center text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors duration-300 break-all sm:break-normal"
            >
              <span className="hidden sm:inline">Start contributing on </span>
              <span className="sm:hidden">Contribute on </span>
              github.com/raghunandhanvr/healthcheck
              <svg 
                className="ml-2 w-4 h-4 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const Feature = ({
  title,
  description,
  icon,
  size,
  type,
  aboveTitle,
}: {
  title: string
  description: string
  icon?: React.ReactNode
  size: string
  type?: string
  aboveTitle?: string
}) => {
  const sizeClasses = {
    large: "col-span-2 md:col-span-2 lg:col-span-2 row-span-2",
    medium: "col-span-2 md:col-span-2 lg:col-span-2 row-span-1",
    small: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    full: "col-span-1 row-span-1",
  }

  if (type === "marketing") {
    return (
      <div
        className={cn(
          "group relative overflow-hidden border-r border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-6 md:p-8 lg:p-12 transition-all duration-300",
          sizeClasses[size as keyof typeof sizeClasses],
        )}
      >
        <div className="relative flex flex-col h-full justify-center">
          {aboveTitle && <p className="text-sm text-muted-foreground mb-2">{aboveTitle}</p>}
          <div className="mb-4">
            <p className="text-neutral-900 dark:text-neutral-100">
              {title.split("healthcheck.sh")[0]}
              <span className="font-mono text-primary font-bold">healthcheck.sh</span>
              {title.split("healthcheck.sh")[1]}
            </p>
          </div>

          <div className="text-sm text-muted-foreground space-y-3">
            <p>{description.split(". Build trust")[0]}.</p>
            <p>Build trust with status pages. Way cheaper in cost compared to alternatives.</p>
          </div>
        </div>
      </div>
    )
  }

  if (type === "globe") {
    return (
      <div
        className={cn(
          "group relative overflow-hidden border-r border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black transition-all duration-300",
          sizeClasses[size as keyof typeof sizeClasses],
        )}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/beam.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  if (type === "cta") {
    return (
      <div
        className={cn(
          "group relative overflow-hidden border-r border-b border-neutral-200 dark:border-neutral-800 p-6 lg:p-8 transition-all duration-300",
          sizeClasses[size as keyof typeof sizeClasses],
        )}
        style={{
          background: `radial-gradient(
            circle at top center,
            #FFFFFF 0%,
            #87CEEB 15%,
            #4169E1 35%,
            #1E3A8A 60%,
            #0F172A 85%,
            #000000 100%
          )`
        }}
      >
        <div className="relative flex flex-col h-full justify-center items-center text-center">
          <div className="mb-4">
            <p className="text-lg lg:text-xl font-bold text-white leading-tight mb-2">{title}</p>
            <p className="text-sm lg:text-base text-white/90">Free forever plan available</p>
          </div>

          <p className="text-sm lg:text-base text-white/90 leading-relaxed mb-6 max-w-sm">{description}</p>

          <Link href="/auth">
            <Button className="bg-white text-black hover:bg-white/90 font-medium text-sm lg:text-base px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Free
            </Button>
          </Link>
          
          <p className="text-xs lg:text-sm text-white/70 mt-3">No credit card required</p>
        </div>
      </div>
    )
  }


  return (
    <div
      className={cn(
        "group relative overflow-hidden border-r border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-4 transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900",
        sizeClasses[size as keyof typeof sizeClasses],
        size === "large" && "p-6",
      )}
    >
      <div className="relative flex flex-col h-full">
        {icon && (
          <div className="mb-3 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-300">
            {icon}
          </div>
        )}

        <div className="mb-2">
          <p
            className={cn(
              "font-medium text-neutral-900 dark:text-neutral-100 leading-tight",
              size === "large" ? "text-base" : "text-sm",
            )}
          >
            {title}
          </p>
        </div>

        <p
          className={cn(
            "text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1",
            size === "large" ? "text-sm" : "text-xs",
          )}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-background">
      <div className="w-full">
        <FeaturesSectionDemo />
      </div>
    </div>
  )
}
