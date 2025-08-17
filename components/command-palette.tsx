"use client"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useSession } from "@/lib/auth/auth-client"
import { navigationPages, type NavigationPage } from "@/lib/configs/navigation"
import { aliases } from "@/lib/configs/navigation-aliases"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  const filteredPages = useMemo(() => {
    const isAuthenticated = !!session?.user
    return navigationPages.filter(page => {
      if (page.requiresAuth && !isAuthenticated) return false
      if (!page.requiresAuth || isAuthenticated) return true
      return false
    })
  }, [session])

  const searchableItems = useMemo(() => {
    const items = [...filteredPages]

    aliases.forEach(alias => {
      const targetPage = navigationPages.find(page => page.href === alias.target)
      if (targetPage) {
        const isAuthenticated = !!session?.user
        if (targetPage.requiresAuth && !isAuthenticated) return

        items.push({
          ...targetPage,
          title: alias.alias,
          group: "Aliases",
        })
      }
    })

    return items
  }, [filteredPages, session])

  const groupedPages = searchableItems.reduce(
    (groups, page) => {
      if (!groups[page.group]) {
        groups[page.group] = []
      }
      groups[page.group].push(page)
      return groups
    },
    {} as Record<string, NavigationPage[]>
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(groupedPages).map(([groupName, groupPages]) => (
          <CommandGroup key={groupName} heading={groupName}>
            {groupPages.map((page, index) => {
              const IconComponent = page.icon
              return (
                <CommandItem
                  key={`${page.group}-${page.title}-${index}`}
                  value={page.title}
                  onSelect={() => runCommand(() => router.push(page.href))}
                >
                  <IconComponent size={16} />
                  <span>{page.title}</span>
                </CommandItem>
              )
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
