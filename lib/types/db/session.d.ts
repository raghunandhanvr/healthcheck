export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
  activeOrganizationId?: string;
  impersonatedBy?: string;
}

export interface CreateSessionData {
  id?: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
  activeOrganizationId?: string;
  impersonatedBy?: string;
}

export interface UpdateSessionData {
  expiresAt?: Date;
  token?: string;
  ipAddress?: string;
  userAgent?: string;
  activeOrganizationId?: string;
  impersonatedBy?: string;
}