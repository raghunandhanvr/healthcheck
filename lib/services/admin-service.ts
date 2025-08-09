import { authClient } from "@/lib/auth/auth-client";

export const adminHelpers = {
  createUser: async (data: {
    email: string;
    password: string;
    name: string;
    role?: AdminRole | AdminRole[];
    data?: Record<string, unknown>;
  }) => {
    return authClient.admin.createUser(data);
  },

  listUsers: async (options?: {
    searchValue?: string;
    searchField?: "email" | "name";
    searchOperator?: "contains" | "starts_with" | "ends_with";
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortDirection?: "asc" | "desc";
    filterField?: string;
    filterValue?: string | number | boolean;
    filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte";
  }) => {
    return authClient.admin.listUsers({ query: options || {} });
  },

  setUserRole: async (data: {
    userId: string;
    role: AdminRole | AdminRole[];
  }) => {
    return authClient.admin.setRole(data);
  },

  setUserPassword: async (data: {
    userId: string;
    newPassword: string;
  }) => {
    return authClient.admin.setUserPassword(data);
  },

  banUser: async (data: {
    userId: string;
    banReason?: string;
    banExpiresIn?: number;
  }) => {
    return authClient.admin.banUser(data);
  },

  unbanUser: async (userId: string) => {
    return authClient.admin.unbanUser({ userId });
  },

  listUserSessions: async (userId: string) => {
    return authClient.admin.listUserSessions({ userId });
  },

  revokeUserSession: async (sessionToken: string) => {
    return authClient.admin.revokeUserSession({ sessionToken });
  },

  revokeUserSessions: async (userId: string) => {
    return authClient.admin.revokeUserSessions({ userId });
  },

  impersonateUser: async (userId: string) => {
    return authClient.admin.impersonateUser({ userId });
  },

  stopImpersonating: () => {
    return authClient.admin.stopImpersonating();
  },

  removeUser: async (userId: string) => {
    return authClient.admin.removeUser({ userId });
  },

  hasPermission: async (data: {
    userId?: string;
    role?: AdminRole;
    permission?: Record<string, string[]>;
    permissions?: Record<string, string[]>;
  }) => {
    return authClient.admin.hasPermission(data);
  },

  checkRolePermission: (data: {
    permissions: Record<string, string[]>;
    role: AdminRole;
  }) => {
    return authClient.admin.checkRolePermission(data);
  },
};

export const adminRoles = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type AdminRole = (typeof adminRoles)[keyof typeof adminRoles];

export const adminUtils = {
  calculatePagination: (total: number, limit: number, offset: number) => {
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor(offset / limit) + 1;
    const nextPageOffset = Math.min(offset + limit, total - 1);
    const previousPageOffset = Math.max(0, offset - limit);
    
    return {
      totalPages,
      currentPage,
      nextPageOffset,
      previousPageOffset,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  },

  formatBanDuration: (banExpiresIn: number) => {
    const days = Math.floor(banExpiresIn / (60 * 60 * 24));
    const hours = Math.floor((banExpiresIn % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((banExpiresIn % (60 * 60)) / 60);

    if (days > 0) return `${days} day(s)`;
    if (hours > 0) return `${hours} hour(s)`;
    return `${minutes} minute(s)`;
  },

  isUserBanned: (user: { banned?: boolean; banExpires?: Date }) => {
    if (!user.banned) return false;
    if (!user.banExpires) return true;
    return new Date() < new Date(user.banExpires);
  },

  formatUserRole: (role?: string) => {
    if (!role) return "User";
    return role.split(",").map(r => 
      r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()
    ).join(", ");
  },
};