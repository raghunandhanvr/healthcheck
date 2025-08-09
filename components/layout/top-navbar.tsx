'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { Logo } from '@/components/ui/logo'
import { CpuIcon } from '@/components/ui/icons/cpu'
import { HomeIcon } from '@/components/ui/icons/home'
import { GithubIcon } from '@/components/ui/icons/github'
import { useSession, signOut } from '@/lib/auth/auth-client'
import { Settings, LogOut } from 'lucide-react'
import { toast } from '@/components/ui/sonner'

export default function TopNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  
  const user = session?.user
  const isConsole = pathname.startsWith('/console')
  const isAuth = pathname.startsWith('/auth')
  const isMarketing = ['/', '/pricing'].includes(pathname)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully")
            router.push('/')
          },
          onError: () => {
            toast.error("Error signing out")
          }
        }
      })
    } catch {
      toast.error("Error signing out")
    }
  }

  return (
    <nav className={`sticky top-0 z-50 w-full bg-surface-secondary/95 backdrop-blur ${!isAuth ? 'border-b border-border' : ''}`}>
      <div className={`w-full px-5 sm:px-6 lg:px-8 ${(isMarketing || isAuth) ? 'lg:max-w-7xl lg:mx-auto lg:px-0' : ''}`}>
        <div className="flex h-14 items-center justify-between">
          
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          
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
                      <CpuIcon size={16} />
                      Console
                    </Link>
                  </Button>
                )}
                
                {!user && !isConsole && (
                  <Button size="sm" asChild>
                    <Link href={isAuth ? "/" : "/auth"} className="flex items-center gap-2">
                      {isAuth ? <HomeIcon size={16} /> : <CpuIcon size={16} />}
                      {isAuth ? "Home" : "Console"}
                    </Link>
                  </Button>
                )}
              </>
            )}

            {mounted && user && isConsole && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || undefined} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/console/profile">
                      <Settings className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Link 
              href="https://github.com/raghunandhanvr/healthcheck" 
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