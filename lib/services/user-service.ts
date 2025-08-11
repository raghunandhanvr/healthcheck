import { UserRepository } from '@/lib/repository/user';
import { AccountRepository } from '@/lib/repository/account';
import { Pool } from 'pg';
import { UserWithProvider } from '@/lib/types/api/user';

export class UserService {
  private userRepo: UserRepository;
  private accountRepo: AccountRepository;

  constructor(pool: Pool) {
    this.userRepo = new UserRepository(pool);
    this.accountRepo = new AccountRepository(pool);
  }

  async getUserWithProvider(userId: string): Promise<UserWithProvider | null> {
    const user = await this.userRepo.findById(userId);
    if (!user) return null;

    const accounts = await this.accountRepo.findByUserId(userId);
    const hasCredentialsProvider = accounts.some(account => account.providerId === 'credential');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      role: user.role,
      twoFactorEnabled: user.twoFactorEnabled,
      plan: user.plan,
      subscriptionStatus: user.subscriptionStatus,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      hasCredentialsProvider
    };
  }
}