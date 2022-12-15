/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = ({ setAccountPopup, loginStatus, setLogin, setSignUp, basketState }) => {
  return (
    <div className='navbar-container'>
      <div className='navbar container-fluid'>
        <div className='navbar-title'>
          {/* <img src={require('../../images/logo2.jpg')} alt='' /> */}
          <h3>Jewellery Traders</h3>
        </div>


        <div className='navbar-links'>
            <ul className="nav">
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/'>Prices</Link>
              </li>
              <li>
                <Link to='/'>About us</Link>
              </li>
              <li>
                <Link to='/basket'>
                  Basket&nbsp;
                  {basketState && basketState.length > 0 && (
                    <span className='basket-indicator'>{basketState.length}</span>
                  )}
                </Link>
              </li>
            </ul>
            {loginStatus && (
              <span className='navbar-account same' onClick={() => setAccountPopup(true)}>
                {sessionStorage.getItem('user') &&
                  JSON.parse(sessionStorage.getItem('user'))[0].toUpperCase()}
              </span>
            )}
          </div>

        <div className='navbar-content'>
          {!loginStatus && (
            <div className='navbar-user'>
              <a className="btn btn-default" onClick={() => setLogin(true)}>Login</a>
              <a className="btn btn-default"
                onClick={() => {
                  setSignUp(true);
                }}
              >
                Sign up
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-tabs">
        <div className='navbar-tab navbar-tab-login'>
          <div className='left'>
            <form className='login-form'>
              <h4 className='login-title'>Login</h4>
              <p className='response'>&nbsp;</p>
              <div className='login-inputs'>
                <div class="form-group">
                  <label for="email" className='sr-only'>Username or Email</label>
                  <input
                    required
                    type='text'
                    placeholder='Username or email'
                    name='email'
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  <label for="password" className='sr-only'>Password</label>
                  <input
                    required
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='form-control'
                  />
                </div>
              </div>
                <Link onClick={() => setLogin(false)} to={'/reset-password'}>
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
                <button
                  onClick={() => {
                  }}
                  type='button'
                  className='btn btn-accent1'
                >
                  Create new account
                </button>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Navbar;
