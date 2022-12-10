import React from 'react';
import './Account.scss';
const Account = ({ userFirstLetter, setLoginStatus, accountPopup, setAccountPopup }) => {
  return (
    <div
      style={accountPopup ? { transform: 'translateX(0)' } : { transform: 'translateX(100%)' }}
      className='account-popup same'
    >
      <div className='account-credentials'>
        <div className='account-username'>
          <p>@Ardonit</p>
        </div>
        <span onClick={() => setAccountPopup(false)}>{userFirstLetter}</span>
      </div>
      <div className='account-lists'>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li
            onClick={() => {
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