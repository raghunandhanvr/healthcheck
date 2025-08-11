import { Pool } from 'pg';
import { BaseRepository } from './base';
import { Session, UpdateSessionData } from '../types/db/session';

export class SessionRepository extends BaseRepository<Session> {
  constructor(pool: Pool) {
    super(pool, 'session');
  }

  async findByToken(token: string): Promise<Session | null> {
    return this.findOne({ where: { token } });
  }

  async findByUserId(userId: string): Promise<Session[]> {
    return this.findMany({ where: { userId } });
  }

  async findActiveByUserId(userId: string): Promise<Session[]> {
    return this.rawQuery(
      'SELECT * FROM "session" WHERE "userId" = $1 AND "expiresAt" > NOW()',
      [userId]
    );
  }

  async findExpiredSessions(): Promise<Session[]> {
    return this.rawQuery(
      'SELECT * FROM "session" WHERE "expiresAt" <= NOW()'
    );
  }

  async findByIpAddress(ipAddress: string): Promise<Session[]> {
    return this.findMany({ where: { ipAddress } });
  }

  async findByUserAgent(userAgent: string): Promise<Session[]> {
    return this.findMany({ where: { userAgent } });
  }

  async findByOrganization(organizationId: string): Promise<Session[]> {
    return this.findMany({ where: { activeOrganizationId: organizationId } });
  }

  async findImpersonatedSessions(impersonatorId: string): Promise<Session[]> {
    return this.findMany({ where: { impersonatedBy: impersonatorId } });
  }

  async deleteExpiredSessions(): Promise<Session[]> {
    return this.rawQuery(
      'DELETE FROM "session" WHERE "expiresAt" <= NOW() RETURNING *'
    );
  }

  async deleteUserSessions(userId: string): Promise<Session[]> {
    return this.deleteMany({ userId });
  }

  async extendSession(sessionId: string, newExpiresAt: Date): Promise<Session | null> {
    return this.updateById(sessionId, { expiresAt: newExpiresAt } as UpdateSessionData);
  }

  async switchOrganization(sessionId: string, organizationId: string): Promise<Session | null> {
    return this.updateById(sessionId, { activeOrganizationId: organizationId } as UpdateSessionData);
  }

  async startImpersonation(sessionId: string, impersonatorId: string): Promise<Session | null> {
    return this.updateById(sessionId, { impersonatedBy: impersonatorId } as UpdateSessionData);
  }

  async stopImpersonation(sessionId: string): Promise<Session | null> {
    return this.updateById(sessionId, { impersonatedBy: undefined });
  }
}