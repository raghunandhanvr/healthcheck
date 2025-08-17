export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string
  createdAt: Date
  updatedAt: Date
  role?: string
  banned?: boolean
  banReason?: string
  banExpires?: Date
  twoFactorEnabled?: boolean
  plan: string
  planStartDate?: Date
  planEndDate?: Date
  subscriptionStatus?: string
}

export interface CreateUserData {
  id?: string
  name: string
  email: string
  emailVerified: boolean
  image?: string
  role?: string
  banned?: boolean
  banReason?: string
  banExpires?: Date
  twoFactorEnabled?: boolean
  plan?: string
  planStartDate?: Date
  planEndDate?: Date
  subscriptionStatus?: string
}

export interface UpdateUserData {
  name?: string
  email?: string
  emailVerified?: boolean
  image?: string
  role?: string
  banned?: boolean
  banReason?: string
  banExpires?: Date
  twoFactorEnabled?: boolean
  plan?: string
  planStartDate?: Date
  planEndDate?: Date
  subscriptionStatus?: string
}
