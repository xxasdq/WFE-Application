import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(req, res) {
  cookies().delete('IVAO');
  redirect('/');
}
