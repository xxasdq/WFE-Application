'use server';
const { cookies } = require('next/headers');
const { redirect } = require('next/navigation');

export default async function login(formData) {
  const data = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      vid: formData.get('VID'),
      password: formData.get('Password'),
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (data.ok) {
    const { token } = await data.json();
    cookies().set('IVAO', token);
    redirect('/');
  }
}
