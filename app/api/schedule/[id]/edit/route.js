import { ObjectId } from 'mongodb';
import { DB } from '../../../auth/utils';

export async function POST(req, res) {
  const body = await req.json();
  const { _id, position, date, start, end } = body;

  const db = await DB();
  const collection = db.collection('schedule');
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(_id) },
    {
      $set: {
        position,
        date,
        start,
        end,
      },
    },
    {
      returnOriginal: false,
    }
  );

  return Response.json(true);
}
