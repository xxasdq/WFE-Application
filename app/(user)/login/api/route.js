export function GET(req, res) {
  console.log('lala');

  const token = 'token';

  res.setHeader('Set-Cookie', `token=${token}`);
  res.status(200).json({ login: true });

  return Response.json('Welcome');
}
