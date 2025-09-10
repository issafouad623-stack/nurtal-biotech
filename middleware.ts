import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateSession } from '@/lib/supabase-auth';

export async function middleware(request: NextRequest) {
  // Check if the request is for admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const sessionCookie = request.cookies.get('admin_session');
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Validate session
    const user = await validateSession(sessionCookie.value);
    
    if (!user) {
      // Clear invalid session cookie and redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // If accessing login page while authenticated, redirect to admin dashboard
  if (request.nextUrl.pathname === '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session');
    
    if (sessionCookie) {
      const user = await validateSession(sessionCookie.value);
      if (user) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};

