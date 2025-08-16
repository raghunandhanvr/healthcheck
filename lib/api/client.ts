import { API_CONFIG } from './routes'
import type { ApiResponse } from './response'

export class ApiClient {
  private baseUrl: string
  private defaultHeaders: HeadersInit

  constructor(baseUrl = '', defaultHeaders: HeadersInit = {}) {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    }
  }

  private async request<T>(
    url: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController()
    const timeoutId = setTimeout(
      () => controller.abort(),
      options.timeout || API_CONFIG.DEFAULT_TIMEOUT
    )

    try {
      const response = await fetch(this.baseUrl + url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data: ApiResponse<T> = await response.json()

      if (!response.ok) {
        throw new ApiError(data.error?.message || 'Request failed', {
          status: response.status,
          code: data.error?.code || 'UNKNOWN_ERROR',
          details: data.error?.details,
        })
      }

      return data
    } catch (error) {
      clearTimeout(timeoutId)

      if (
        retryCount < API_CONFIG.RETRY_ATTEMPTS &&
        (error instanceof TypeError || (error as Error).name === 'AbortError')
      ) {
        await new Promise(resolve => 
          setTimeout(resolve, API_CONFIG.RETRY_DELAY * (retryCount + 1))
        )
        return this.request<T>(url, options, retryCount + 1)
      }

      if (error instanceof ApiError) {
        throw error
      }

      throw new ApiError('Network error occurred', {
        status: 0,
        code: 'NETWORK_ERROR',
        details: error,
      })
    }
  }

  async get<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' })
  }

  async post<T>(
    url: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(
    url: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(
    url: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' })
  }
}

export class ApiError extends Error {
  public status: number
  public code: string
  public details?: unknown

  constructor(
    message: string,
    options: {
      status: number
      code: string
      details?: unknown
    }
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = options.status
    this.code = options.code
    this.details = options.details
  }
}

export const apiClient = new ApiClient()

export interface RequestOptions extends RequestInit {
  timeout?: number
}

declare global {
  interface RequestInit {
    timeout?: number
  }
}