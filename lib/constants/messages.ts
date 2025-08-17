// Toast Messages
export const TOAST_MESSAGES = {
  // Success messages
  SUCCESS: {
    SIGN_IN: "Successfully signed in!",
    SIGN_OUT: "Signed out successfully",
    PROFILE_UPDATED: "Profile updated successfully",
    PASSWORD_CHANGED: "Password changed successfully",
    PASSWORD_RESET: "Password reset successful!",
    TWO_FA_ENABLED: "2FA enabled successfully",
    TWO_FA_DISABLED: "2FA disabled successfully",
    TWO_FA_SUCCESS: "Two-factor authentication successful!",
    INVITATION_ACCEPTED: "Invitation accepted successfully!",
    INVITATION_DECLINED: "Invitation declined",
    PASSWORD_RESET_EMAIL_SENT: "Password reset email sent! Check your inbox.",
  },

  // Error messages
  ERROR: {
    SIGN_IN_FAILED: "Failed to sign in",
    SIGN_IN_GOOGLE_FAILED: "Failed to sign in with Google",
    SIGN_UP_GOOGLE_FAILED: "Failed to sign up with Google",
    SIGN_OUT_FAILED: "Error signing out",
    PROFILE_UPDATE_FAILED: "Failed to update profile",
    PASSWORD_CHANGE_FAILED: "Failed to change password",
    PASSWORD_RESET_FAILED: "Failed to reset password",
    PASSWORD_RESET_EMAIL_FAILED: "Failed to send reset email",
    PASSWORDS_NO_MATCH: "Passwords do not match",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long",
    PASSWORD_MIN_LENGTH_PROFILE: "Password must be at least 8 characters",
    INVALID_RESET_TOKEN: "Invalid or missing reset token",
    INVALID_TOTP_CODE: "Invalid TOTP code",
    INVALID_VERIFICATION_CODE: "Invalid verification code",
    TOTP_MUST_BE_6_DIGITS: "TOTP code must be 6 digits",
    TWO_FA_ENABLE_FAILED: "Failed to enable 2FA",
    TWO_FA_DISABLE_FAILED: "Failed to disable 2FA",
    TWO_FA_VERIFY_FAILED: "Failed to verify TOTP",
    ACCOUNT_CREATE_FAILED: "Failed to create account",
    INVITATION_ACCEPT_FAILED: "Failed to accept invitation",
    INVITATION_DECLINE_FAILED: "Failed to decline invitation",
    FETCH_INVITATION_FAILED: "Failed to fetch invitation",
  },
} as const

// Email Messages
export const EMAIL_MESSAGES = {
  SUBJECTS: {
    VERIFY_EMAIL: "Verify your email address",
    RESET_PASSWORD: "Reset your password",
  },

  ERROR_MESSAGES: {
    SEND_VERIFICATION_FAILED: "Failed to send verification email",
    SEND_RESET_FAILED: "Failed to send password reset email",
    SEND_OTP_FAILED: "Failed to send OTP email",
    SEND_INVITATION_FAILED: "Failed to send environment invitation email",
  },
} as const

// Auth Messages
export const AUTH_MESSAGES = {
  DEFAULT_BAN_REASON: "Violation of terms of service",
  DEFAULT_USER_NAME: "User",
} as const

// UI Messages
export const UI_MESSAGES = {
  BUTTONS: {
    DECLINE: "Decline",
    ACCEPT_INVITATION: "Accept Invitation",
    VERIFY_CODE: "Verify Code",
  },

  LABELS: {
    CONSOLE: "Console",
    PROFILE_SETTINGS: "Profile Settings",
    HOME: "Home",
    CURRENT_SESSION: "Current Session",
    OTHER_SESSION: "Other Session",
    UNKNOWN_DEVICE: "Unknown Device",
  },

  TITLES: {
    REVOKE_SESSION: "Revoke session",
  },
} as const

// Device/Browser Detection
export const DEVICE_CONSTANTS = {
  BROWSERS: {
    CHROME: "Chrome",
    FIREFOX: "Firefox",
    SAFARI: "Safari",
    EDGE: "Edge",
    BROWSER: "Browser", // fallback
  },

  OPERATING_SYSTEMS: {
    WINDOWS: "Windows",
    MACOS: "macOS",
    LINUX: "Linux",
    ANDROID: "Android",
    IOS: "iOS",
    OS: "OS", // fallback
  },
} as const

// Status Constants
export const STATUS_CONSTANTS = {
  USER_ROLES: {
    USER: "User",
    ADMIN: "admin",
  },

  INVITATION_STATUS: {
    PENDING: "pending",
    ACCEPTED: "accepted",
    REJECTED: "rejected",
    CANCELLED: "cancelled",
  },
} as const
