import { SideBar } from "../components/SideBar.jsx";
import avatar from "../assets/images/dummy-image.jpg";
import Logo from "../assets/favicon/favicon-32x32.png";
import { FaBars } from "react-icons/fa";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Footer } from "../components/static/Footer.jsx";

export const RootLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const isOpen = () => {
    setOpen(!open);
    document.getElementById("sidebar").classList.toggle("close");
  };
  return (
    <div>
      <SideBar />
      <main className={"h-full w-full flex flex-col"}>
        <nav
          className={
            "w-full h-15 flex justify-end items-center px-2 bg-slate-100 border-b-2 sticky mb-8"
          }
        >
          <div
            className={
              " h-fit w-full flex justify-between items-center gap-2.5 font-medium  py-3  overflow-hidden"
            }
          >
            <div className={"flex justify-between items-center"}>
              <img
                src={Logo}
                alt={"..."}
                width={40}
                className={"rounded-full mx-1"}
              />
              <span className={"text-xl whitespace-pre"}>Web Talk</span>
            </div>
            <FaBars
              className={"w-fit h-fit bg-white cursor-pointer "}
              size={18}
              onClick={isOpen}
            />
          </div>
        </nav>
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
};
