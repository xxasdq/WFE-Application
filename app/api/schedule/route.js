import { DB } from '../../../auth/utils';

export async function POST(req, res) {
  const body = await req.json();

  const db = await DB();
  const collection = await db.collection('schedule');
}
