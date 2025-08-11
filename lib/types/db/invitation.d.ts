export interface Invitation {
  id: string;
  organizationId: string;
  email: string;
  role?: string;
  status: string;
  expiresAt: Date;
  inviterId: string;
}

export interface CreateInvitationData {
  id?: string;
  organizationId: string;
  email: string;
  role?: string;
  status: string;
  expiresAt: Date;
  inviterId: string;
}

export interface UpdateInvitationData {
  organizationId?: string;
  email?: string;
  role?: string;
  status?: string;
  expiresAt?: Date;
  inviterId?: string;
}