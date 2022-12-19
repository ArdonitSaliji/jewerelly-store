import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = ({ signUp }) => {
  const [signingInUser, setSigningInUser] = useState();
  return (
    <div
      className={
        signUp ? 'navbar-tab navbar-tab-signup show-signup' : 'navbar-tab navbar-tab-signup'
      }
    >
      <div className='left'>
        <form name='signup' className='signup-form'>
          <h4 className='signup-title'>Sign up</h4>
          <br />
          <div className='signup-inputs'>
            <div>
              <div className='form-group'>
                <label htmlFor='username' className='sr-only'>
                  Username
                </label>
                <input
                  onChange={(e) => {
                    setSigningInUser({ ...signingInUser, email: e.target.value });
                  }}
                  required
                  type='text'
                  placeholder='Username'
                  name='username'
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email' className='sr-only'>
                  Email
                </label>
                <input
                  onChange={(e) => {
                    setSigningInUser({ ...signingInUser, password: e.target.value });
                  }}
                  required
                  type='password'
                  placeholder='Email'
                  name='email'
                  className='form-control'
                />
              </div>
            </div>
            <div>
              <div className='form-group'>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  onChange={(e) => {
                    setSigningInUser({ ...signingInUser, password: e.target.value });
                  }}
                  required
                  type='password'
                  placeholder='Password'
                  name='password'
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='repeat-password' className='sr-only'>
                  Repeat Password
                </label>
                <input
                  onChange={(e) => {
                    setSigningInUser({ ...signingInUser, password: e.target.value });
                  }}
                  required
                  type='password'
                  placeholder='Repeat Password'
                  name='repeat-password'
                  className='form-control'
                />
              </div>
            </div>
          </div>
          <Link
            //   onClick={() => setsignup(false)}
            to={'/reset-password'}
          >
            Have an account? Login.
          </Link>
        </form>
      </div>
      <div className='right'>
        <form>
          <button
            type='button'
            className='btn btn-primary'
            //  onClick={() => signup()}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
