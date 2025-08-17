"use client"

import { setRedirect429Handler } from "@/lib/api/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function ApiErrorHandler() {
  const router = useRouter()

  useEffect(() => {
    setRedirect429Handler(() => {
      router.push("/429")
    })
  }, [router])

  return null
}