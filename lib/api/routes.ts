export const API_ROUTES = {
  USER: {
    GET_PROFILE: '/api/user',
    UPDATE_PROFILE: '/api/user',
    DELETE_PROFILE: '/api/user',
  },
  
  AUTH: {
    SESSIONS: '/api/auth/sessions',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESET_PASSWORD: '/api/auth/reset-password',
    TWO_FACTOR: '/api/auth/two-factor',
  },
  
  ORGANIZATION: {
    LIST: '/api/organizations',
    GET: (id: string) => `/api/organizations/${id}`,
    CREATE: '/api/organizations',
    UPDATE: (id: string) => `/api/organizations/${id}`,
    DELETE: (id: string) => `/api/organizations/${id}`,
    MEMBERS: (id: string) => `/api/organizations/${id}/members`,
    INVITE: (id: string) => `/api/organizations/${id}/invite`,
  },
  
  PROJECT: {
    LIST: '/api/projects',
    GET: (id: string) => `/api/projects/${id}`,
    CREATE: '/api/projects',
    UPDATE: (id: string) => `/api/projects/${id}`,
    DELETE: (id: string) => `/api/projects/${id}`,
    HEALTH: (id: string) => `/api/projects/${id}/health`,
    MONITORING: (id: string) => `/api/projects/${id}/monitoring`,
    BACKUPS: (id: string) => `/api/projects/${id}/backups`,
  },
} as const

export const API_CONFIG = {
  DEFAULT_TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const

export function buildApiUrl(route: string, params?: Record<string, string | number | boolean>): string {
  if (!params) return route
  
  const url = new URL(route, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })
  
  return url.pathname + url.search
}