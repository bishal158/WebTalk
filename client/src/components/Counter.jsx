import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../constants/constants.js";

export const Counter = () => {
  // useEffect(() => {
  //   const getUserCount = async () => {
  //     const count = await totaltUsers();
  //     setTotalPosts(count);
  //   };
  //   getUserCount();
  // }, []);
  return (
    <div>
      <section
        className={`w-full h-full mb-3 py-4 flex justify-center items-center flex-wrap  `}
      >
        <h3
          className={
            "w-full h-full flex items-center justify-center mb-5 text-3xl text-center font-bold text-indigo-800"
          }
        >
          Our Blogs and Members
        </h3>
        <div
          className={`md:w-[300px] h-fit flex flex-col font-bold w-full items-center justify-center bg-[#1F183D] md:mx2 mx-8 p-4 rounded-[10px] shadow-2xl shadow-gray-950 mb-8`}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-users"
            size={"lg"}
            className={"text-green-600"}
          />
          <h2 className={"text-3xl text-green-600"}>{600}</h2>
          <h1 className={"text-white"}>Total User</h1>
        </div>
        <div
          className={`md:w-[300px] h-fit flex flex-col font-bold w-full items-center justify-center bg-[#1F183D] md:mx2 mx-8 p-4 rounded-[10px] shadow-2xl shadow-gray-950 mb-8`}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-users"
            size={"lg"}
            className={"text-green-600"}
          />
          <h2 className={"text-3xl text-green-600"}>{600}</h2>
          <h1 className={"text-white"}>Total User</h1>
        </div>
        <div
          className={`md:w-[300px] h-fit flex flex-col font-bold w-full items-center justify-center bg-[#1F183D] md:mx2 mx-8 p-4 rounded-[10px] shadow-2xl shadow-gray-950 mb-8`}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-users"
            size={"lg"}
            className={"text-green-600"}
          />
          <h2 className={"text-3xl text-green-600"}>{600}</h2>
          <h1 className={"text-white"}>Total User</h1>
        </div>
      </section>
    </div>
  );
};
