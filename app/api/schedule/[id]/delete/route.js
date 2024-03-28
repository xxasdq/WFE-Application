import { DB } from '../../../auth/utils';

export async function POST(req, res) {
  const body = await req.json();

  const db = await DB();
  const collection = await db.collection('schedule');
  const result = await collection.deleteOne({ _id: body.id });

  return Response.json('ok');
}
