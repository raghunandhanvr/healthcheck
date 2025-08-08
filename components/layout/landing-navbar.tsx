import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { Logo } from '@/components/ui/logo'
import { CpuIcon } from '@/components/ui/icons/cpu'

export default function LandingNavbar() {

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
              <Link href="/auth" className="flex items-center gap-2">
                <CpuIcon size={16} />
                Open Console
              </Link>
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
