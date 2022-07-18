/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import './Login.css'
const Login = ({ login, setLogin }) => {
  return (
    <div className={login ? 'login-container active' : 'login-container'}>
      <form className={login ? 'login active' : 'login'}>
        <AiOutlineClose onClick={() => setLogin(false)} className='login-x' />
        <h1 className='login-title'>Login</h1>
        <div className='login-inputs'>
          <input type='text' placeholder='Enter your username...' required />
          <input type='password' placeholder='Enter your password...' required />
        </div>
        <button className='login-btn'>Login</button>
        <span>
          <hr /> <p>OR</p> <hr />
        </span>
        <button type='button' className='login-btn new'>
          Create new account
        </button>
        <a>Forgot password?</a>
      </form>
    </div>
  )
}

export default Login
