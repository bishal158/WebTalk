
import {useState } from "react";

import Logo from "../assets/favicon/favicon-32x32.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generalRoutes, userRoutes } from "../constants/constants.js";
import { logoutUser } from "../redux/authSlice.js";
import { Cookies } from "react-cookie";

export const SideBar = () => {
  const navigation = useNavigate();
  const cookies = new Cookies();
  const {userInfo } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const [dark, setDark] = useState(false);
  const setMode = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };
  const close = () => {
    document.getElementById("sidebar").classList.toggle("close");
  };
  const logout = () => {
    dispatch(logoutUser());
    cookies.remove("token");
    navigation("/login");
  };
  return (
    <aside
      id={"sidebar"}
      className={
        "bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] h-screen overflow-hidden fixed dark:bg-[#1f1f1A] dark:text-[#fff]"
      }
    >
      {/*Collapse Button*/}
      <div
        className={
          "w-full h-fit flex justify-end items-center p-2 cursor-pointer"
        }
        onClick={close}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-arrow-left"
          className={
            "bg-amber-50 text-black flex w-[20px] h-[20px] items-center justify-center p-1 rounded-full"
          }
        />
      </div>
      {/*Avatar*/}
      {userInfo ? (
        <div
          className={
            "w-full flex  items-center font-medium py-3 mx-3 overflow-hidden"
          }
        >
          <img
            src={userInfo.avatar}
            alt={"..."}
            className={
              "rounded-full w-[50px] h-[50px] overflow-hidden border-emerald-700 border-2 mr-1"
            }
          />
          <span className={"text-[16px] whitespace-pre font-bold"}>
            {userInfo.name}
          </span>
        </div>
      ) : (
        <div
          className={
            "flex  items-center gap-2.5 font-medium  py-3 mx-3 overflow-hidden"
          }
        >
          <img src={Logo} alt={"..."} width={40} className={"rounded-full"} />
          <span className={"text-xl whitespace-pre"}>Web Talk</span>
        </div>
      )}

      {/*Menu*/}
      {userInfo ? (
        <div className={"flex  flex-col h-full py-4"}>
          {userRoutes.map((route, index) => {
            return (
              <NavLink to={route.to} key={index}>
                <FontAwesomeIcon
                  icon={route.icon}
                  size={"sm"}
                  className={"min-w-max"}
                />
                {route.name}
              </NavLink>
            );
          })}
          <a onClick={logout}>
            <FontAwesomeIcon
              icon="fa-solid fa-right-from-bracket"
              size={"lg"}
            />{" "}
            Sign Out
          </a>
          <a onClick={setMode}>
            <FontAwesomeIcon
              icon={dark ? "fa-solid fa-toggle-on" : "fa-solid fa-toggle-off"}
              size={"lg"}
            />
            {dark ? "Light Mode" : "Dark Mode"}
          </a>
        </div>
      ) : (
        <div className={"flex  flex-col h-full py-4"}>
          {generalRoutes.map((route, index) => {
            return (
              <NavLink to={route.to} key={index}>
                <FontAwesomeIcon
                  icon={route.icon}
                  size={"lg"}
                  className={"min-w-max"}
                />{" "}
                {route.name}
              </NavLink>
            );
          })}
          <a onClick={setMode}>
            <FontAwesomeIcon
              icon={dark ? "fa-solid fa-toggle-on" : "fa-solid fa-toggle-off"}
              size={"lg"}
            />
            {dark ? "Light Mode" : "Dark Mode"}
          </a>
        </div>
      )}
    </aside>
  );
};
