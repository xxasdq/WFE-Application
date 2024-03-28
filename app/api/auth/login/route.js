import { cookies } from 'next/headers';
import { DB, decrypt, generateToken } from '../utils';

export async function POST(req, res) {
  const { vid, password } = await req.json();

  const db = await DB();
  const collection = await db.collection('users');
  const result = await collection.findOne({ vid: Number(vid) });

  if (await decrypt(password, result.password)) {
    delete result.password;

    const token = await generateToken(result);
    return Response.json({ message: 'Authorized', token });
  } else {
    return Response.json({ message: 'Not authorized' });
  }
}
