import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { admin, multiSession, twoFactor, organization } from "better-auth/plugins"
import { passkey } from "better-auth/plugins/passkey"
import { pgConnection } from "@/lib/database/postgres"
import { AUTH_MESSAGES, CONFIG } from "@/lib/constants"

export const auth = betterAuth({
  database: pgConnection,
  basePath: "/api/auth",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieAttributes: {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      domain: process.env.NODE_ENV === "production" ? "dataatmos.ai" : undefined,
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    sendResetPassword: async ({ user, url, token }) => {
      const { sendPasswordResetEmail } = await import("@/lib/services/email-service")
      await sendPasswordResetEmail({ user, url, token })
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      const { sendVerificationEmail } = await import("@/lib/services/email-service")
      await sendVerificationEmail({ user, url, token })
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },

  rateLimit: {
    window: 60,
    max: 10,
  },

  plugins: [
    nextCookies(),
    organization({
      allowUserToCreateOrganization: true,
      organizationLimit: 2,
      membershipLimit: 5,
      creatorRole: "owner",
      invitationExpiresIn: 60 * 60 * 48,
      cancelPendingInvitationsOnReInvite: true,
      invitationLimit: 20,
      async sendInvitationEmail(data) {
        const { sendOrganizationInvitationEmail } = await import("@/lib/services/email-service")
        await sendOrganizationInvitationEmail({
          email: data.email,
          invitedByUsername: data.inviter.user.name,
          invitedByEmail: data.inviter.user.email,
          organizationName: data.organization.name,
          inviteLink: `${process.env.BETTER_AUTH_URL}/accept-invitation/${data.id}`,
          invitationId: data.id,
        })
      },
    }),
    admin({
      adminUserIds: [process.env.RAGHU_USER_ID as string],
      defaultRole: "user",
      adminRoles: ["admin"],
      impersonationSessionDuration: 60 * 60 * 2,
      defaultBanReason: AUTH_MESSAGES.DEFAULT_BAN_REASON,
      defaultBanExpiresIn: 60 * 60 * 24 * 7,
      bannedUserMessage:
        "Your account has been suspended. Please contact support at support@dataatmos.ai if you believe this is an error.",
    }),
    twoFactor({
      issuer: "dataatmos.ai",
      totpOptions: {
        digits: 6,
        period: 30,
      },
      otpOptions: {
        async sendOTP({ user, otp }) {
          const { sendOTPEmail } = await import("@/lib/services/email-service")
          await sendOTPEmail({ user, otp })
        },
        period: 5,
        storeOTP: "plain",
      },
      backupCodeOptions: {
        amount: 10,
        length: 10,
        storeBackupCodes: "plain",
      },
      skipVerificationOnEnable: false,
    }),
    multiSession({
      maximumSessions: 5,
    }),
    passkey({
      rpID: "dataatmos.ai",
      rpName: "Data Atmos",
      origin:
        process.env.NODE_ENV === "production" ? "https://dataatmos.ai" : "http://localhost:3000",
    }),
  ],

  trustedOrigins: ["exp://", process.env.BETTER_AUTH_URL || "http://localhost:3000"],

  advanced: {
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === "production",
      domain: ".dataatmos.ai",
    },
  },

  ...(process.env.NODE_ENV === "production" && {
    strictMode: true,
    forceHTTPS: true,
    securityHeaders: {
      contentSecurityPolicy: true,
      xFrameOptions: CONFIG.SECURITY.X_FRAME_OPTIONS,
      xContentTypeOptions: "nosniff",
      referrerPolicy: "strict-origin-when-cross-origin",
    },
  }),
})
