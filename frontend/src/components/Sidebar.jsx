import { IoMdCall, IoMdHome, IoMdPerson, IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
document.addEventListener("click", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  var elementMouseIsOver = document.elementFromPoint(x, y);
  if (
    elementMouseIsOver.className !== "sidebar" &&
    elementMouseIsOver.className !== "navbar-user-photo"
  ) {
    setTimeout(() => {
      document.querySelector(".sidebar").classList.remove("show");
    }, 100);
  }
});

const logUserOut = async () => {
  const res = await fetch("/api/logout");
  const json = await res.json();
  window.location.href = json.redirect_path;
  sessionStorage.clear();
};
const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul className="ul-item">
          <li
            onClick={() => {
              window.open(
                `/${JSON.parse(sessionStorage.getItem("user"))}/profile`,
                "_self"
              );
            }}
          >
            <Link>Account</Link>
            <IoMdPerson className="icon" />
          </li>

          <li>
            <Link to="/">Orders</Link>
            <IoMdHome className="icon" />
          </li>

          <li>
            <Link to="/">Contact</Link>
            <IoMdCall className="icon" />
          </li>

          <li>
            <Link to="/">Settings</Link>
            <IoMdSettings className="icon" />
          </li>

          <li
            onClick={() => {
              logUserOut();
            }}
          >
            <Link>Logout</Link>
            <BiLogOut className="icon" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
