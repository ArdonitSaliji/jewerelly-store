import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoginMessage, updateBasket } from "../feature/basketSlice";

export function useAuth() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user is already logged in
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  async function setLogin(user) {
    // Perform login request to server
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    if (res.status === 200) {
      sessionStorage.setItem("loginNtf", JSON.stringify(res.ok));
      sessionStorage.setItem("isLoggedIn", JSON.stringify(json.auth));
      setUser(json.user);
      sessionStorage.setItem("user", JSON.stringify(json.user));
      dispatch(updateBasket(json.basketProducts));
      window.location.reload();
    } else {
      dispatch(setLoginMessage(json.message));
    }

    if (json) {
    }
    sessionStorage.setItem("loginNtf", JSON.stringify(res.ok));
    throw new Error("Login failed");
  }

  return { user, setLogin };
}
