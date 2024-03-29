import { NextResponse } from 'next/server';
import { DB } from '../../../auth/utils';
import { ObjectId } from 'mongodb';

export async function POST(req, res) {
  const body = await req.json();

  try {
    const db = await DB();
    const collection = db.collection('schedule');
    const result = await collection.deleteOne({ _id: new ObjectId(body._id) });

    if (result.deletedCount) {
      console.log(result);
      return Response.json(result.acknowledged);
    } else {
      throw new Error();
    }
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 404 });
  }
}
