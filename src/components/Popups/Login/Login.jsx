/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './Login.scss';
import { Link } from 'react-router-dom';
import { message } from 'antd';

const Login = ({ setLoginStatus, login, setLogin, setSignUp }) => {
  const [loginState, setLoginState] = useState({
    emailOrUsername: '',
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
        emailOrUsername: loginState.emailOrUsername,
        password: loginState.password,
      }),
    });
    if (res.status === 200) {
      const json = await res.json();
      sessionStorage.setItem('token', json.accessToken);
      sessionStorage.setItem('user', JSON.stringify(json.username));
      e.preventDefault();
      message.success('Login Successful');
      setTimeout(() => {
        setLogin(false);
        setLoginStatus(true);
        sessionStorage.setItem('loginStatus', JSON.stringify(true));
        setLoginState({
          emailOrUsername: '',
          password: '',
        });
      }, 500);
    }
    if (res.status === 404) {
      e.preventDefault();
      setResponse('Account does not exist');
      setTimeout(() => {
        setResponse('');
      }, 5000);
    }
    if (res.status === 401) {
      e.preventDefault();
      setResponse('Double check your password');
      setTimeout(() => {
        setResponse('');
      }, 5000);
    }
  };

  return (
    login && (
      <div className='login-container'>
        <form className='login'>
          <AiOutlineClose onClick={() => setLogin(false)} className='login-x' />
          <h2 className='login-title'>Login</h2>
          <div className='login-inputs'>
            <input
              required
              onChange={(e) => setLoginState({ ...loginState, emailOrUsername: e.target.value })}
              value={loginState.emailOrUsername}
              type='text'
              placeholder='Username or email'
              name='email'
            />
            <input
              required
              onChange={(e) => setLoginState({ ...loginState, password: e.target.value })}
              value={loginState.password}
              type='password'
              placeholder='Password'
              name='password'
            />
          </div>
          <p className='response'>{response}</p>
          <button type='button' onClick={(e) => getUser(e)} className='login-btn'>
            Login
          </button>
          <span>
            <hr /> <p>OR</p> <hr />
          </span>
          <button
            onClick={() => {
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
