import { Pool } from 'pg';
import { BaseRepository } from './base';
import { Member } from '../types/db/member';

export class MemberRepository extends BaseRepository<Member> {
  constructor(pool: Pool) {
    super(pool, 'member');
  }

  async findByOrganizationId(organizationId: string): Promise<Member[]> {
    return this.findMany({ where: { organizationId } });
  }

  async findByUserId(userId: string): Promise<Member[]> {
    return this.findMany({ where: { userId } });
  }

  async findByRole(role: string): Promise<Member[]> {
    return this.findMany({ where: { role } });
  }

  async findByOrganizationAndUser(organizationId: string, userId: string): Promise<Member | null> {
    return this.findOne({ where: { organizationId, userId } });
  }

  async findByOrganizationAndRole(organizationId: string, role: string): Promise<Member[]> {
    return this.findMany({ where: { organizationId, role } });
  }

  async findWithUserDetails(): Promise<(Member & { user?: unknown })[]> {
    return this.findMany({
      joins: [
        {
          table: 'user',
          type: 'INNER',
          on: 'member.userId = user.id'
        }
      ]
    });
  }

  async findWithOrganizationDetails(): Promise<(Member & { organization?: unknown })[]> {
    return this.findMany({
      joins: [
        {
          table: 'organization',
          type: 'INNER',
          on: 'member.organizationId = organization.id'
        }
      ]
    });
  }

  async updateRole(memberId: string, newRole: string): Promise<Member | null> {
    return this.updateById(memberId, { role: newRole });
  }

  async removeUserFromOrganization(organizationId: string, userId: string): Promise<Member | null> {
    return this.deleteOne({ organizationId, userId });
  }

  async getOrganizationAdmins(organizationId: string): Promise<Member[]> {
    return this.findMany({ where: { organizationId, role: 'admin' } });
  }

  async isUserMemberOfOrganization(userId: string, organizationId: string): Promise<boolean> {
    return this.exists({ userId, organizationId });
  }
}