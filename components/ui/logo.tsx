'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  alt?: string
}

export function Logo({ 
  width = 24, 
  height = 24, 
  className = "h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-200 group-hover:scale-110",
  alt = "Data Atmos"
}: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const logoSrc = mounted && (resolvedTheme === "dark") ? "/logo-white.svg" : "/logo.svg"

  return (
    <Image
      src={logoSrc || "/logo.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}
