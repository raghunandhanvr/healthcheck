'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { GithubIcon } from '@/components/ui/icons/github'
import { IdCardIcon } from '@/components/ui/icons/id-card'
import { LogoutIcon } from '@/components/ui/icons/logout'
import { signOut } from '@/lib/auth/auth-client'
import { toast } from '@/components/ui/sonner'

interface ProfileDropdownProps {
  user: {
    name: string
    email: string
    image?: string | null
  }
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const router = useRouter()

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback className="text-xs">
              {user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
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
            <IdCardIcon size={15} className="mr-2" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link 
            href="https://github.com/raghunandhanvr/healthcheck" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <GithubIcon size={15} className="mr-2" />
            GitHub
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
          <LogoutIcon className="mr-2 h-4 w-4 text-red-600" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
