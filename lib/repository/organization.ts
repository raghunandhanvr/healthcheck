import { Pool } from 'pg';
import { BaseRepository } from './base';
import { Organization } from '../types/db/organization';

export class OrganizationRepository extends BaseRepository<Organization> {
  constructor(pool: Pool) {
    super(pool, 'organization');
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    return this.findOne({ where: { slug } });
  }

  async findByName(name: string): Promise<Organization[]> {
    return this.rawQuery(
      'SELECT * FROM "organization" WHERE "name" ILIKE $1',
      [`%${name}%`]
    );
  }

  async findWithMembers(): Promise<(Organization & { members?: unknown })[]> {
    return this.findMany({
      joins: [
        {
          table: 'member',
          type: 'LEFT',
          on: 'organization.id = member.organizationId'
        }
      ]
    });
  }

  async updateSlug(organizationId: string, newSlug: string): Promise<Organization | null> {
    return this.updateById(organizationId, { slug: newSlug });
  }

  async updateMetadata(organizationId: string, metadata: string): Promise<Organization | null> {
    return this.updateById(organizationId, { metadata });
  }
}