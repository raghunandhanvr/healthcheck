import { createAuthClient } from "better-auth/react";
import { 
  twoFactorClient, 
  multiSessionClient,
  passkeyClient,
  adminClient,
  organizationClient 
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
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
} = authClient;

// Export the client directly for compatibility
export { authClient as client };

export const sessionHelpers = {
  signOutAll: () => authClient.signOut(),
  
  signOutCurrent: async () => {
    const sessions = await authClient.multiSession.listDeviceSessions();
    if (sessions?.data && Array.isArray(sessions.data)) {
      const currentSession = await authClient.getSession();
      if (currentSession?.data?.session?.token) {
        return authClient.multiSession.revoke({ sessionToken: currentSession.data.session.token });
      }
    }
  },
  
  switchSession: (sessionToken: string) => 
    authClient.multiSession.setActive({ sessionToken }),
  
  listAllSessions: () => 
    authClient.multiSession.listDeviceSessions(),
  
  revokeSession: (sessionToken: string) => 
    authClient.multiSession.revoke({ sessionToken }),
};