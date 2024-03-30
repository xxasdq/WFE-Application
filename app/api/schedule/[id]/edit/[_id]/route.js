import { ObjectId } from 'mongodb';
import { DB, checkToken } from '@/app/api/auth/utils';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req, res) {
  const data = req.url.split('/').reverse();

  const cookie = cookies().get('IVAO');
  const token = await checkToken(cookie.value);

  try {
    const db = await DB();
    const collection = db.collection('schedule');
    const result = await collection.findOne({
      _id: new ObjectId(data[0]),
      vid: data[2],
    });

    if (result._id) {
      const newResult = result;
      if (token.data.vid == data[2]) {
        newResult['editable'] = true;
      } else {
        newResult['editable'] = false;
      }
      return Response.json(newResult);
    } else {
      throw new Error();
    }
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 404 });
  }
}
