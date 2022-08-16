/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import './Signup.css'
const Signup = ({ signUp, setSignUp, setLogin }) => {
  return (
    <div className={signUp ? 'signup-container active' : 'signup-container'}>
      <form className={signUp ? 'signup active' : 'signup'}>
        <AiOutlineClose onClick={() => setSignUp(false)} className='signup-x' />
        <h1 className='signup-title'>Sign up</h1>
        <div className='signup-inputs'>
          <input type='text' placeholder='Phone Number or Email' required />
          <input type='password' placeholder='Full Name' required />
          <input type='password' placeholder='Password' required />
        </div>
        <button className='signup-btn'>Sign up</button>
        <span>
          <hr /> <p>OR</p> <hr />
        </span>
        <div className='signup-acc'>
          <p>Have an account?</p>
          <a
            style={{ textDecoration: 'underline' }}
            onClick={() => {
              setSignUp(false)
              setTimeout(() => setLogin(true), 200)
            }}
          >
            Login
          </a>
        </div>
      </form>
    </div>
  )
}

export default Signup
