import { Link } from 'react-router-dom';

const Login = (props) => {
  return (
    <div ref={props.loginRef} className='navbar-tab navbar-tab-login'>
      <div className='left'>
        <form className='login-form'>
          <h4 className='login-title'>Login</h4>
          <p className='response'>&nbsp;</p>
          <div className='login-inputs'>
            <div className='form-group'>
              <label htmlFor='email' className='sr-only'>
                Username or Email
              </label>
              <input
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
          <button type='button' className='btn btn-primary'>
            Login
          </button>
          <hr />
          <button onClick={() => {}} type='button' className='btn btn-accent1'>
            Create new account
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
