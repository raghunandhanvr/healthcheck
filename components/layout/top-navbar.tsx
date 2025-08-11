'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { Logo } from '@/components/ui/logo'
import { CpuIcon } from '@/components/ui/icons/cpu'
import { HomeIcon } from '@/components/ui/icons/home'
import { GithubIcon } from '@/components/ui/icons/github'
import { useSession } from '@/lib/auth/auth-client'
import { ProfileDropdown } from './profile-dropdown'
import { useSidebarContext } from '@/lib/providers/sidebar-provider'
import { SidebarMenuItem } from '@/lib/interface/sidebar'
import { ChevronDownIcon } from '@/components/ui/icons/chevron-down'

export default function TopNavbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  
  const user = session?.user
  const isConsole = pathname.startsWith('/console')
  const isAuth = pathname.startsWith('/auth')
  const isMarketing = ['/', '/pricing'].includes(pathname)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (mobileNavOpen && !target.closest('.mobile-nav-container')) {
        setMobileNavOpen(false)
      }
    }

    if (mobileNavOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileNavOpen])

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen(prev => !prev)
  }, [])

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false)
  }, [])

  return (
    <>
      <nav className={`sticky top-0 z-50 w-full bg-surface-secondary/95 backdrop-blur ${!isAuth ? 'border-b border-border' : ''}`}>
        <div className={`w-full px-5 sm:px-6 lg:px-8 ${(isMarketing || isAuth) ? 'lg:max-w-7xl lg:mx-auto lg:px-0' : ''}`}>
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href={user ? "/console" : "/"} className="flex items-center">
                <Logo />
              </Link>
              
              {isConsole && (
                <div className="md:hidden mobile-nav-container">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">/</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 gap-2 hover:bg-sidebar-accent/50"
                      onClick={toggleMobileNav}
                    >
                      <MobileActiveItem />
                      <ChevronDownIcon 
                        size={14} 
                        className={`transition-transform duration-200 ${mobileNavOpen ? 'rotate-180' : ''}`}
                      />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">

              {mounted && user && isMarketing && (
                <div className="hidden sm:block text-sm text-muted-foreground">
                  Welcome back, <span className="font-medium">{user.name}</span>
                </div>
              )}

              {mounted && (
                <>
                  {user && (isMarketing || isAuth) && !isConsole && (
                    <Button size="sm" asChild>
                      <Link href="/console" className="flex items-center gap-2">
                        <CpuIcon size={15} />
                        Console
                      </Link>
                    </Button>
                  )}
                  
                  {!user && !isConsole && (
                    <Button size="sm" asChild>
                      <Link href={isAuth ? "/" : "/auth"} className="flex items-center gap-2">
                        {isAuth ? <HomeIcon size={15} /> : <CpuIcon size={15} />}
                        {isAuth ? "Home" : "Console"}
                      </Link>
                    </Button>
                  )}
                </>
              )}

              {mounted && user && isConsole && (
                <ProfileDropdown user={user} />
              )}

              {!isConsole && (
                <>
                  <Link 
                    href="https://github.com/raghunandhanvr/healthcheck" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-4 w-4 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <GithubIcon size={15} />
                  </Link>

                  <ThemeSwitcher />
                </>
              )}

              {mounted && user && isConsole && <ThemeSwitcher />}
            </div>
          </div>
        </div>
      </nav>
      
      {isConsole && mobileNavOpen && (
        <div className="md:hidden bg-surface-secondary/95 backdrop-blur border-b border-border mobile-nav-container relative z-40">
          <MobileNavigationMenu onClose={closeMobileNav} />
        </div>
      )}
    </>
  )
}

function MobileActiveItem() {
  const { menuItems, currentPath } = useSidebarContext()
  
  const activeItem = useMemo(() => 
    menuItems.find(item => item.href === currentPath), 
    [menuItems, currentPath]
  )
  
  if (!activeItem) {
    return <span className="text-xs font-normal text-muted-foreground">Console</span>
  }
  
  const Icon = activeItem.icon
  
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="shrink-0 flex items-center stroke-[1.5] text-primary" />
      <span className="text-xs font-normal text-foreground">{activeItem.label}</span>
    </div>
  )
}

function MobileNavigationMenu({ onClose }: { onClose: () => void }) {
  const { menuItems, currentPath } = useSidebarContext()
  
  const navigationItems = useMemo(() => 
    menuItems.map(item => ({
      ...item,
      isActive: currentPath === item.href
    })), 
    [menuItems, currentPath]
  )
  
  return (
    <div className="px-5 sm:px-6 lg:px-8 py-3">
      <div className="space-y-0.5">
        {navigationItems.map((item) => {
          const Icon = item.icon
          
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors duration-200 w-full ${
                item.isActive
                  ? 'bg-primary/10'
                  : 'hover:bg-accent/30'
              }`}
            >
              <Icon 
                size={14} 
                className={`shrink-0 flex items-center stroke-[1.5] ${
                  item.isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`} 
              />
              <span className={`text-xs font-normal ${
                item.isActive 
                  ? 'text-foreground' 
                  : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}