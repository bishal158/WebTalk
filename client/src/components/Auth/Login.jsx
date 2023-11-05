import "./Login.css";

import { useRef, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { json, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import React from "react";
import data from "bootstrap/js/src/dom/data.js";
export const Login = () => {
  const navigator = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const email_ref = useRef();
  const password_ref = useRef();
  const error_toast = () => {
    toast.error("Login Failed", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      onClick: () => {
        navigator("/");
      },
      draggable: true,
      progress: undefined,
      theme: "dark",
      icon: "❌",
    });
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const login = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container">
        <h2 className="register-header">Register Here</h2>
        <form className="register-form" onSubmit={login}>
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

          <div className="register-button">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
