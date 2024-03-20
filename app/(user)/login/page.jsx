import '../style.css';

export default function Login() {
  return (
    <form id='login_form'>
      <h3>Account Login</h3>
      <input
        type='text'
        name='vid'
        inputMode='numeric'
        maxLength={6}
        placeholder='VID'
      />
      <input
        type='password'
        name='password'
        maxLength={20}
        placeholder='Password'
      />
      <button type='submit' className='btn'>
        Login
      </button>
    </form>
  );
}
