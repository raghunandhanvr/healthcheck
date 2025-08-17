export interface Member {
  id: string
  organizationId: string
  userId: string
  role: string
  createdAt: Date
}

export interface CreateMemberData {
  id?: string
  organizationId: string
  userId: string
  role: string
}

export interface UpdateMemberData {
  organizationId?: string
  userId?: string
  role?: string
}
