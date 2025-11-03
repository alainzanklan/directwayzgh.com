import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // Admin-only routes
    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Continue to page
    return NextResponse.next();
  },
  {
    callbacks: {
      // Only run middleware on protected routes
      authorized: ({ token }) => !!token,
    },
  }
);

// Simple and clear: only protect routes that need authentication
export const config = {
  matcher: [
    '/profile',
    '/messages/:path*',
    '/jobs/post',
    '/jobs/:id/edit',
    '/professionals/add',
    '/professionals/:id/edit',
    '/admin/:path*',
    '/profile/:path*'
  ],
};