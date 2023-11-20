import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { User_Context } from "../../context/User_Context.jsx";

export const Header = () => {
  const { UserId, setUserId, UserEmail, setUserEmail } =
    useContext(User_Context);
  useEffect(() => {
    fetch("http://localhost:5000/user/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userData) => {
        setUserId(userData.id);
        setUserEmail(userData.email);
      });
    });
  }, []);

  const logout = async () => {
    await fetch("http://localhost:5000/user/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserId(null);
    setUserEmail(null);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Web Talk
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  href="#"
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              {UserId && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="read_blogs">
                      Read Blogs
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="write_blogs">
                      Write Blogs
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="contact_us">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
          {/*Login and Register*/}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {!UserId && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              {UserId && (
                <>
                  <li className="nav-item">
                    <a className="nav-link">{UserEmail}</a>
                  </li>

                  <button className="logout-button" onClick={logout}>
                    Logout
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
