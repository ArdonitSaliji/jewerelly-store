/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
// const axios = require('axios')
import './Signup.css'

const Signup = ({ setSignUp, setLogin }) => {
  const [state, setState] = useState({
    password: '',
    emailOrPhone: '',
    password2: '',
  })
  const submitInfo = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailOrPhone: state.emailOrPhone, password: state.password }),
    })
  }
  return (
    <div className='signup-container'>
      <form onSubmit={submitInfo} className='signup'>
        <AiOutlineClose onClick={() => setSignUp(false)} className='signup-x' />
        <h1 className='signup-title'>Sign up</h1>
        <div className='signup-inputs'>
          <input
            onChange={(e) => setState({ ...state, emailOrPhone: e.target.value })}
            value={state.emailOrPhone}
            type='text'
            placeholder='Phone Number or Email'
            required
          />
          <input
            onChange={(e) => setState({ ...state, password: e.target.value })}
            value={state.password}
            type='password'
            placeholder='Password'
            required
          />
          <input
            onChange={(e) => setState({ ...state, password2: e.target.value })}
            value={state.password2}
            type='password'
            placeholder='Re-enter Password'
            required
          />
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
