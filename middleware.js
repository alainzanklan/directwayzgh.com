import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth);
    if (
      req.nextUrl.pathname === '/professionals' &&
      req.nextauth.token?.role !== 'ADMIN'
    ) {
      return new NextResponse('you are not authorized');
    }
  },

  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = { matcher: ['/profile', '/messages'] };
