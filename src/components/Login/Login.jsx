/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import './Login.css'
const Login = ({ login, setLogin, setSignup }) => {
  return (
    <div className={login ? 'login-container active' : 'login-container'}>
      <form className={login ? 'login active' : 'login'}>
        <AiOutlineClose onClick={() => setLogin(false)} className='login-x' />
        <h1 className='login-title'>Login</h1>
        <div className='login-inputs'>
          <input type='text' placeholder='Phone number, username or email ' required />
          <input type='password' placeholder='Password' required />
        </div>
        <button className='login-btn'>Login</button>
        <span>
          <hr /> <p>OR</p> <hr />
        </span>
        <button
          onClick={() => {
            setLogin(false)
            setTimeout(() => setSignup(true), 300)
          }}
          type='button'
          className='login-btn new'
        >
          Create new account
        </button>
        <a>Forgot password?</a>
      </form>
    </div>
  )
}

export default Login
