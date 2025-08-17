"use client"

import { Button } from "@/components/ui/button"
import { CpuIcon } from "@/components/ui/icons/cpu"
import { GithubIcon } from "@/components/ui/icons/github"
import { HomeIcon } from "@/components/ui/icons/home"
import { MessageCircleIcon } from "@/components/ui/icons/message-circle"
import { Logo } from "@/components/ui/logo"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { useSession } from "@/lib/auth/auth-client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function DefaultNavbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  const user = session?.user
  const isAuth = pathname.startsWith("/auth")
  const isMarketing = ["/", "/pricing"].includes(pathname)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-surface-secondary/95 backdrop-blur ${!isAuth ? "border-b border-border" : ""}`}
    >
      <div
        className={`w-full px-5 sm:px-6 lg:px-8 ${isMarketing || isAuth ? "lg:max-w-7xl lg:mx-auto lg:px-0" : ""}`}
      >
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={user ? "/console" : "/"} className="flex items-center">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {mounted && user && isMarketing && (
              <div className="hidden sm:block text-sm text-muted-foreground">
                Welcome back, <span className="font-medium">{user.name}</span>
              </div>
            )}

            {mounted && (
              <>
                {user && (isMarketing || isAuth) && (
                  <Button size="sm" asChild>
                    <Link href="/console" className="flex items-center gap-2">
                      <CpuIcon size={15} />
                      Console
                    </Link>
                  </Button>
                )}

                {!user && (
                  <Button size="sm" asChild>
                    <Link href={isAuth ? "/" : "/auth"} className="flex items-center gap-2">
                      {isAuth ? <HomeIcon size={15} /> : <CpuIcon size={15} />}
                      {isAuth ? "Home" : "Console"}
                    </Link>
                  </Button>
                )}
              </>
            )}

            {isMarketing && (
              <a
                href="https://cal.com/raghuvr/data-atmos-demo?duration=30"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/30"
              >
                <MessageCircleIcon size={15} />
                Talk to us
              </a>
            )}

            <Link
              href="https://github.com/raghunandhanvr/dataatmos"
              target="_blank"
              rel="noopener noreferrer"
              className="h-4 w-4 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon size={15} />
            </Link>

            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}