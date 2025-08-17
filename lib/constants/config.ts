// Configuration Constants
export const CONFIG = {
  // Security
  SECURITY: {
    X_FRAME_OPTIONS: "DENY",
    MIN_PASSWORD_LENGTH: 8,
    TOTP_CODE_LENGTH: 6,
  },

  // Default Values
  DEFAULTS: {
    USER_PLAN: "free",
    SUBSCRIPTION_STATUS: "active",
  },

  // Fonts
  FONTS: {
    MAIN: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    MONO: "Geist Mono, 'Courier New', monospace",
  },

  // App Info
  APP: {
    AUTHOR: "Raghunandhan V R",
    FEATURES: ["API monitoring", "SSL certificate monitoring", "AI model monitoring"],
  },
} as const

// API Endpoints (if you have any hardcoded ones)
export const API_ENDPOINTS = {
  // Add your API endpoints here
} as const

// Validation Constants
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  TOTP_CODE_LENGTH: 6,
} as const
