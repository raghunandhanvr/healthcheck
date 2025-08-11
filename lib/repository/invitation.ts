import { Pool } from 'pg';
import { BaseRepository } from './base';
import { Invitation } from '../types/db/invitation';

export class InvitationRepository extends BaseRepository<Invitation> {
  constructor(pool: Pool) {
    super(pool, 'invitation');
  }

  async findByOrganizationId(organizationId: string): Promise<Invitation[]> {
    return this.findMany({ where: { organizationId } });
  }

  async findByEmail(email: string): Promise<Invitation[]> {
    return this.findMany({ where: { email } });
  }

  async findByStatus(status: string): Promise<Invitation[]> {
    return this.findMany({ where: { status } });
  }

  async findByInviterId(inviterId: string): Promise<Invitation[]> {
    return this.findMany({ where: { inviterId } });
  }

  async findByOrganizationAndEmail(organizationId: string, email: string): Promise<Invitation | null> {
    return this.findOne({ where: { organizationId, email } });
  }

  async findPendingInvitations(): Promise<Invitation[]> {
    return this.findMany({ where: { status: 'pending' } });
  }

  async findExpiredInvitations(): Promise<Invitation[]> {
    return this.rawQuery(
      'SELECT * FROM "invitation" WHERE "expiresAt" <= NOW()'
    );
  }

  async findActiveInvitations(): Promise<Invitation[]> {
    return this.rawQuery(
      'SELECT * FROM "invitation" WHERE "expiresAt" > NOW() AND "status" = \'pending\''
    );
  }

  async acceptInvitation(invitationId: string): Promise<Invitation | null> {
    return this.updateById(invitationId, { status: 'accepted' });
  }

  async rejectInvitation(invitationId: string): Promise<Invitation | null> {
    return this.updateById(invitationId, { status: 'rejected' });
  }

  async cancelInvitation(invitationId: string): Promise<Invitation | null> {
    return this.updateById(invitationId, { status: 'cancelled' });
  }

  async updateStatus(invitationId: string, status: string): Promise<Invitation | null> {
    return this.updateById(invitationId, { status });
  }

  async deleteExpiredInvitations(): Promise<Invitation[]> {
    return this.rawQuery(
      'DELETE FROM "invitation" WHERE "expiresAt" <= NOW() RETURNING *'
    );
  }

  async findWithOrganizationDetails(): Promise<(Invitation & { organization?: unknown })[]> {
    return this.findMany({
      joins: [
        {
          table: 'organization',
          type: 'INNER',
          on: 'invitation.organizationId = organization.id'
        }
      ]
    });
  }

  async findWithInviterDetails(): Promise<(Invitation & { inviter?: unknown })[]> {
    return this.findMany({
      joins: [
        {
          table: 'user',
          type: 'INNER',
          on: 'invitation.inviterId = user.id'
        }
      ]
    });
  }
}