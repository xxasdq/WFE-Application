import { Nunito_Sans } from 'next/font/google';
import './globals.css';

const ns = Nunito_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'IVAO | Schedule',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={ns.className}>{children}</body>
    </html>
  );
}
