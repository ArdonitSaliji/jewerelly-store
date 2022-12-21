/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
const Navbar = ({ setAccountPopup, loginStatus, basketState }) => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(sessionStorage.getItem('isLoggedIn')));
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
        </div>

        <div className='navbar-content'>
          <div className='navbar-user'>
            {!isLoggedIn && (
              <>
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
              </>
            )}

            {isLoggedIn && (
              <div className='navbar-user'>
                <div className='navbar-user-photo'>
                  <img src={process.env.PUBLIC_URL + '/images/user.webp'} alt='' />
                </div>
                <div className='navbar-user-username'>
                  @{JSON.parse(sessionStorage.getItem('user'))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isLoggedIn && (
        <>
          <Login login={login} setIsLoggedIn={setIsLoggedIn} /> <Signup signUp={signUp} />
        </>
      )}
    </div>
  );
};

export default Navbar;

/* {loginStatus && (
  <span className='navbar-account same' onClick={() => setAccountPopup(true)}>
    {sessionStorage.getItem('user') &&
      JSON.parse(sessionStorage.getItem('user'))[0].toUpperCase()}
  </span>
)} */
