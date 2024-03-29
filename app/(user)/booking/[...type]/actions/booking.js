'use server';
import { redirect } from 'next/navigation';

export default async function booking(type, formData) {
  const res = await fetch(
    `http://localhost:3000/api/schedule/${formData.get('vid')}/${type}`,
    {
      method: 'POST',
      body: JSON.stringify({
        vid: formData.get('vid'),
        position: formData.get('position'),
        date: formData.get('date'),
        start: formData.get('start'),
        end: formData.get('end'),
      }),
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const result = await res.json();

  if (result) {
    redirect('/');
  }
}
