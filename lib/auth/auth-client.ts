import { createAuthClient } from "better-auth/react"
import {
  twoFactorClient,
  multiSessionClient,
  passkeyClient,
  adminClient,
  organizationClient,
  jwtClient
} from "better-auth/client/plugins"

export const client = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",

  plugins: [
    jwtClient(),
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/auth/two-factor"
      },
    }),
    multiSessionClient(),
    passkeyClient(),
    adminClient(),
    organizationClient(),
  ],

  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        console.error("Too many requests. Please try again later.")
      }
    },
  },
})

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  twoFactor,
  passkey,
  multiSession,
  admin,
  organization,
} = client

export const jwtHelpers = {
  async getJWTToken(): Promise<string | null> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"}/api/auth/token`, {
        credentials: 'include',
      })
      
      if (!response.ok) {
        throw new Error('Failed to get JWT token')
      }
      
      const data = await response.json()
      return data.token || null
    } catch (error) {
      console.error('Error getting JWT token:', error)
      return null
    }
  },

  async getJWTFromSession(): Promise<string | null> {
    try {
      let jwtToken: string | null = null
      
      await getSession({
        fetchOptions: {
          onSuccess: (ctx) => {
            jwtToken = ctx.response.headers.get("set-auth-jwt")
          }
        }
      })
      
      return jwtToken
    } catch (error) {
      console.error('Error getting JWT from session:', error)
      return null
    }
  },

  async validateJWTToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"}/api/auth/jwks`)
      
      if (!response.ok) {
        return false
      }
      
      const { jwtVerify, createRemoteJWKSet } = await import('jose')
      const JWKS = createRemoteJWKSet(
        new URL(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"}/api/auth/jwks`)
      )
      
      await jwtVerify(token, JWKS, {
        issuer: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
        audience: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
      })
      
      return true
    } catch (error) {
      console.error('JWT validation failed:', error)
      return false
    }
  },

  async refreshJWTToken(): Promise<string | null> {
    try {
      const session = await getSession()
      
      if (!session?.data?.user) {
        throw new Error('No active session for token refresh')
      }
      
      return await this.getJWTToken()
    } catch (error) {
      console.error('JWT refresh failed:', error)
      return null
    }
  },

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp < currentTime
    } catch (error) {
      console.error('Error checking token expiration:', error)
      return true
    }
  }
}

export const sessionHelpers = {
  signOutAll: () => client.signOut(),

  signOutCurrent: async () => {
    const sessions = await client.multiSession.listDeviceSessions()
    if (sessions?.data && Array.isArray(sessions.data)) {
      const currentSession = await client.getSession()
      if (currentSession?.data?.session?.token) {
        return client.multiSession.revoke({
          sessionToken: currentSession.data.session.token,
        })
      }
    }
  },

  switchSession: (sessionToken: string) => client.multiSession.setActive({ sessionToken }),

  listAllSessions: () => client.multiSession.listDeviceSessions(),

  revokeSession: (sessionToken: string) => client.multiSession.revoke({ sessionToken }),
}
