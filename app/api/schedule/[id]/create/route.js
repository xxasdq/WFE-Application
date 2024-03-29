import { NextResponse } from 'next/server';
import { DB } from '../../../auth/utils';

export async function POST(req, res) {
  const body = await req.json();

  try {
    const db = await DB();
    const collection = db.collection('schedule');

    // time and position search
    const exist = await collection
      .find({
        position: body.position,
        date: body.date,
        $and: [
          { start: { $gte: body.start, $lte: body.end } },
          { end: { $gte: body.start, $lte: body.end } },
        ],
      })
      .toArray();

    if (exist.length > 0) {
      return NextResponse.json(
        {
          message: `Times inserted between ${body.start} and ${body.end} are not available`,
        },
        { status: 503 }
      );
    } else {
      delete body.type;
      delete body._id;
      const result = await collection.insertOne(body);

      if (result.acknowledged) {
        return NextResponse.json({ message: 'ok' }, { status: 200 });
      } else {
        throw new Error();
      }
    }
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
