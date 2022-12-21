import { useEffect, useState } from 'react';

import {
  IoMdBookmark,
  IoMdCall,
  IoMdChatboxes,
  IoMdClipboard,
  IoMdClose,
  IoMdHammer,
  IoMdHome,
  IoMdImage,
  IoMdMenu,
  IoMdPerson,
} from 'react-icons/io';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [active, setActive] = useState(false);

  const activateNav = () => {
    setActive(!active);
  };
  const showSideBar = (e) => {
    setActive(true);
    e.target.classList.remove('mobile');
  };
  const hideSideBar = (e) => {
    setActive(false);
    e.target.classList.add('mobile');
  };

  return (
    <div
      onMouseLeave={(e) => {
        hideSideBar(e);
      }}
      onMouseEnter={(e) => showSideBar(e)}
      className={active ? 'header' : 'header mobile'}
    >
      <nav>
        <ul className={active ? 'ul-item' : 'ul-item oicon'}>
          <li>
            <Link to='/'>Testimonials</Link>
            <IoMdPerson className='icon' />
          </li>
          <li>
            <Link to='/'>History</Link>
            <IoMdBookmark className='icon' />
          </li>

          <li>
            <Link to='/'>Partners</Link>
            <IoMdHome className='icon' />
          </li>

          <li>
            <Link to='/'>Tutorials</Link>
            <IoMdHammer className='icon' />
          </li>

          <li>
            <Link to='/'>Contact</Link>
            <IoMdCall className='icon' />
          </li>

          <li>
            <Link to='/'>FAQ</Link>
            <IoMdClipboard className='icon' />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
