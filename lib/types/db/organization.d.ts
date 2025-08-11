export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  createdAt: Date;
  metadata?: string;
}

export interface CreateOrganizationData {
  id?: string;
  name: string;
  slug: string;
  logo?: string;
  metadata?: string;
}

export interface UpdateOrganizationData {
  name?: string;
  slug?: string;
  logo?: string;
  metadata?: string;
}