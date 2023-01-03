import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBasket } from "../../feature/basketSlice";
import { toast } from "react-toastify";
import { useMediaQuery } from "@chakra-ui/react";

const Login = ({ login, setIsLoggedIn }) => {
  const [loginInUser, setLoginInUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const media = useMediaQuery("(max-width: 771px)")[0];
  const [res, setRes] = useState(null);
  const [json, setJson] = useState(null);

  useEffect(() => {
    if (res && res.status === 200) {
      sessionStorage.setItem("loginRes", JSON.stringify(res.status));
      dispatch(updateBasket(json.basketProducts));
      sessionStorage.setItem("isLoggedIn", JSON.stringify(json.isLoggedIn));
      sessionStorage.setItem("user", JSON.stringify(json.username));
      setIsLoggedIn(json.isLoggedIn);
      setMessage(json.success);
      toast.success("Login Successfull!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      window.location.reload();

      // Reload the page
    } else if (res && res.status !== 200) {
      document.querySelector(".login-message").classList.add("show", "error");
      setMessage(res.json.error);
      setTimeout(() => {
        setMessage("");
      }, 6000);
    }
  }, [res]);
  const handleLogin = async (e) => {
    e.preventDefault();

    // Login code here
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginInUser.email,
        password: loginInUser.password,
      }),
    });
    let json = await res.json();

    setJson(json);
    setRes(res);
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
                setMessage("← Fields are empty!");
                document
                  .querySelector(".login-message")
                  .classList.add("show", "error");
                setTimeout(() => {
                  setMessage("");
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
