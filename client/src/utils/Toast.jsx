import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

export const Toast = ({ type, onClose, content }) => {
  return (
    <div
      className={
        "fixed top-0 left-0 w-full h-full flex items-end justify-end transition-all duration-700 ease-in-out"
      }
    >
      <div
        className={`w-[280px] h-[70px] px-2 rounded-[5px] py-6 font-bold shadow-3xl shadow-black flex justify-center absolute items-center  top-6 right-2 bg-white border`}
      >
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center mx-2 ${
            type === "success"
              ? "bg-[#D5FADD]"
              : type === "error"
                ? "bg-red-500"
                : " bg-blue-500"
          }`}
        >
          <FontAwesomeIcon
            icon={
              type === "success"
                ? "fa-solid fa-circle-check"
                : type === "error"
                  ? "fa-solid fa-circle-check"
                  : "fa-solid fa-circle-check"
            }
            className={`${
              type === "success"
                ? "text-green-950"
                : type === "error"
                  ? "fa-solid fa-circle-check"
                  : "fa-solid fa-circle-check"
            }`}
          />
        </span>
        <div className={"text-gray-950"}>{content}</div>
        {/*<span onClick={onClose}>*/}
        {/*  <FontAwesomeIcon icon="fa-solid fa-xmark" />*/}
        {/*</span>*/}
      </div>
    </div>
  );
};
