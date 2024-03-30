import { NextResponse } from 'next/server';
import { DB } from '../../../auth/utils';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';

export async function POST(req, res) {
  const body = await req.json();
  const data = req.url.split('/').reverse();
  const cookie = cookies().get('IVAO');
  const token = await checkToken(cookie.value);

  try {
    if (token.data.vid == data[1]) {
      const db = await DB();
      const collection = db.collection('schedule');
      const result = await collection.deleteOne({
        _id: new ObjectId(body._id),
        vid: body.vid,
      });

      if (result.deletedCount) {
        return Response.json(result.acknowledged);
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 404 });
  }
}
