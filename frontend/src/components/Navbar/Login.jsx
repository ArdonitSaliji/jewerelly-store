import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBasket } from "../../feature/basketSlice";
import { toast } from "react-toastify";
import { useMediaQuery } from "@chakra-ui/react";
import { useAuth } from "../../auth/useAuth";
import { setLoginMessage } from "../../feature/basketSlice";
const Login = ({ login, setIsLoggedIn }) => {
  const [loginInUser, setLoginInUser] = useState({ email: "", password: "" });

  const message = useSelector((state) => state.basket.message);

  const dispatch = useDispatch();
  const media = useMediaQuery("(max-width: 771px)")[0];
  const { setLogin } = useAuth();

  useEffect(() => {
    const userIsAuth = JSON.parse(sessionStorage.getItem("loginNtf"));
    if (userIsAuth) {
      setIsLoggedIn(userIsAuth);
    }
  }, []);

  const handleLogin = async (e) => {
    setLogin({
      email: loginInUser.email,
      password: loginInUser.password,
    });

    document.querySelector(".login-message").classList.add("show", "error");
    setTimeout(() => {
      dispatch(setLoginMessage(""));
    }, 6000);
  };

  const handleChange = (e) => {
    e.target.type === "text"
      ? setLoginInUser({ ...loginInUser, email: e.target.value })
      : setLoginInUser({ ...loginInUser, password: e.target.value });
  };
  return (
    <div
      className={
        media
          ? login
            ? "navbar-tab navbar-tab-login mobile show-login"
            : "navbar-tab navbar-tab-login mobile"
          : !login
          ? "navbar-tab navbar-tab-login"
          : "navbar-tab navbar-tab-login show-login"
      }
    >
      <div className="left">
        <form name="login" className="login-form">
          <h4 className="login-title">Login</h4>
          <div className="login-inputs">
            <label required htmlFor="email" className="sr-only">
              Username or Email
            </label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              type="text"
              placeholder="Username or email"
              name="email"
              id="email"
              className="form-control"
            />
            <label required htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              id="password"
              type="password"
              placeholder="Password"
              required
              name="password"
              className="form-control"
            />
          </div>
          <Link
            onClick={() =>
              document
                .querySelector(".navbar-tab navbar-tab-login")
                .classList.remove("show-login")
            }
            to={"/reset-password"}
          >
            Forgot password?
          </Link>
        </form>
      </div>
      <span className="login-message">{message}</span>
      <div className="right">
        <form>
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              if (
                loginInUser.email.length < 1 &&
                loginInUser.password.length < 1
              ) {
                dispatch(setLoginMessage("← Fields are empty!"));
                document
                  .querySelector(".login-message")
                  .classList.add("show", "error");
                setTimeout(() => {
                  dispatch(setLoginMessage(""));
                }, 5000);
              } else {
                handleLogin(e);
              }
            }}
          >
            Login
          </button>
          <button type="button" className="btn btn-accent1">
            Create new account
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
