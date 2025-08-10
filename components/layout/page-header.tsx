import { Separator } from "@/components/ui/separator"

interface PageHeaderProps {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <p className="text-lg font-medium text-foreground">{title}</p>
      <Separator className="mt-4" />
    </div>
  )
}
