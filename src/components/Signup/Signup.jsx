/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import './Signup.css'
const Signup = ({ signup, setSignup }) => {
  return (
    <div className={signup ? 'signup-container active' : 'signup-container'}>
      <form className={signup ? 'login active' : 'login'}>
        <AiOutlineClose onClick={() => setSignup(false)} className='signup-x' />
        <h1 className='signup-title'>Signup</h1>
        <div className='signup-inputs'>
          <input type='text' placeholder='Mobile Number or Email' required />
          <input type='password' placeholder='Full Name' required />
          <input type='password' placeholder='Password' required />
        </div>
        <button className='signup-btn'>Signup</button>
        <span>
          <hr /> <p>OR</p> <hr />
        </span>
        <div className='signup-acc'>
          <p>Have an account?</p>
          <a>Login</a>
        </div>
      </form>
    </div>
  )
}

export default Signup
