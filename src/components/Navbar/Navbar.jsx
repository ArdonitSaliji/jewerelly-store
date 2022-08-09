/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = ({ setLogin, setSignup }) => {
  return (
    <div className='navbar'>
      <div className='nav-img'>
        <img src={require('../../images/logo2.jpg')} alt='' />
        <h3>Jewellery Traders</h3>
      </div>

      <div className='nav-items'>
        <div className='nav-items-btns'>
          <a onClick={() => setLogin(true)}>Login</a>
          <a onClick={() => setSignup(true)}>Sign up</a>
        </div>

        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <a href=''>Prices</a>
          </li>
          <li>
            <a href=''>About us</a>
          </li>
          <li>
            <Link to='/basket'>Basket</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
