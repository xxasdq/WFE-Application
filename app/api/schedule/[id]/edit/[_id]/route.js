import { ObjectId } from 'mongodb';
import { DB } from '@/app/api/auth/utils';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  const id = req.url.split('/').reverse()[0];

  try {
    const db = await DB();
    const collection = db.collection('schedule');
    const result = await collection.findOne({ _id: new ObjectId(id) });

    if (result._id) {
      return Response.json(result);
    } else {
      throw new Error();
    }
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 404 });
  }
}
