"use client"

import { useApi, useLazyApi, useMutation, UseApiOptions } from "../hooks"
import { API_ROUTES } from "../routes"

export interface Organization {
  id: string
  name: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface OrganizationMember {
  id: string
  userId: string
  organizationId: string
  role: "owner" | "admin" | "member"
  joinedAt: string
  user: {
    id: string
    name: string
    email: string
    image?: string
  }
}

export function useOrganizations(options?: UseApiOptions) {
  return useApi<Organization[]>(API_ROUTES.ORGANIZATION.LIST, options)
}

export function useOrganization(id: string, options?: UseApiOptions) {
  return useApi<Organization>(() => (id ? API_ROUTES.ORGANIZATION.GET(id) : ""), {
    ...options,
    enabled: Boolean(id) && (options?.enabled ?? true),
  })
}

export function useLazyOrganization(options?: Omit<UseApiOptions, "immediate" | "lazy">) {
  return useLazyApi<Organization>("", options)
}

export function useOrganizationMembers(id: string, options?: UseApiOptions) {
  return useApi<OrganizationMember[]>(() => (id ? API_ROUTES.ORGANIZATION.MEMBERS(id) : ""), {
    ...options,
    enabled: Boolean(id) && (options?.enabled ?? true),
  })
}

export function useCreateOrganization() {
  return useMutation<
    Organization,
    {
      name: string
      slug: string
      description?: string
    }
  >()
}

export function useUpdateOrganization() {
  return useMutation<
    Organization,
    {
      id: string
      name?: string
      slug?: string
      description?: string
    }
  >()
}

export function useDeleteOrganization() {
  return useMutation<{ success: boolean }, { id: string }>()
}

export function useInviteOrganizationMember() {
  return useMutation<
    { success: boolean },
    {
      organizationId: string
      email: string
      role: "admin" | "member"
    }
  >()
}

export function useRemoveOrganizationMember() {
  return useMutation<
    { success: boolean },
    {
      organizationId: string
      userId: string
    }
  >()
}

export function useUpdateMemberRole() {
  return useMutation<
    { success: boolean },
    {
      organizationId: string
      userId: string
      role: "admin" | "member"
    }
  >()
}
