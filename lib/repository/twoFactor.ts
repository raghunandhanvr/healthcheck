import { Pool } from 'pg';
import { BaseRepository } from './base';
import { TwoFactor } from '../types/db/twoFactor';

export class TwoFactorRepository extends BaseRepository<TwoFactor> {
  constructor(pool: Pool) {
    super(pool, 'twoFactor');
  }

  async findByUserId(userId: string): Promise<TwoFactor | null> {
    return this.findOne({ where: { userId } });
  }

  async findBySecret(secret: string): Promise<TwoFactor | null> {
    return this.findOne({ where: { secret } });
  }

  async updateSecret(userId: string, secret: string): Promise<TwoFactor | null> {
    return this.updateOne({ userId }, { secret });
  }

  async updateBackupCodes(userId: string, backupCodes: string): Promise<TwoFactor | null> {
    return this.updateOne({ userId }, { backupCodes });
  }

  async regenerateBackupCodes(userId: string, newBackupCodes: string): Promise<TwoFactor | null> {
    return this.updateBackupCodes(userId, newBackupCodes);
  }

  async deleteByUserId(userId: string): Promise<TwoFactor | null> {
    return this.deleteOne({ userId });
  }

  async isUserTwoFactorEnabled(userId: string): Promise<boolean> {
    return this.exists({ userId });
  }
}