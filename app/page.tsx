import { ArrowRightIcon } from "@/components/ui/icons/arrow-right"
import { CircleDollarSignIcon } from "@/components/ui/icons/circle-dollar-sign"
import { ConnectIcon } from "@/components/ui/icons/connect"
import { CpuIcon } from "@/components/ui/icons/cpu"
import { EarthIcon } from "@/components/ui/icons/earth"
import { FlameIcon } from "@/components/ui/icons/flame"
import { GaugeIcon } from "@/components/ui/icons/gauge"
import { GithubIcon } from "@/components/ui/icons/github"
import { LayersIcon } from "@/components/ui/icons/layers"
import { RocketIcon } from "@/components/ui/icons/rocket"
import { ShieldCheckIcon } from "@/components/ui/icons/shield-check"
import { SparklesIcon } from "@/components/ui/icons/sparkles"
import { WorkflowIcon } from "@/components/ui/icons/workflow"
import { cn } from "@/lib/utils/common"

import { MainLayout } from "@/components/layout/main-layout"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { Globe } from "@/components/ui/globe"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import Image from "next/image"
import Link from "next/link"

const FEATURES = {
  left: [
    {
      aboveTitle: "The single platform for all your data needs",
      title: "Data Atmos",
      description:
        "• Control plane spins up any datastore in a VPC-peered cluster\n• Platform-agnostic—bring your own, use ours, or migrate seamlessly\n• 24/7 DBA support with CDC streams for millisecond OLAP \n• No more chaos",
      size: "large",
      type: "marketing",
    },
    {
      title: "Serverless Datastores",
      description:
        "MySQL, Postgres, Redis, vector, queues, and AI search in minutes; autoscale on demand; HA, backups, and patching baked in.",
      icon: <LayersIcon size={16} />,
      size: "medium",
      showDbIcons: true,
    },
    {
      title: "Modular GPU Pods",
      description:
        "Mount zero-copy data (internal or external) so you can train, customize, and deploy AI models end-to-end privately. GPU pods for AI, ML, and data processing. We support all major GPU vendors and models.",
      icon: <CpuIcon size={16} />,
      size: "medium",
    },
    {
      title: "Cost Optimization",
      description:
        "DataOps orchestration just got simpler—and your costs just got a whole lot smaller.",
      icon: <CircleDollarSignIcon size={16} />,
      size: "small",
    },
    {
      title: "Private by Default",
      description:
        "VPC peering/PrivateLink, in‑region traffic only; TLS everywhere and customer‑managed keys end‑to‑end.",
      icon: <ShieldCheckIcon size={16} />,
      size: "small",
    },
    {
      title: "Real-time Analytics",
      description:
        "Observability at a glance—p95 latency, top queries, lock waits, replication lag, queue depth, index health.",
      icon: <GaugeIcon size={16} />,
      size: "medium",
    },
    {
      title: "AI Agents",
      description:
        "AI agents for managing database performance tuning, governance, reporting, and cost optimization by learning workload patterns.",
      icon: <RocketIcon size={16} />,
      size: "small",
    },
    {
      title: "Multi-cloud Ready",
      description:
        "Your cloud or ours; keep your VPC and keys while Data Atmos runs the heavy lifting.",
      icon: <EarthIcon size={16} />,
      size: "small",
    },
    {
      title: "Migration Support",
      description:
        "Connect RDS, Aurora, PlanetScale, Neon, Redis Cloud, Kafka/Redpanda; guided cutover with rollback.",
      icon: <ConnectIcon size={16} />,
      size: "medium",
    },
  ],
  right: [
    { title: "Global Infrastructure", size: "full", type: "globe" },
    {
      title: "Your Final Data Platform",
      description: "All your data. One platform. Zero hassle.",
      size: "full",
      type: "cta",
    },
  ],
}

const SIZE_CLASSES = {
  large: "col-span-2 md:col-span-2 lg:col-span-2 row-span-2",
  medium: "col-span-2 md:col-span-2 lg:col-span-2 row-span-1",
  small: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
  full: "col-span-1 row-span-1",
}

const GRADIENT_STYLE = {
  background: `radial-gradient(circle at top center, #FFFFFF 0%, #87CEEB 15%, #4169E1 35%, #1E3A8A 60%, #0F172A 85%, #000000 100%)`,
}

const GRADIENT_STYLE_NEWS_TICKER = {
  background: `radial-gradient(circle at top left, #FFFFFF 0%, #87CEEB 15%, #4169E1 35%, #1E3A8A 60%, #0F172A 85%, #000000 100%)`,
}

const TICKER_ITEMS = [
  { icon: SparklesIcon, text: "OLTP, OLAP, and AI orchestration in single platform" },
  { icon: FlameIcon, text: "We support server and serverless" },
  { icon: WorkflowIcon, text: "We are powerhouse for your data" },
]

const DB_ICONS = [
  { src: "/db/MySQL.svg", alt: "MySQL" },
  { src: "/db/PostgreSQL.svg", alt: "PostgreSQL" },
  { src: "/db/Redis.svg", alt: "Redis" },
  { src: "/db/vector.png", alt: "Vector Database" },
]

interface FeatureProps {
  title: string
  description?: string
  icon?: React.ReactNode
  size: "large" | "medium" | "small" | "full"
  type?: "marketing" | "globe" | "cta" | "feature"
  aboveTitle?: string
  showDbIcons?: boolean
}

const Feature = ({
  title,
  description = "",
  icon,
  size,
  type,
  aboveTitle,
  showDbIcons,
}: FeatureProps) => {
  const baseClass = cn(
    "group relative overflow-hidden border-r border-b border-neutral-200 dark:border-neutral-800",
    SIZE_CLASSES[size]
  )

  if (type === "marketing") {
    return (
      <div className={cn(baseClass, "bg-card p-6 md:p-8 lg:p-12 transition-all duration-300")}>
        <div className="relative flex flex-col h-full justify-center">
          {aboveTitle && <p className="text-sm text-muted-foreground mb-3">{aboveTitle}</p>}
          <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            <span className="text-primary font-mono">{title}</span>
          </h2>
          <div className="text-sm text-muted-foreground space-y-2">
            {description.split("\n").map((line: string, i: number) => (
              <p key={i} className="leading-relaxed">
                {line}
              </p>
            ))}
          </div>
          <div className="relative mt-6 h-20">
            <Globe className="opacity-80" />
          </div>
        </div>
      </div>
    )
  }

  if (type === "globe") {
    return (
      <div className={cn(baseClass, "bg-card transition-all duration-300")}>
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/beam.webm" type="video/webm" />
        </video>
      </div>
    )
  }

  if (type === "cta") {
    return (
      <div
        className={cn(baseClass, "p-6 lg:p-8 transition-all duration-300")}
        style={GRADIENT_STYLE}
      >
        <div className="relative flex flex-col h-full justify-center items-center text-center">
          <p className="text-lg lg:text-xl font-bold text-white mb-2">{title}</p>
          <p className="text-sm lg:text-base text-white/90">Free forever plan available</p>
          <p className="text-sm lg:text-base text-white/90 leading-relaxed my-6 max-w-sm">
            {description}
          </p>
          <Link href="/auth">
            <ShimmerButton
              className="bg-white text-black font-medium text-sm lg:text-base px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              background="rgba(255, 255, 255, 1)"
              shimmerColor="#000000"
              borderRadius="8px"
            >
              Get Started Free
              <ArrowRightIcon size={14} />
            </ShimmerButton>
          </Link>
          <p className="text-xs lg:text-sm text-white/70 mt-3">No credit card required</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        baseClass,
        "bg-card p-4 transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900",
        size === "large" && "p-6"
      )}
    >
      <div className="relative flex flex-col h-full">
        {icon && (
          <div className="mb-3 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-300">
            {icon}
          </div>
        )}
        <p
          className={cn(
            "font-medium text-neutral-900 dark:text-neutral-100 leading-tight mb-2",
            size === "large" ? "text-base" : "text-sm"
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "text-neutral-600 dark:text-neutral-400 leading-relaxed",
            size === "large" ? "text-sm" : "text-xs"
          )}
        >
          {description}
        </p>
        {showDbIcons && (
          <div className="hidden md:flex items-center justify-center gap-9 mt-11">
            {DB_ICONS.map(db => (
              <Image
                key={db.alt}
                src={db.src}
                alt={db.alt}
                width={28}
                height={28}
                className="opacity-100 hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const NewsTicker = () => (
  <div
    className="w-full h-6 overflow-hidden border-t border-l border-r border-neutral-200 dark:border-neutral-800 relative"
    style={GRADIENT_STYLE_NEWS_TICKER}
  >
    <style
      dangerouslySetInnerHTML={{
        __html: `
        @keyframes smoothTickerFlow { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes shimmerGlow { 0% { opacity: 0; transform: translateX(-100%); } 70% { opacity: 0; } 85% { opacity: 1; } 100% { opacity: 0; transform: translateX(100%); } }
      `,
      }}
    />
    <div
      className="flex whitespace-nowrap items-center h-full"
      style={{ animation: "smoothTickerFlow 25s linear infinite" }}
    >
      <div className="flex items-center h-full min-w-max">
        {TICKER_ITEMS.map((item, i) => (
          <span key={i} className="flex items-center">
            <item.icon size={10} className="text-white mr-1 ml-30" />
            <span className="text-xs font-medium text-white mr-6">{item.text}</span>
          </span>
        ))}
      </div>
    </div>
    <div
      className="absolute top-0 right-0 w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
      style={{ animation: "shimmerGlow 25s linear infinite" }}
    />
  </div>
)

const GitHubFooter = () => (
  <div className="w-full border-l border-r border-b border-neutral-200 dark:border-neutral-800 bg-card p-4 md:p-6 lg:p-8 transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 group">
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-center">
      <div className="flex items-center space-x-2">
        <GithubIcon
          size={16}
          className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-300"
        />
        <p className="text-xs sm:text-sm text-neutral-900 dark:text-neutral-100">
          Like to contribute?
        </p>
      </div>
      <Link
        href="https://github.com/raghunandhanvr/dataatmos"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors duration-300 break-all sm:break-normal"
      >
        <span className="font-mono">github.com/raghunandhanvr/dataatmos</span>
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
)

export default function Home() {
  return (
    <MainLayout>
      <div className="bg-background">
        <div className="w-full relative">
          <FlickeringGrid
            className="absolute inset-0 pointer-events-none"
            squareSize={4}
            gridGap={6}
            flickerChance={0.1}
            color="rgb(59, 130, 246)"
            maxOpacity={0.1}
          />
          <div className="max-w-7xl mx-auto relative">
            <NewsTicker />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-fr lg:auto-rows-[230px] border border-neutral-200 dark:border-neutral-800">
                  {FEATURES.left.map(feature => (
                    <Feature
                      key={feature.title}
                      title={feature.title}
                      description={feature.description}
                      size={feature.size as "large" | "medium" | "small" | "full"}
                      type={
                        feature.type &&
                        ["marketing", "globe", "cta", "feature"].includes(feature.type)
                          ? (feature.type as "marketing" | "globe" | "cta" | "feature")
                          : undefined
                      }
                      {...("aboveTitle" in feature ? { aboveTitle: feature.aboveTitle } : {})}
                      {...("icon" in feature && { icon: feature.icon })}
                      {...("showDbIcons" in feature && { showDbIcons: feature.showDbIcons })}
                    />
                  ))}
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="grid grid-rows-2 h-full lg:min-h-[900px] border-r border-b border-neutral-200 dark:border-neutral-800">
                  {FEATURES.right.map(feature => (
                    <Feature
                      key={feature.title}
                      title={feature.title}
                      description={feature.description}
                      size={feature.size as "large" | "medium" | "small" | "full"}
                      type={
                        ["marketing", "globe", "cta", "feature"].includes(feature.type)
                          ? (feature.type as "marketing" | "globe" | "cta" | "feature")
                          : undefined
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <GitHubFooter />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
