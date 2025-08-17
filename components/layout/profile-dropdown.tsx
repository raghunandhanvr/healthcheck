"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GithubIcon } from "@/components/ui/icons/github"
import { IdCardIcon } from "@/components/ui/icons/id-card"
import { LogoutIcon } from "@/components/ui/icons/logout"
import { toast } from "@/components/ui/sonner"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { signOut } from "@/lib/auth/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
            router.push("/")
          },
          onError: () => {
            toast.error("Error signing out")
          },
        },
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
              {user.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
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
        <DropdownMenuItem asChild>
          <Link
            href="https://github.com/raghunandhanvr/dataatmos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <GithubIcon size={15} className="mr-2" />
            GitHub
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
          <div className="mr-2 text-red-600">
            <LogoutIcon size={15} />
          </div>
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Theme</span>
            <ThemeSwitcher />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
