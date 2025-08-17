"use client"

import { useApi, useLazyApi, useMutation, UseApiOptions } from "../hooks"
import { API_ROUTES } from "../routes"

export interface SessionItem {
  session: {
    id: string
    userAgent?: string | null
    token: string
  }
  user: Record<string, unknown>
}

export function useActiveSessions(options?: UseApiOptions) {
  return useApi<SessionItem[]>(API_ROUTES.AUTH.SESSIONS, {
    ...options,
    lazy: options?.lazy ?? false,
  })
}

export function useLazyActiveSessions(options?: Omit<UseApiOptions, "immediate" | "lazy">) {
  return useLazyApi<SessionItem[]>(API_ROUTES.AUTH.SESSIONS, options)
}

export function useRevokeSession() {
  return useMutation<{ success: boolean }, { sessionId: string }>()
}

export function useSendEmailVerification() {
  return useMutation<{ success: boolean }, void>()
}

export function useVerifyEmail() {
  return useMutation<{ success: boolean }, { token: string }>()
}

export function usePasswordResetRequest() {
  return useMutation<{ success: boolean }, { email: string }>()
}

export function usePasswordReset() {
  return useMutation<
    { success: boolean },
    {
      token: string
      password: string
    }
  >()
}

export function useTwoFactorToggle() {
  return useMutation<
    { success: boolean; totpURI?: string },
    {
      action: "enable" | "disable"
      password: string
      code?: string
    }
  >()
}
