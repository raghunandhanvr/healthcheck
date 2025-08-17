"use client"

import { useApi, useLazyApi, useMutation, UseApiOptions } from "../hooks"
import { API_ROUTES } from "../routes"
import type { UserWithProvider } from "@/lib/types/api/user"

export function useUserProfile(options?: UseApiOptions) {
  return useApi<UserWithProvider>(API_ROUTES.USER.GET_PROFILE, {
    ...options,
    lazy: options?.lazy ?? false,
  })
}

export function useLazyUserProfile(options?: Omit<UseApiOptions, "immediate" | "lazy">) {
  return useLazyApi<UserWithProvider>(API_ROUTES.USER.GET_PROFILE, options)
}

export function useUpdateUserProfile() {
  return useMutation<UserWithProvider, Partial<UserWithProvider>>()
}

export function useDeleteUserProfile() {
  return useMutation<{ success: boolean }, void>()
}
