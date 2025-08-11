import { Pool } from 'pg';
import { BaseRepository } from './base';
import { Account } from '../types/db/account';

export class AccountRepository extends BaseRepository<Account> {
  constructor(pool: Pool) {
    super(pool, 'account');
  }

  async findByUserId(userId: string): Promise<Account[]> {
    return this.findMany({ where: { userId } });
  }

  async findByProvider(providerId: string): Promise<Account[]> {
    return this.findMany({ where: { providerId } });
  }

  async findByAccountId(accountId: string): Promise<Account[]> {
    return this.findMany({ where: { accountId } });
  }

  async findByUserAndProvider(userId: string, providerId: string): Promise<Account | null> {
    return this.findOne({ where: { userId, providerId } });
  }

  async findByAccountIdAndProvider(accountId: string, providerId: string): Promise<Account | null> {
    return this.findOne({ where: { accountId, providerId } });
  }

  async findExpiredAccessTokens(): Promise<Account[]> {
    return this.rawQuery(
      'SELECT * FROM "account" WHERE "accessTokenExpiresAt" <= NOW() AND "accessTokenExpiresAt" IS NOT NULL'
    );
  }

  async findExpiredRefreshTokens(): Promise<Account[]> {
    return this.rawQuery(
      'SELECT * FROM "account" WHERE "refreshTokenExpiresAt" <= NOW() AND "refreshTokenExpiresAt" IS NOT NULL'
    );
  }

  async updateAccessToken(accountId: string, accessToken: string, expiresAt?: Date): Promise<Account | null> {
    return this.updateById(accountId, {
      accessToken,
      accessTokenExpiresAt: expiresAt
    });
  }

  async updateRefreshToken(accountId: string, refreshToken: string, expiresAt?: Date): Promise<Account | null> {
    return this.updateById(accountId, {
      refreshToken,
      refreshTokenExpiresAt: expiresAt
    });
  }

  async updateTokens(
    accountId: string, 
    accessToken: string, 
    refreshToken: string, 
    accessTokenExpiresAt?: Date, 
    refreshTokenExpiresAt?: Date
  ): Promise<Account | null> {
    return this.updateById(accountId, {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt
    });
  }

  async clearTokens(accountId: string): Promise<Account | null> {
    return this.updateById(accountId, {
      accessToken: undefined,
      refreshToken: undefined,
      accessTokenExpiresAt: undefined,
      refreshTokenExpiresAt: undefined
    });
  }
}