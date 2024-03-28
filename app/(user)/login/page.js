import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import '../style.css';

export default function Login() {
  if (cookies().get('IVAO')) {
    redirect('/');
  }

  return (
    <form id='login_form' action={login}>
      <h3>Account Login</h3>
      <input
        type='text'
        name='vid'
        maxLength={6}
        placeholder='VID'
        autoComplete='off'
      />
      <input
        type='password'
        name='password'
        maxLength={20}
        placeholder='Password'
        autoComplete='off'
      />
      <button type='submit' className='btn'>
        Login
      </button>
    </form>
  );
}

async function login(formData) {
  'use server';

  const data = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      vid: formData.get('vid'),
      password: formData.get('password'),
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (await data.ok) {
    const { token } = await data.json();
    cookies().set('IVAO', token);
    redirect('/');
  }
}
