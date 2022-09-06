/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = ({ setAccountPopup, loginStatus, setLogin, setSignUp, basketState }) => {
  return (
    <div className='navbar-container'>
      <div className='navbar'>
        <div className='navbar-title'>
          <img src={require('../../images/logo2.jpg')} alt='' />
          <h3>Jewellery Traders</h3>
        </div>

        <div className='navbar-content'>
          {!loginStatus && (
            <div className='navbar-user'>
              <a onClick={() => setLogin(true)}>Login</a>
              <a
                onClick={() => {
                  setSignUp(true)
                }}
              >
                Sign up
              </a>
            </div>
          )}
          <div className='navbar-links'>
            <ul>
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
              <button className='navbar-account'>
                <img
                  onClick={() => setAccountPopup(true)}
                  src='https://yt3.ggpht.com/yti/AJo0G0m-2Y8iR9ecaHPVTitXtXBSyBivDb6SNOPmBg=s88-c-k-c0x00ffffff-no-rj-mo'
                  alt=''
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
