/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = ({ loginStatus, setLoginStatus, login, setLogin, setSignUp }) => {
  const [loginState, setLoginState] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [response, setResponse] = useState();
  const getUser = async (e) => {
    const res = await fetch(`http://localhost:5000/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailOrPhone: loginState.emailOrPhone,
        password: loginState.password,
      }),
    });
    if (res.status === 200) {
      e.preventDefault();
      setResponse('Welcome Ardonit!');
      alert('Welcome Ardonit!');
      setTimeout(() => {
        setLogin(false);
        setLoginStatus(true);
        sessionStorage.setItem('loginStatus', JSON.stringify(true));
        setLoginState({
          emailOrPhone: '',
          password: '',
        });
      }, 500);
    }
    if (res.status === 404) {
      e.preventDefault();
      setResponse('Account does not exist');
    }
    if (res.status === 401) {
      e.preventDefault();
      setResponse('Double check your password');
    }
  };

  return (
    login && (
      <div className='login-container'>
        <form className='login'>
          <AiOutlineClose onClick={() => setLogin(false)} className='login-x' />
          <h1 className='login-title'>Login</h1>
          <div className='login-inputs'>
            <input
              onChange={(e) => setLoginState({ ...loginState, emailOrPhone: e.target.value })}
              value={loginState.emailOrPhone}
              type='text'
              placeholder='Phone number or email'
              name='email'
              required
            />
            <input
              onChange={(e) => setLoginState({ ...loginState, password: e.target.value })}
              value={loginState.password}
              type='password'
              placeholder='Password'
              name='password'
              required
            />
          </div>
          <p
            style={
              response === 'Welcome Ardonit!' ? { color: 'green' } : { color: 'rgb(201, 0, 0)' }
            }
            className='response'
          >
            {response}
          </p>
          <button type='button' onClick={(e) => getUser(e)} className='login-btn'>
            Login
          </button>
          <span>
            <hr /> <p>OR</p> <hr />
          </span>
          <button
            onClick={(e) => {
              setLogin(false);
              setTimeout(() => setSignUp(true), 200);
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
  );
};

export default Login;
