"use client"

import { useApi, useLazyApi, useMutation, UseApiOptions } from '../hooks'
import { API_ROUTES } from '../routes'

export interface Project {
  id: string
  name: string
  slug: string
  description?: string
  organizationId: string
  status: 'active' | 'inactive' | 'maintenance'
  healthCheckUrl?: string
  createdAt: string
  updatedAt: string
}

export interface HealthCheckResult {
  id: string
  projectId: string
  status: 'healthy' | 'unhealthy' | 'warning'
  responseTime: number
  statusCode?: number
  error?: string
  checkedAt: string
}

export interface MonitoringConfig {
  id: string
  projectId: string
  interval: number
  timeout: number
  retries: number
  enabled: boolean
  notifications: {
    email: boolean
    slack: boolean
    webhook?: string
  }
}

export interface Backup {
  id: string
  projectId: string
  name: string
  size: number
  createdAt: string
  status: 'completed' | 'in_progress' | 'failed'
  downloadUrl?: string
}

export function useProjects(options?: UseApiOptions) {
  return useApi<Project[]>(API_ROUTES.PROJECT.LIST, options)
}

export function useProject(id: string, options?: UseApiOptions) {
  return useApi<Project>(
    () => id ? API_ROUTES.PROJECT.GET(id) : '',
    {
      ...options,
      enabled: Boolean(id) && (options?.enabled ?? true),
    }
  )
}

export function useLazyProject(options?: Omit<UseApiOptions, 'immediate' | 'lazy'>) {
  return useLazyApi<Project>('', options)
}

export function useProjectHealth(id: string, options?: UseApiOptions) {
  return useApi<HealthCheckResult[]>(
    () => id ? API_ROUTES.PROJECT.HEALTH(id) : '',
    {
      ...options,
      enabled: Boolean(id) && (options?.enabled ?? true),
      refetchInterval: 30000,
    }
  )
}

export function useProjectMonitoring(id: string, options?: UseApiOptions) {
  return useApi<MonitoringConfig>(
    () => id ? API_ROUTES.PROJECT.MONITORING(id) : '',
    {
      ...options,
      enabled: Boolean(id) && (options?.enabled ?? true),
    }
  )
}

export function useProjectBackups(id: string, options?: UseApiOptions) {
  return useApi<Backup[]>(
    () => id ? API_ROUTES.PROJECT.BACKUPS(id) : '',
    {
      ...options,
      enabled: Boolean(id) && (options?.enabled ?? true),
    }
  )
}

export function useCreateProject() {
  return useMutation<Project, {
    name: string
    slug: string
    description?: string
    organizationId: string
    healthCheckUrl?: string
  }>()
}

export function useUpdateProject() {
  return useMutation<Project, {
    id: string
    name?: string
    slug?: string
    description?: string
    healthCheckUrl?: string
    status?: 'active' | 'inactive' | 'maintenance'
  }>()
}

export function useDeleteProject() {
  return useMutation<{ success: boolean }, { id: string }>()
}

export function useUpdateMonitoring() {
  return useMutation<MonitoringConfig, {
    projectId: string
    interval?: number
    timeout?: number
    retries?: number
    enabled?: boolean
    notifications?: {
      email?: boolean
      slack?: boolean
      webhook?: string
    }
  }>()
}

export function useTriggerHealthCheck() {
  return useMutation<HealthCheckResult, { projectId: string }>()
}

export function useCreateBackup() {
  return useMutation<Backup, {
    projectId: string
    name: string
  }>()
}

export function useDeleteBackup() {
  return useMutation<{ success: boolean }, { 
    projectId: string
    backupId: string 
  }>()
}