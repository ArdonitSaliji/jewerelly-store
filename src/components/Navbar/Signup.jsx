import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = ({ signUp }) => {
  const [signingInUser, setSigningInUser] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [message, setMessage] = useState(null);
  const signupUser = async () => {
    if (
      signingInUser.username !== "" &&
      signingInUser.email !== "" &&
      signingInUser.password1 !== "" &&
      signingInUser.password2 !== ""
    ) {
      if (
        signingInUser.password1.length < 8 &&
        signingInUser.password2.length < 8
      ) {
        setMessage("Password must be at least 8 characters!");
        document
          .querySelector(".signup-message")
          .classList.add("show", "error");
      } else {
        const res = await fetch("http://localhost:5000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signingInUser.username,
            email: signingInUser.email,
            password1: signingInUser.password1,
            password2: signingInUser.password2,
          }),
        });
        const json = await res.json();
        if (res.status === 409) {
          document
            .querySelector(".signup-message")
            .classList.add("show", "error");
          setMessage(json.error);
        } else if (res.status === 201) {
          document
            .querySelector(".signup-message")
            .classList.add("show", "success");
          setMessage(json.success);
          setTimeout(() => {
            document
              .querySelector(".navbar-tab-signup")
              .classList.remove("show-signup");
          }, 3000);
        } else {
          document
            .querySelector(".signup-message")
            .classList.add("show", "error");
          setMessage(json.error);
        }
      }
    } else {
      document.querySelector(".signup-message").classList.add("show", "error");
      setMessage("All fields are required");
    }
  };
  return (
    <div
      className={
        signUp
          ? "navbar-tab navbar-tab-signup show-signup"
          : "navbar-tab navbar-tab-signup"
      }
    >
      <div className="left">
        <form name="signup" className="signup-form">
          <h4 className="signup-title">Sign up</h4>
          <br />
          <div className="signup-inputs">
            <div className="left-inputs">
              <div className="form-group">
                <label required htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  onChange={(e) => {
                    setSigningInUser({
                      ...signingInUser,
                      username: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Username"
                  required
                  name="username"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label required htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  onChange={(e) => {
                    setSigningInUser({
                      ...signingInUser,
                      email: e.target.value,
                    });
                  }}
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="right-inputs">
              <div className="form-group">
                <label required htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={(e) => {
                    setSigningInUser({
                      ...signingInUser,
                      password1: e.target.value,
                    });
                  }}
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label required htmlFor="repeat-password" className="sr-only">
                  Repeat Password
                </label>
                <input
                  onChange={(e) => {
                    setSigningInUser({
                      ...signingInUser,
                      password2: e.target.value,
                    });
                  }}
                  type="password"
                  placeholder="Repeat Password"
                  name="repeat-password"
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <Link to={"/reset-password"}>Have an account? Login.</Link>
        </form>
      </div>
      <div className="signup-message">{message}</div>
      <div className="right">
        <form>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              signupUser();
              setTimeout(() => {
                document
                  .querySelector(".signup message")
                  .classList.remove("show");
              }, 5000);
            }}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
