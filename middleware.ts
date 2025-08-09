import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/console")) {
    const sessionCookie = getSessionCookie(request);
    
    if (!sessionCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (pathname === "/auth") {
    const sessionCookie = getSessionCookie(request);
    
    if (sessionCookie) {
      const redirect = request.nextUrl.searchParams.get("redirect");
      const url = request.nextUrl.clone();
      url.pathname = redirect || "/console";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)"],
};
