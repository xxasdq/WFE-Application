import { DB } from '../../../auth/utils';

export async function POST(req, res) {
  const body = await req.json();

  const db = await DB();
  const collection = await db.collection('schedule');
  delete body.type;

  const newData = body;
  delete newData.id;
  const result = await collection.findOneAndUpdate({ _id: body.id }, newData, {
    returnOriginal: false,
  });

  return Response.json('ok');
}
