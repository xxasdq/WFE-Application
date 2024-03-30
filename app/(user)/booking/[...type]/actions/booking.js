'use server';
import { checkToken } from '@/app/api/auth/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function booking(type, formData) {
  const cookie = cookies().get('IVAO');
  const token = await checkToken(cookie.value);
  const obj = {
    vid: formData.get('vid'),
    position: formData.get('position'),
    date: formData.get('date'),
    start: formData.get('start'),
    end: formData.get('end'),
  };

  if (formData.get('_id').length > 1) {
    obj['_id'] = formData.get('_id');
  }

  if (token.data.vid == formData.get('vid')) {
    await fetch(
      `http://localhost:3000/api/schedule/${formData.get('vid')}/${type}`,
      {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  redirect('/');
}
