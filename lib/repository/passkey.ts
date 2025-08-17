import { Pool } from "pg"
import { BaseRepository } from "./base"
import { Passkey } from "../types/db/passkey"

export class PasskeyRepository extends BaseRepository<Passkey> {
  constructor(pool: Pool) {
    super(pool, "passkey")
  }

  async findByUserId(userId: string): Promise<Passkey[]> {
    return this.findMany({ where: { userId } })
  }

  async findByCredentialId(credentialID: string): Promise<Passkey | null> {
    return this.findOne({ where: { credentialID } })
  }

  async findByDeviceType(deviceType: string): Promise<Passkey[]> {
    return this.findMany({ where: { deviceType } })
  }

  async findBackedUpPasskeys(): Promise<Passkey[]> {
    return this.findMany({ where: { backedUp: true } })
  }

  async findByUserAndCredentialId(userId: string, credentialID: string): Promise<Passkey | null> {
    return this.findOne({ where: { userId, credentialID } })
  }

  async updateCounter(passkeyId: string, counter: number): Promise<Passkey | null> {
    return this.updateById(passkeyId, { counter })
  }

  async updateName(passkeyId: string, name: string): Promise<Passkey | null> {
    return this.updateById(passkeyId, { name })
  }

  async deleteByUserId(userId: string): Promise<Passkey[]> {
    return this.deleteMany({ userId })
  }

  async deleteByCredentialId(credentialID: string): Promise<Passkey | null> {
    return this.deleteOne({ credentialID })
  }

  async getUserPasskeyCount(userId: string): Promise<number> {
    return this.count({ userId })
  }

  async findRecentPasskeys(userId: string, limit: number = 5): Promise<Passkey[]> {
    return this.findMany({
      where: { userId },
      orderBy: [{ column: "createdAt", direction: "DESC" }],
      limit,
    })
  }
}
