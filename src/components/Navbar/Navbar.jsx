/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
const Navbar = ({ setAccountPopup, loginStatus, basketState }) => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <div className='navbar-container'>
      <div className='navbar container-fluid'>
        <div className='navbar-title'>
          {/* <img src={require('../../images/logo2.jpg')} alt='' /> */}
          <h3>Jewellery Traders</h3>
        </div>

        <div className='navbar-links'>
          <ul className='nav'>
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
          <div className='navbar-user'>
            <a
              className='btn btn-default login-btn'
              onClick={() => {
                setLogin((log) => !log);
                setSignUp(false);
              }}
            >
              Login
            </a>
            <a
              className='btn btn-default signup-btn'
              onClick={() => {
                setSignUp((log) => !log);
                setLogin(false);
              }}
            >
              Sign up
            </a>
          </div>
        </div>
      </div>

      <Login login={login} />
      <Signup signUp={signUp} />
    </div>
  );
};

export default Navbar;
