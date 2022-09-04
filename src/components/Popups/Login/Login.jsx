/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = ({ login, setLogin, setSignUp }) => {
  const [usernameState, setUsernameState] = useState()
  const getUser = async () => {
    const res = await fetch(`http://localhost:5000/api/users?email=${usernameState}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
  }
  return (
    login && (
      <div className={'login-container'}>
        <form className={'login'}>
          <AiOutlineClose onClick={() => setLogin(false)} className='login-x' />
          <h1 className='login-title'>Login</h1>
          <div className='login-inputs'>
            <input
              onChange={(e) => setUsernameState(e.target.value)}
              value={usernameState}
              type='text'
              placeholder='Phone number or email'
              name='username'
              required
            />
            <input type='password' placeholder='Password' name='password' required />
          </div>
          <button type='button' onClick={getUser} className='login-btn'>
            Login
          </button>
          <span>
            <hr /> <p>OR</p> <hr />
          </span>
          <button
            onClick={(e) => {
              setLogin(false)
              setTimeout(() => setSignUp(true), 200)
            }}
            type='button'
            className='login-btn new'
          >
            Create new account
          </button>
          <Link onClick={() => setLogin(false)} to={'/reset-password'}>
            Forgot password?
          </Link>
        </form>
      </div>
    )
  )
}

export default Login
