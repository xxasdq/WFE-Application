'use server';
export default async function getData(date) {
  const data = await fetch('http://localhost:3000/api/schedule', {
    method: 'POST',
    body: JSON.stringify({ date }),
    headers: { 'Content-Type': 'application/json' },
  });

  return await data.json();
}
