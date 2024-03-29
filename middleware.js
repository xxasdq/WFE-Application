import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export default async function middleware(req) {
  if (!cookies().has('IVAO')) {
    return NextResponse.redirect(
      new URL('http://localhost:3000/login'),
      req.url
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
