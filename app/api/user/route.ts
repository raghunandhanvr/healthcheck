import { auth } from "@/auth"
import {
  createErrorResponse,
  createSuccessResponse,
  ERROR_CODES,
  withErrorHandling,
} from "@/lib/api/response"
import { pgConnection } from "@/lib/database/postgres"
import { UserService } from "@/lib/services/user-service"
import { headers } from "next/headers"

export const GET = withErrorHandling(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user?.id) {
    return createErrorResponse(
      ERROR_CODES.UNAUTHORIZED,
      "Authentication required to access user profile"
    )
  }

  const userService = new UserService(pgConnection)
  const user = await userService.getUserWithProvider(session.user.id)

  if (!user) {
    return createErrorResponse(ERROR_CODES.NOT_FOUND, "User profile not found")
  }

  return createSuccessResponse(user, {
    meta: {
      timestamp: new Date().toISOString(),
    },
  })
})
