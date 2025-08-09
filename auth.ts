import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import {
  admin,
  multiSession,
  twoFactor,
  organization,
} from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { pgConnection } from "@/lib/database/postgres";

export const auth = betterAuth({
  database: pgConnection,
  basePath: "/api/auth",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    sendResetPassword: async ({ user, url, token }) => {
      const { sendPasswordResetEmail } = await import(
        "@/lib/services/email-service"
      );
      await sendPasswordResetEmail({ user, url, token });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      const { sendVerificationEmail } = await import(
        "@/lib/services/email-service"
      );
      await sendVerificationEmail({ user, url, token });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
      name: "hc_session",
    },
  },

  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://healthcheck.sh", "https://www.healthcheck.sh"]
        : ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  },

  rateLimit: {
    window: 60,
    max: 10,
  },

  advanced: {
    generateId: () => crypto.randomUUID(),
    csrfProtection: {
      enabled: true,
      cookieName: "hc_csrf",
    },
    disablePasswordAutocomplete: false,
    useSecurePasswordHashing: true,
  },

  accountLockout: {
    enabled: true,
    maxAttempts: 5,
    lockoutDuration: 60 * 15,
    progressiveDelay: true,
  },

  trustedDevice: {
    enabled: true,
    trustDuration: 60 * 60 * 24 * 30,
  },

  logger: {
    disabled: process.env.NODE_ENV === "production" ? false : true,
    level: process.env.NODE_ENV === "production" ? "warn" : "debug",
  },

  plugins: [
    nextCookies(),
    organization({
      allowUserToCreateOrganization: true,
      organizationLimit: 2,
      membershipLimit: 50,
      creatorRole: "owner",
      invitationExpiresIn: 60 * 60 * 48,
      cancelPendingInvitationsOnReInvite: true,
      invitationLimit: 20,
      async sendInvitationEmail(data) {
        const { sendOrganizationInvitationEmail } = await import(
          "@/lib/services/email-service"
        );
        await sendOrganizationInvitationEmail({
          email: data.email,
          invitedByUsername: data.inviter.user.name,
          invitedByEmail: data.inviter.user.email,
          organizationName: data.organization.name,
          inviteLink: `${process.env.BETTER_AUTH_URL}/accept-invitation/${data.id}`,
          invitationId: data.id,
        });
      },
    }),
    admin({
      adminUserIds: [process.env.RAGHU_USER_ID as string],
      defaultRole: "user",
      adminRoles: ["admin"],
      impersonationSessionDuration: 60 * 60 * 2,
      defaultBanReason: "Violation of terms of service",
      defaultBanExpiresIn: 60 * 60 * 24 * 7,
      bannedUserMessage:
        "Your account has been suspended. Please contact support at support@healthcheck.sh if you believe this is an error.",
    }),
    twoFactor({
      issuer: "healthcheck.sh",
      totpOptions: {
        digits: 6,
        period: 30,
      },
      otpOptions: {
        async sendOTP({ user, otp }) {
          const { sendOTPEmail } = await import("@/lib/services/email-service");
          await sendOTPEmail({ user, otp });
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
      rpID: "healthcheck.sh",
      rpName: "healthcheck.sh",
      origin:
        process.env.NODE_ENV === "production"
          ? "https://healthcheck.sh"
          : "http://localhost:3000",
    }),
  ],

  trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],

  ...(process.env.NODE_ENV === "production" && {
    strictMode: true,
    forceHTTPS: true,
    securityHeaders: {
      contentSecurityPolicy: true,
      xFrameOptions: "DENY",
      xContentTypeOptions: "nosniff",
      referrerPolicy: "strict-origin-when-cross-origin",
    },
  }),
});
