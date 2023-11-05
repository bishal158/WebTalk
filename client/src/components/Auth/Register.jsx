import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigator = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const email_ref = useRef();
  const password_ref = useRef();
  const success_toast = () => {
    toast.success("Registration Successful", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      onClick: () => {
        navigator("/login");
      },
      draggable: true,
      progress: undefined,
      theme: "dark",
      icon: "✔️",
    });
  };
  const error_toast = () => {
    toast.error("Registration Failed", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      onClick: () => {
        navigator("/login");
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
  const register = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({ Inputs }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      alert(e);
    }

    // axios
    //   .post("http://localhost:5000/register", {
    //     email: inputs.email,
    //     password: inputs.password,
    //   })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       success_toast();
    //       email_ref.current.value = "";
    //       password_ref.current.value = "";
    //     }
    //   })
    //   .catch((err) => {
    //     error_toast();
    //   });
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
