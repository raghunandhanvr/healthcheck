import { createAuthClient } from "better-auth/react";
import {
  twoFactorClient,
  multiSessionClient,
  passkeyClient,
  adminClient,
  organizationClient,
} from "better-auth/client/plugins";

export const client = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",

  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/auth/two-factor";
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
        console.error("Too many requests. Please try again later.");
      }
    },
  },
});

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
} = client;

export const sessionHelpers = {
  signOutAll: () => client.signOut(),

  signOutCurrent: async () => {
    const sessions = await client.multiSession.listDeviceSessions();
    if (sessions?.data && Array.isArray(sessions.data)) {
      const currentSession = await client.getSession();
      if (currentSession?.data?.session?.token) {
        return client.multiSession.revoke({
          sessionToken: currentSession.data.session.token,
        });
      }
    }
  },

  switchSession: (sessionToken: string) =>
    client.multiSession.setActive({ sessionToken }),

  listAllSessions: () => client.multiSession.listDeviceSessions(),

  revokeSession: (sessionToken: string) =>
    client.multiSession.revoke({ sessionToken }),
};
