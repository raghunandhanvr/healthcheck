export interface PublicUser {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string
  role?: string
  twoFactorEnabled?: boolean
  plan: string
  subscriptionStatus?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserWithProvider extends PublicUser {
  hasCredentialsProvider: boolean
}
