import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export default async function middleware(req) {
  const cookie = cookies().get('IVAO');

  if (!cookie) {
    return NextResponse.redirect(
      new URL('http://localhost:3000/login'),
      req.url
    );
  }

  NextResponse.next();
}

export const config = {
  matcher: '/',
};
