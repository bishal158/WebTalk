import "./Login.css";
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import React from "react";
import { User_Context } from "../../context/User_Context.jsx";

// const navigator = useNavigate();
const success_toast = () => {
  toast.success("Login Successful", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    icon: "✔️",
  });
};
const error_toast = () => {
  toast.error("Login Failed", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    icon: "❌",
  });
};
export const Login = () => {
  const { setUserInfo } = useContext(User_Context);
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const email_ref = useRef();
  const password_ref = useRef();
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const navigator = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: JSON.stringify({ Inputs }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          email_ref.current.value = "";
          password_ref.current.value = "";
          response.json().then((UserInfo) => {
            setUserInfo(UserInfo.email);
            navigator("/");
          });
        }
        if (response.status === 409) {
          error_toast();
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="container">
        <h2 className="login-header">Login Here</h2>
        <form className="login-form" onSubmit={login}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
              onChange={handleChange}
              ref={email_ref}
            />
            <label htmlFor="email">
              <FontAwesomeIcon icon="envelope" /> Email address
            </label>
          </div>
          <div className="form-floating mb-3 d-flex">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              ref={password_ref}
            />
            <label htmlFor="password">
              <FontAwesomeIcon icon="key" /> Password
            </label>
            <span className="btn mx-1 p-3 bg-body-tertiary">
              <FontAwesomeIcon icon="eye" />
            </span>
          </div>

          <div className="login-button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
