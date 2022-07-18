/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-img'>
        <img src={require('../../images/logo2.jpg')} alt='' />
        <h2>Jewellery Traders</h2>
      </div>

      <div className='nav__items'>
        <div className='nav__items-btns'>
          <a className='login'>Login</a>
          <a className='signup'>Sign up</a>
        </div>

        <ul>
          <li>
            <a href='indextext.html'>Home</a>
          </li>
          <li>
            <a href=''>Prices</a>
          </li>
          <li>
            <a href=''>About us</a>
          </li>
          <li>
            <a href='basket.html'>Basket</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
