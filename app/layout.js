import { Nunito_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { checkToken } from './api/auth/utils';
import { redirect } from 'next/navigation';
import './globals.css';

const ns = Nunito_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'IVAO | Schedule',
};

export default async function RootLayout({ children }) {
  const cookie = cookies().get('IVAO');
  const data = cookie ? await checkToken(cookie.value) : null;

  return (
    <html lang='en'>
      <body className={ns.className}>
        <header>
          <Link href={'/'}>
            <Image
              src={'/logo_white.svg'}
              width={200}
              height={80}
              alt='ivao_logo'
              priority
            />
          </Link>

          {data && (
            <span>
              <Link href={`/booking/${data.data.vid}/create`}>Book Now</Link>
              <Link href={'/logout'}>Logout</Link>
            </span>
          )}
        </header>

        <div>{children}</div>
      </body>
    </html>
  );
}

async function logout() {
  'use server';
  cookies().delete('IVAO');
  redirect('/');
}
