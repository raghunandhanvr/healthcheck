import { headers } from 'next/headers';
import { auth } from '@/auth';
import { UserService } from '@/lib/services/user-service';
import { pgConnection } from '@/lib/database/postgres';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  withErrorHandling,
  ERROR_CODES 
} from '@/lib/api/response';

export const GET = withErrorHandling(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return createErrorResponse(
      ERROR_CODES.UNAUTHORIZED,
      'Authentication required to access user profile'
    );
  }

  const userService = new UserService(pgConnection);
  const user = await userService.getUserWithProvider(session.user.id);

  if (!user) {
    return createErrorResponse(
      ERROR_CODES.NOT_FOUND,
      'User profile not found'
    );
  }

  return createSuccessResponse(user, {
    meta: {
      timestamp: new Date().toISOString(),
    }
  });
});