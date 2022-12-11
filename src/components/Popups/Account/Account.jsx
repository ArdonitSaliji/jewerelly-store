import React from 'react';
import './Account.scss';
const Account = ({ setLoginStatus, accountPopup, setAccountPopup }) => {
  const logout = async () => {
    const res = await fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  return (
    <div
      style={accountPopup ? { transform: 'translateX(0)' } : { transform: 'translateX(100%)' }}
      className='account-popup same'
    >
      <div className='account-credentials'>
        <div className='account-username'>
          <p>@{JSON.parse(sessionStorage.getItem('user'))}</p>
        </div>
        <span onClick={() => setAccountPopup(false)}>
          {JSON.parse(sessionStorage.getItem('user'))[0].toUpperCase()}
        </span>
      </div>
      <div className='account-lists'>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li
            onClick={() => {
              logout();
              sessionStorage.setItem('loginStatus', JSON.stringify(false));
              setAccountPopup(false);
              setLoginStatus(false);
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Account;
