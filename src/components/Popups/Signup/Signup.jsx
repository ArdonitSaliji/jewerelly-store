/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import './Signup.scss';

const Signup = ({ setSignUp, setLogin }) => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [message, setMessage] = useState();
  const submitInfo = async (e) => {
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: state.username,
          email: state.email,
          password: state.password,
        }),
      });
      if (res.status === 201) {
        alert('Account created successfully');
        setMessage('Account created successfully');
        setTimeout(() => {
          setSignUp(false);
          setState({
            username: '',
            password: '',
            email: '',
            password2: '',
          });
          setMessage('');
        }, 1000);
      }
      if (res.status === 409) {
        e.preventDefault();
        setMessage('Account already exists');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const incorrectCredentials = (e) => {
    if (state.username.length < 4) {
      e.preventDefault();
      setMessage('Username must be at least 4 characters!');
      setTimeout(() => {
        setMessage('');
      }, 7000);
      return false;
    }
    if (state.password.length < 8 && state.password2.length < 8) {
      e.preventDefault();
      setMessage('Password must be longer than 8 characters!');
      setTimeout(() => {
        setMessage('');
      }, 5000);
      return false;
    } else {
      if (state.password !== state.password2) {
        e.preventDefault();
        setMessage('Passwords need to match.');
        setTimeout(() => {
          setMessage('');
        }, 5000);
        return false;
      } else {
        e.preventDefault();
        submitInfo(e);
      }
    }
  };

  return (
    <div className='signup-container'>
      <form
        onSubmit={(e) => {
          incorrectCredentials(e);
        }}
        className='signup'
      >
        <AiOutlineClose onClick={() => setSignUp(false)} className='signup-x' />
        <h2 className='signup-title'>Sign up</h2>
        <div className='signup-inputs'>
          <input
            onChange={(e) => setState({ ...state, username: e.target.value })}
            value={state.username}
            type='text'
            placeholder='Username'
            required
          />
          <input
            onChange={(e) => setState({ ...state, email: e.target.value })}
            value={state.email}
            type='text'
            placeholder='Email'
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
        <p className='wrong-password'>{message}</p>

        <button className='signup-btn'>Sign up</button>
        <span>
          <hr /> <p>OR</p> <hr />
        </span>
        <div className='signup-acc'>
          <p>Have an account?</p>
          <a
            style={{ textDecoration: 'underline' }}
            onClick={() => {
              setSignUp(false);
              setTimeout(() => setLogin(true), 200);
            }}
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
