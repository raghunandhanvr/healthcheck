import { Pool } from 'pg';
import { BaseRepository } from './base';
import { Verification } from '../types/db/verification';

export class VerificationRepository extends BaseRepository<Verification> {
  constructor(pool: Pool) {
    super(pool, 'verification');
  }

  async findByIdentifier(identifier: string): Promise<Verification[]> {
    return this.findMany({ where: { identifier } });
  }

  async findByValue(value: string): Promise<Verification | null> {
    return this.findOne({ where: { value } });
  }

  async findByIdentifierAndValue(identifier: string, value: string): Promise<Verification | null> {
    return this.findOne({ where: { identifier, value } });
  }

  async findExpiredVerifications(): Promise<Verification[]> {
    return this.rawQuery(
      'SELECT * FROM "verification" WHERE "expiresAt" <= NOW()'
    );
  }

  async findActiveVerifications(): Promise<Verification[]> {
    return this.rawQuery(
      'SELECT * FROM "verification" WHERE "expiresAt" > NOW()'
    );
  }

  async findByIdentifierActive(identifier: string): Promise<Verification[]> {
    return this.rawQuery(
      'SELECT * FROM "verification" WHERE "identifier" = $1 AND "expiresAt" > NOW()',
      [identifier]
    );
  }

  async deleteExpiredVerifications(): Promise<Verification[]> {
    return this.rawQuery(
      'DELETE FROM "verification" WHERE "expiresAt" <= NOW() RETURNING *'
    );
  }

  async deleteByIdentifier(identifier: string): Promise<Verification[]> {
    return this.deleteMany({ identifier });
  }

  async isValueValid(identifier: string, value: string): Promise<boolean> {
    const verification = await this.rawQuery(
      'SELECT * FROM "verification" WHERE "identifier" = $1 AND "value" = $2 AND "expiresAt" > NOW() LIMIT 1',
      [identifier, value]
    );
    return verification.length > 0;
  }

  async consumeVerification(identifier: string, value: string): Promise<Verification | null> {
    const verification = await this.findByIdentifierAndValue(identifier, value);
    if (verification && verification.expiresAt > new Date()) {
      await this.deleteById(verification.id);
      return verification;
    }
    return null;
  }
}