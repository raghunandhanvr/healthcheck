'use client'

import { cn } from '@/lib/utils/common'

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: '', color: '' }
    
    let score = 0
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
    

    if (checks.length) score += 1
    if (checks.lowercase) score += 1
    if (checks.uppercase) score += 1
    if (checks.number) score += 1
    if (checks.special) score += 1
    

    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' }
    if (score <= 3) return { score, label: 'Fair', color: 'bg-yellow-500' }
    if (score <= 4) return { score, label: 'Good', color: 'bg-blue-500' }
    return { score, label: 'Strong', color: 'bg-green-500' }
  }
  
  const strength = getPasswordStrength(password)
  
  if (!password) return null
  
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Password strength</span>
        <span className={cn(
          'text-xs font-medium',
          strength.score <= 2 ? 'text-red-600' :
          strength.score <= 3 ? 'text-yellow-600' :
          strength.score <= 4 ? 'text-blue-600' :
          'text-green-600'
        )}>
          {strength.label}
        </span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              level <= strength.score 
                ? strength.color 
                : 'bg-muted'
            )}
          />
        ))}
      </div>
      {password.length > 0 && password.length < 8 && (
        <p className="text-xs text-red-600">
          Password must be at least 8 characters long
        </p>
      )}
    </div>
  )
}
