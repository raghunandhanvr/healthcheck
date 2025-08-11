import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/auth';
import { UserService } from '@/lib/services/user-service';
import { pgConnection } from '@/lib/database/postgres';

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userService = new UserService(pgConnection);
    const user = await userService.getUserWithProvider(session.user.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}