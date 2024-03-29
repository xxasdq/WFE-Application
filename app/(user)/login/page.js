import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Input from '@/app/components/form/input';
import Button from '@/app/components/form/button';
import login from './actions/login';
import '../style.css';
import Container from '@/app/components/container/container';

export default function Login() {
  if (cookies().get('IVAO')) {
    redirect('/');
  }

  return (
    <Container className='center'>
      <form id='login_form' action={login}>
        <h3>Account Login</h3>
        <Input type='text' name='VID' max={6} />
        <Input type='password' name='Password' max={20} />
        <Button type='submit' name='Login' />
      </form>
    </Container>
  );
}
