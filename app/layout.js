import { Nunito_Sans } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { checkToken } from './api/auth/utils';
import './globals.css';

const ns = Nunito_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'IVAO | Schedule',
};

export default async function RootLayout({ children }) {
  const cookie = cookies().has('IVAO');
  const { data } = cookie && (await checkToken(cookies().get('IVAO').value));

  return (
    <html lang='en'>
      <body className={ns.className}>
        <header>
          <Link href={'/'}>
            <Image
              src={'/logo_white.svg'}
              width={200}
              height={90}
              alt='ivao_logo'
              priority
            />
          </Link>

          {cookie && (
            <nav>
              <Link href={data && `/booking/${data.vid}/create`}>Book Now</Link>
              <Link href={'/api/auth/logout'}>Logout</Link>
            </nav>
          )}
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
