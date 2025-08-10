import { Button } from "@/components/ui/button"

interface EmailVerificationBannerProps {
  isVerified: boolean | null | undefined
}

export function EmailVerificationBanner({ isVerified }: EmailVerificationBannerProps) {
  if (isVerified) return null

  return (
    <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 py-3 px-4 rounded-lg text-center">
      <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
        Please verify your email address to secure your account.
      </p>
      <Button size="sm" variant="outline" className="text-xs">
        Resend verification email
      </Button>
    </div>
  )
}
