import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/console')) {
    const sessionCookie = request.cookies.get('better-auth.session_token') || 
                         request.cookies.get('hc_session') || 
                         request.cookies.get('session_token')
    
    if (!sessionCookie) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }

  if (pathname === '/auth') {
    const sessionCookie = request.cookies.get('better-auth.session_token') || 
                         request.cookies.get('hc_session') || 
                         request.cookies.get('session_token')
    
    if (sessionCookie) {
      const redirect = request.nextUrl.searchParams.get('redirect')
      const url = request.nextUrl.clone()
      url.pathname = redirect || '/console'
      url.search = ''
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
}