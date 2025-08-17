import { Pool } from "pg"
import { BaseRepository } from "./base"
import { User, UpdateUserData } from "../types/db/user"

export class UserRepository extends BaseRepository<User> {
  constructor(pool: Pool) {
    super(pool, "user")
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } })
  }

  async findByEmailVerified(emailVerified: boolean): Promise<User[]> {
    return this.findMany({ where: { emailVerified } })
  }

  async findByRole(role: string): Promise<User[]> {
    return this.findMany({ where: { role } })
  }

  async findBanned(banned: boolean = true): Promise<User[]> {
    return this.findMany({ where: { banned } })
  }

  async findByPlan(plan: string): Promise<User[]> {
    return this.findMany({ where: { plan } })
  }

  async findActiveSubscriptions(): Promise<User[]> {
    return this.findMany({ where: { subscriptionStatus: "active" } })
  }

  async findExpiredBans(): Promise<User[]> {
    return this.rawQuery('SELECT * FROM "user" WHERE "banned" = true AND "banExpires" < NOW()')
  }

  async findTwoFactorEnabled(): Promise<User[]> {
    return this.findMany({ where: { twoFactorEnabled: true } })
  }

  async banUser(userId: string, reason: string, expiresAt?: Date): Promise<User | null> {
    return this.updateById(userId, {
      banned: true,
      banReason: reason,
      banExpires: expiresAt,
    } as UpdateUserData)
  }

  async unbanUser(userId: string): Promise<User | null> {
    return this.updateById(userId, {
      banned: false,
      banReason: undefined,
      banExpires: undefined,
    })
  }

  async updateSubscription(
    userId: string,
    plan: string,
    status: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<User | null> {
    return this.updateById(userId, {
      plan,
      subscriptionStatus: status,
      planStartDate: startDate,
      planEndDate: endDate,
    } as UpdateUserData)
  }
}
