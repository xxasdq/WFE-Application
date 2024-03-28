import { ObjectId } from 'mongodb';
import { DB } from '@/app/api/auth/utils';

export async function POST(req, res) {
  const body = await req.json();

  const db = await DB();
  const collection = db.collection('schedule');
  const result = await collection.findOne({ _id: new ObjectId(body._id) });

  return Response.json(result);
}
