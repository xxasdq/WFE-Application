import { DB } from '../../../auth/utils';

export async function POST(req, res) {
  const body = await req.json();

  const db = await DB();
  const collection = db.collection('schedule');
  delete body.type;
  delete body._id;
  const result = await collection.insertOne(body);

  return Response.json(result);
}
