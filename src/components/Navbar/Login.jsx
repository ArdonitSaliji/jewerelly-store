import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ login, setIsLoggedIn }) => {
  const [loginInUser, setLoginInUser] = useState({ email: '', password: '' });

  const loginUser = async () => {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: loginInUser.email, password: loginInUser.password }),
    });
    const json = await res.json();
    sessionStorage.setItem('isLoggedIn', JSON.stringify(json.isLoggedIn));
    setIsLoggedIn(json.isLoggedIn);
    sessionStorage.setItem('user', JSON.stringify(json.username));
  };

  return (
    <div
      className={login ? 'navbar-tab navbar-tab-login show-login' : 'navbar-tab navbar-tab-login'}
    >
      <div className='left'>
        <form name='login' className='login-form'>
          <h4 className='login-title'>Login</h4>
          <br />
          <br />
          <div className='login-inputs'>
            <div className='form-group'>
              <label htmlFor='email' className='sr-only'>
                Username or Email
              </label>
              <input
                onChange={(e) => {
                  setLoginInUser({ ...loginInUser, email: e.target.value });
                }}
                required
                type='text'
                placeholder='Username or email'
                name='email'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                onChange={(e) => {
                  setLoginInUser({ ...loginInUser, password: e.target.value });
                }}
                required
                type='password'
                placeholder='Password'
                name='password'
                className='form-control'
              />
            </div>
          </div>
          <Link
            //   onClick={() => setLogin(false)}
            to={'/reset-password'}
          >
            Forgot password?
          </Link>
        </form>
      </div>
      <div className='right'>
        <form>
          <button type='button' className='btn btn-primary' onClick={() => loginUser()}>
            Login
          </button>
          <hr />
          <button type='button' className='btn btn-accent1'>
            Create new account
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
