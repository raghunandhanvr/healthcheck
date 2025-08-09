'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { Logo } from '@/components/ui/logo'
import { CpuIcon } from '@/components/ui/icons/cpu'
import { HomeIcon } from '@/components/ui/icons/home'

export default function TopNavbar() {
  const pathname = usePathname()
  const marketingPages = ['/', '/pricing']
  const isMarketingPage = marketingPages.includes(pathname)
  
  const getButtonContent = () => {
    if (isMarketingPage) {
      return {
        href: '/auth',
        icon: <CpuIcon size={16} />,
        text: 'Open Console'
      }
    } else if (pathname === '/auth') {
      return {
        href: '/',
        icon: <HomeIcon size={16} />,
        text: 'Go to Home'
      }
    }
    return {
      href: '/auth',
      icon: <CpuIcon size={16} />,
      text: 'Open Console'
    }
  }

  const buttonContent = getButtonContent()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-2 bg-surface-secondary">
      <div className="layout-container">
        <div className="flex h-8 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center">
              <Logo />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="sm" asChild>
              <Link href={buttonContent.href} className="flex items-center gap-2">
                {buttonContent.icon}
                {buttonContent.text}
              </Link>
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
