import { NextResponse } from 'next/server';
import { DB } from '../auth/utils';

export async function POST(req, res) {
  const { date } = await req.json();

  try {
    const db = await DB();
    const collection = db.collection('schedule');
    const result = await collection
      .aggregate([
        { $match: { date } },
        { $group: { _id: '$position', result: { $push: '$$ROOT' } } },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    return Response.json(result);
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
