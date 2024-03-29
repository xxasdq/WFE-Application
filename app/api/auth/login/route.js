import { NextResponse } from 'next/server';
import { DB, decrypt, generateToken } from '../utils';

export async function POST(req, res) {
  const { vid, password } = await req.json();
  try {
    const db = await DB();
    const collection = db.collection('users');
    const result = await collection.findOne({ vid: Number(vid) });

    if (await decrypt(password, result.password)) {
      delete result.password;

      const token = await generateToken(result);
      return Response.json({ message: 'Authorized', token });
    } else {
      throw new Error();
    }
  } catch (err) {
    return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  }
}
