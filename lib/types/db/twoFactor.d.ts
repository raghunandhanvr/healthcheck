export interface TwoFactor {
  id: string
  secret: string
  backupCodes: string
  userId: string
}

export interface CreateTwoFactorData {
  id?: string
  secret: string
  backupCodes: string
  userId: string
}

export interface UpdateTwoFactorData {
  secret?: string
  backupCodes?: string
  userId?: string
}
