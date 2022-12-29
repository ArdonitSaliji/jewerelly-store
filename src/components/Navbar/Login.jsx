import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBasket } from "../../feature/basketSlice";
import { toast } from "react-toastify";
import { useMediaQuery } from "@chakra-ui/react";
const Login = ({ login, setIsLoggedIn }) => {
  const [loginInUser, setLoginInUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const loginUser = async () => {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginInUser.email,
        password: loginInUser.password,
      }),
    });
    const json = await res.json();
    if (res.status === 200) {
      toast.success("Login successful!", {
        position: "top-center",
      });
      sessionStorage.setItem("isLoggedIn", JSON.stringify(json.isLoggedIn));
      sessionStorage.setItem("user", JSON.stringify(json.username));
      console.log(json.basketProducts);
      dispatch(updateBasket(json.basketProducts));
      setIsLoggedIn(json.isLoggedIn);
      setMessage(json.success);
      document.querySelector(".login-message").classList.add("show", "success");
    } else {
      document.querySelector(".login-message").classList.add("show", "error");
      setMessage(json.error);
      setTimeout(() => {
        setMessage("");
      }, 6000);
    }
  };
  const media = useMediaQuery("(max-width: 771px)")[0];
  console.log(login);
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
            <div className="form-group">
              <label required htmlFor="email" className="sr-only">
                Username or Email
              </label>
              <input
                onChange={(e) => {
                  setLoginInUser({ ...loginInUser, email: e.target.value });
                }}
                required={true}
                type="text"
                placeholder="Username or email"
                name="email"
                id="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label required htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={(e) => {
                  setLoginInUser({ ...loginInUser, password: e.target.value });
                }}
                id="password"
                type="password"
                placeholder="Password"
                required
                name="password"
                className="form-control"
              />
            </div>
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
            onClick={() => {
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
                loginUser();
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
