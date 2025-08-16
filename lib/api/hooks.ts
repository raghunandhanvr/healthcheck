"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { apiClient, ApiError } from './client'
import type { ApiResponse } from './response'

export interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
  lastFetched: Date | null
}

export interface UseApiOptions {
  immediate?: boolean
  lazy?: boolean
  refetchOnMount?: boolean
  refetchInterval?: number
  onSuccess?: (data: unknown) => void
  onError?: (error: ApiError) => void
  enabled?: boolean
}

export function useApi<T>(
  url: string | (() => string),
  options: UseApiOptions = {}
): UseApiState<T> & {
  refetch: () => Promise<void>
  mutate: (data: T) => void
  reset: () => void
} {
  const {
    immediate = true,
    lazy = false,
    refetchOnMount = false,
    refetchInterval,
    onSuccess,
    onError,
    enabled = true,
  } = options

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef<boolean>(true)
  const lastUrlRef = useRef<string | undefined>(undefined)

  // Get current URL
  const getCurrentUrl = useCallback(() => {
    return typeof url === 'function' ? url() : url
  }, [url])

  // Fetch function
  const fetchData = useCallback(async () => {
    if (!enabled) return

    const currentUrl = getCurrentUrl()
    if (!currentUrl) return

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response: ApiResponse<T> = await apiClient.get(currentUrl)
      
      if (!mountedRef.current) return

      if (response.success && response.data !== undefined) {
        setState(prev => ({
          ...prev,
          data: response.data!,
          loading: false,
          lastFetched: new Date(),
        }))
        onSuccess?.(response.data)
      } else {
        throw new ApiError(
          response.error?.message || 'Request failed',
          {
            status: 500,
            code: response.error?.code || 'UNKNOWN_ERROR',
            details: response.error?.details,
          }
        )
      }
    } catch (error) {
      if (!mountedRef.current) return

      const apiError = error instanceof ApiError 
        ? error 
        : new ApiError('Unexpected error', {
            status: 500,
            code: 'UNEXPECTED_ERROR',
            details: error,
          })

      setState(prev => ({
        ...prev,
        loading: false,
        error: apiError,
      }))
      onError?.(apiError)
    }
  }, [getCurrentUrl, enabled, onSuccess, onError])

  // Refetch function
  const refetch = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  // Mutate function (optimistic updates)
  const mutate = useCallback((newData: T) => {
    setState(prev => ({
      ...prev,
      data: newData,
      lastFetched: new Date(),
    }))
  }, [])

  // Reset function
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      lastFetched: null,
    })
  }, [])

  // Effect for initial fetch
  useEffect(() => {
    mountedRef.current = true

    const currentUrl = getCurrentUrl()
    if (!lazy && immediate && enabled && currentUrl) {
      fetchData()
    } else if (refetchOnMount && state.lastFetched && currentUrl) {
      fetchData()
    }

    return () => {
      mountedRef.current = false
    }
  }, [getCurrentUrl, immediate, lazy, enabled, refetchOnMount, fetchData, state.lastFetched])

  // Effect for URL changes
  useEffect(() => {
    const currentUrl = getCurrentUrl()
    if (currentUrl && currentUrl !== lastUrlRef.current) {
      lastUrlRef.current = currentUrl
      if (!lazy && enabled) {
        fetchData()
      }
    }
  }, [getCurrentUrl, lazy, enabled, fetchData])

  // Effect for refetch interval
  useEffect(() => {
    if (refetchInterval && enabled && !lazy) {
      intervalRef.current = setInterval(fetchData, refetchInterval)
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [refetchInterval, enabled, lazy, fetchData])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    ...state,
    refetch,
    mutate,
    reset,
  }
}

export function useLazyApi<T>(
  url: string | (() => string),
  options: Omit<UseApiOptions, 'immediate' | 'lazy'> = {}
) {
  return useApi<T>(url, { ...options, immediate: false, lazy: true })
}

export function useMutation<TData = unknown, TVariables = unknown>() {
  const [state, setState] = useState<{
    data: TData | null
    loading: boolean
    error: ApiError | null
  }>({
    data: null,
    loading: false,
    error: null,
  })

  const mutate = useCallback(
    async (
      url: string,
      variables?: TVariables,
      options: {
        method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE'
        onSuccess?: (data: TData) => void
        onError?: (error: ApiError) => void
      } = {}
    ) => {
      const { method = 'POST', onSuccess, onError } = options

      setState(prev => ({ ...prev, loading: true, error: null }))

      try {
        let response: ApiResponse<TData>

        switch (method) {
          case 'POST':
            response = await apiClient.post<TData>(url, variables)
            break
          case 'PUT':
            response = await apiClient.put<TData>(url, variables)
            break
          case 'PATCH':
            response = await apiClient.patch<TData>(url, variables)
            break
          case 'DELETE':
            response = await apiClient.delete<TData>(url)
            break
          default:
            throw new Error(`Unsupported method: ${method}`)
        }

        if (response.success && response.data !== undefined) {
          setState({
            data: response.data,
            loading: false,
            error: null,
          })
          onSuccess?.(response.data)
          return response.data
        } else {
          throw new ApiError(
            response.error?.message || 'Mutation failed',
            {
              status: 500,
              code: response.error?.code || 'MUTATION_ERROR',
              details: response.error?.details,
            }
          )
        }
      } catch (error) {
        const apiError = error instanceof ApiError 
          ? error 
          : new ApiError('Unexpected error', {
              status: 500,
              code: 'UNEXPECTED_ERROR',
              details: error,
            })

        setState({
          data: null,
          loading: false,
          error: apiError,
        })
        onError?.(apiError)
        throw apiError
      }
    },
    []
  )

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    })
  }, [])

  return {
    ...state,
    mutate,
    reset,
  }
}