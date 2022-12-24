/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
const Navbar = ({ setBasketProducts }) => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(sessionStorage.getItem('isLoggedIn')));
  const indicator = sessionStorage.getItem('basketProducts');
  const basketLength = useSelector((state) => state.basket.length);
  return (
    <div className='navbar-container'>
      <div className='navbar container-fluid'>
        <div className='navbar-title'>
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
                {isLoggedIn && <span className='basket-indicator'>{basketLength}</span>}
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
                <div
                  className='navbar-user-photo'
                  onClick={() => {
                    document.querySelector('.sidebar').classList.toggle('show');
                  }}
                >
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
          <Login
            setBasketProducts={setBasketProducts}
            login={login}
            setIsLoggedIn={setIsLoggedIn}
          />
          <Signup signUp={signUp} />
        </>
      )}
    </div>
  );
};

export default Navbar;
