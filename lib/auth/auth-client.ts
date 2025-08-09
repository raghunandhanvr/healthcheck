import { createAuthClient } from "better-auth/client";
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
        window.location.href = "/auth/2fa";
      },
    }),
    multiSessionClient(),
    passkeyClient(),
    adminClient(),
    organizationClient(),
  ],
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