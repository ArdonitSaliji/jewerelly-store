import { useEffect, useState } from 'react';

import { IoMdCall, IoMdHome, IoMdPerson, IoMdSettings } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
document.addEventListener('click', (e) => {
  let x = e.clientX;
  let y = e.clientY;
  var elementMouseIsOver = document.elementFromPoint(x, y);
  if (
    elementMouseIsOver.className !== 'sidebar' &&
    elementMouseIsOver.className !== 'navbar-user-photo'
  ) {
    document.querySelector('.sidebar').classList.remove('show');
  }
});

const logUserOur = async () => {
  const res = await fetch('http://localhost:5000/api/logout');

  sessionStorage.clear();
  window.location.reload();
};
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <nav>
        <ul className='ul-item'>
          <li>
            <Link to='/'>Account</Link>
            <IoMdPerson className='icon' />
          </li>

          <li>
            <Link to='/'>Partners</Link>
            <IoMdHome className='icon' />
          </li>

          <li>
            <Link to='/'>Contact</Link>
            <IoMdCall className='icon' />
          </li>

          <li>
            <Link to='/'>Settings</Link>
            <IoMdSettings className='icon' />
          </li>

          <li
            onClick={() => {
              logUserOur();
            }}
          >
            <Link to='/'>Logout</Link>
            <BiLogOut className='icon' />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
