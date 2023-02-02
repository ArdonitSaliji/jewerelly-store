import { IoMdCall, IoMdHome, IoMdPerson, IoMdSettings } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Sidebar = () => {
  useEffect(() => {
    document.addEventListener('click', (e) => {
      let x = e.clientX;
      let y = e.clientY;
      var elementMouseIsOver = document.elementFromPoint(x, y);
      if (
        elementMouseIsOver.className !== 'sidebar' &&
        elementMouseIsOver.className !== 'navbar-user-photo'
      ) {
        setTimeout(() => {
          document.querySelector('.sidebar').classList.remove('show');
        }, 100);
      }
    });
  }, []);

  const logUserOut = async () => {
    const res = await fetch('/logout');
    const json = await res.json();
    window.location.href = json.redirect_path;
    sessionStorage.clear();
  };
  return (
    <div className='sidebar'>
      <nav>
        <ul className='ul-item'>
          <li
            onClick={() => {
              window.open(`/${JSON.parse(sessionStorage.getItem('user'))}/profile`, '_self');
            }}
          >
            <Link to='/'>Account</Link>
            <IoMdPerson className='icon' />
          </li>

          <li>
            <Link to='/'>Orders</Link>
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
              logUserOut();
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
