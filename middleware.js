import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Check if path starts with /jobs or /professionals
    const isJobsRoute = path.startsWith('/jobs');
    const isProfessionalsRoute = path.startsWith('/professionals');

    // If no token and trying to access /jobs or /professionals routes
    if (!token && (isJobsRoute || isProfessionalsRoute)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check admin-only routes for /professionals
    if (path === '/admin' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        
        // Allow access to /jobs and /professionals routes even without token
        // The middleware function will handle the redirect
        if (path.startsWith('/jobs') || path.startsWith('/professionals')) {
          return true;
        }
        
        // For other protected routes, require token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/profile', '/messages', '/jobs/post', '/professionals/add'],
};