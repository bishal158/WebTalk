import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const navigator = useNavigate();
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
  const register = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      body: JSON.stringify({ Inputs }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          email_ref.current.value = "";
          password_ref.current.value = "";
        }
        if (response.status === 409) {
        }
      })
      .catch((error) => {});
  };
  return (
    <>
      <div className="container">
        <h2 className="register-header">Register Here</h2>
        <form className="register-form" onSubmit={register}>
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
              type={showPassword ? "password" : "text"}
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
            <span
              className="btn mx-1 p-3 bg-body-tertiary"
              onClick={togglePassword}
            >
              {showPassword ? (
                <FontAwesomeIcon icon="eye-slash" />
              ) : (
                <FontAwesomeIcon icon="eye" />
              )}
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
