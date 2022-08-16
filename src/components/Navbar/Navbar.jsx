/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = ({ setLogin, setSignUp, basketState }) => {
  return (
    <div className='navbar'>
      <div className='navbar-title'>
        <img src={require('../../images/logo2.jpg')} alt='' />
        <h3>Jewellery Traders</h3>
      </div>

      <div className='navbar-content'>
        <div className='navbar-content-user'>
          <a onClick={() => setLogin(true)}>Login</a>
          <a onClick={() => setSignUp(true)}>Sign up</a>
        </div>

        <ul className='navbar-content-links'>
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
                <span className='basket-items-indicator'>{basketState.length}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
