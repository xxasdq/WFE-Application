import { serialize } from 'cookie';
import { DB, decrypt, generateToken } from '../utils';

export async function POST(req, res) {
  const { vid, password } = await req.json();

  const db = await DB();
  const collection = await db.collection('users');
  const result = await collection.findOne({ vid: Number(vid) });

  if (await decrypt(password, result.password)) {
    const cookieOptions = {
      maxAge: 3600,
      path: '/',
      httpOnly: true,
      secure: true,
    };
    const cookieSerialized = serialize(
      'IVAO',
      generateToken(result),
      cookieOptions
    );

    res.setHeaders('Set-Cookie', cookieSerialized);

    return Response.json({ message: 'Authorized' });
  } else {
    return Response.json({ message: 'Not authorized' });
  }
}
