import { useState, useLayoutEffect, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setLoginMessage,
  setProfileImage,
  updateBasket,
  updateLength,
} from '../feature/basketSlice';

export function useAuth() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user is already logged in

    if (sessionStorage.getItem('user')) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    }
  }, []);

  async function setLogin(user) {
    // Perform login request to server
    const res = await fetch('/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();
    if (res.status === 200) {
      sessionStorage.setItem('loginNtf', JSON.stringify(res.ok));
      sessionStorage.setItem('isLoggedIn', JSON.stringify(json.auth));

      setUser(json.user);
      if (json.profileImage) {
        dispatch(setProfileImage(`data:image/jpeg;base64,${json.profileImage}`));
      } else {
        dispatch(setProfileImage('/images/user.webp'));
      }
      sessionStorage.setItem('user', JSON.stringify(json.user));
      dispatch(updateBasket(json.basketProducts));
      dispatch(updateLength(json.basketProducts.length));
      dispatch(setLoginMessage(json.message));
      window.location.reload();
      return res.status;
    } else {
      dispatch(setLoginMessage(json.message));
    }

    sessionStorage.setItem('loginNtf', JSON.stringify(res.ok));
  }

  return { user, setLogin };
}
