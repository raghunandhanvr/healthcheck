import { Badge } from "@/components/ui/badge"

interface LastUsedBadgeProps {
  show: boolean
  className?: string
}

export function LastUsedBadge({ show, className = "" }: LastUsedBadgeProps) {
  if (!show) return null

  return (
    <Badge
      variant="secondary"
      className={`
        text-[9px] px-2 py-0.5 font-medium uppercase tracking-wide
        text-white
        bg-gradient-to-r from-green-500 via-green-600 to-green-700
        border-0
        rounded
        ${className}
      `}
    >
      LAST
    </Badge>
  )
}
