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
  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      if (e.clientX < 75) {
        e.target.classList.remove('mobile');
        setActive(true);
      }
    });
    window.addEventListener('mousemove', (e) => {
      if (e.clientX > 400) {
        e.target.classList.add('mobile');
        setActive(false);
      }
    });
  }, []);

  return (
    <div className={active ? 'header' : 'header mobile'}>
      <nav>
        <ul className={active ? 'ul-item' : 'ul-item oicon'}>
          <li>
            <IoMdPerson className='icon' />
            <Link to='/'>Testimonials</Link>
          </li>
          <li>
            <IoMdBookmark className='icon' />
            <Link to='/'>History</Link>
          </li>

          <li>
            <IoMdHome className='icon' />
            <Link to='/'>Partners</Link>
          </li>

          <li>
            <IoMdHammer className='icon' />
            <Link to='/'>Tutorials</Link>
          </li>

          <li>
            <IoMdCall className='icon' />
            <Link to='/'>Contact</Link>
          </li>

          <li>
            <IoMdClipboard className='icon' />
            <Link to='/'>FAQ</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
