/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Forgot.css'
import { HiLockClosed } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Forgot = ({ setSignup }) => {
  return (
    <div className='forgot-container'>
      <form className='forgot'>
        <hr className='forgot-lock-hr' />
        <HiLockClosed className='forgot-lock' />
        <h3>Trouble Logging In?</h3>
        <p>Enter your email or phone and we'll send you a link to get back into your account.</p>
        <input type='text' placeholder='Email or Phone' required />
        <button>Send Login Link</button>
        <span>
          <hr className='forgot-or-hr' /> <p className='forgot-or-p'>OR</p>
          <hr className='forgot-or-hr' />
        </span>
        <a onClick={() => setTimeout(() => setSignup(true), 200)}>Create New Account</a>
        <Link to={'/'} className='forgot-back'>
          Go Back
        </Link>
      </form>
    </div>
  )
}

export default Forgot
