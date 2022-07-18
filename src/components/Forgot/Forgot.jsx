import React from 'react'
import './Forgot.css'
import { HiLockClosed } from 'react-icons/hi'
const Forgot = () => {
  return (
    <div className='forgot-container'>
      <form className='forgot'>
        <hr />
        <HiLockClosed className='forgot-lock' />
        <h2>Trouble Logging In?</h2>
      </form>
    </div>
  )
}

export default Forgot
