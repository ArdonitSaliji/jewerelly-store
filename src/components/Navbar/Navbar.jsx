/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import {
  AiOutlineBars,
  AiOutlineHome,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { GoBrowser } from "react-icons/go";
import { MdOutlineDescription } from "react-icons/md";
const Navbar = ({ setBasketProducts }) => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(sessionStorage.getItem("isLoggedIn"))
  );
  const [showNav, setShowNav] = useState(false);
  const basketLength = useSelector((state) => state.basket.length);
  const media = useMediaQuery("(max-width: 771px)")[0];

  return (
    <div className="navbar-container">
      <div
        className={
          media ? "navbar container-fluid mobile" : "navbar container-fluid"
        }
      >
        {!media && (
          <div className="navbar-title">
            <img src={"/images/gem-logo.webp"} alt="" />
          </div>
        )}

        <div className="navbar-links">
          {media && (
            <AiOutlineBars
              className={showNav ? "bars rotate" : "bars"}
              onClick={() => {
                setShowNav((prev) => !prev);
              }}
            />
          )}
          <ul className={showNav ? "nav show" : "nav"}>
            <li onClick={() => setShowNav(false)}>
              <Link to="/">
                <GoBrowser /> Dashboard
              </Link>
            </li>
            {/* <li onClick={() => setShowNav(false)}>
              <Link to="/">
                <AiOutlineHome /> Orders
              </Link>
            </li> */}
            <li onClick={() => setShowNav(false)}>
              <Link to="/">
                <MdOutlineDescription /> About us
              </Link>
            </li>
            <li onClick={() => setShowNav(false)}>
              <Link to="/basket">
                <AiOutlineShoppingCart />
                Basket&nbsp;
                {isLoggedIn && basketLength > 0 && basketLength && (
                  <span className="basket-indicator">{basketLength}</span>
                )}
              </Link>
            </li>
          </ul>

          {media && (
            // <div className='navbar-title'>
            <img src={"/images/gem-logo.webp"} alt="" />
            // </div>
          )}
        </div>

        <div className="navbar-content">
          <div className="navbar-user">
            {!isLoggedIn && (
              <>
                <a
                  className="btn btn-default login-btn"
                  onClick={() => {
                    setLogin((log) => !log);
                    setSignUp(false);
                  }}
                >
                  Login
                </a>
                <a
                  className="btn btn-default signup-btn"
                  onClick={() => {
                    setSignUp((log) => !log);
                    setLogin(false);
                  }}
                >
                  Sign up
                </a>
              </>
            )}

            {isLoggedIn && (
              <div className="navbar-user">
                <div
                  className="navbar-user-photo"
                  onClick={() => {
                    document.querySelector(".sidebar").classList.toggle("show");
                  }}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/images/user.webp"}
                    alt=""
                  />
                </div>
                <div className="navbar-user-username">
                  @{JSON.parse(sessionStorage.getItem("user"))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isLoggedIn && (
        <>
          <Login
            setBasketProducts={setBasketProducts}
            login={login}
            setIsLoggedIn={setIsLoggedIn}
          />
          <Signup signUp={signUp} />
        </>
      )}
    </div>
  );
};

export default Navbar;
