export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateVerificationData {
  id?: string;
  identifier: string;
  value: string;
  expiresAt: Date;
}

export interface UpdateVerificationData {
  identifier?: string;
  value?: string;
  expiresAt?: Date;
}