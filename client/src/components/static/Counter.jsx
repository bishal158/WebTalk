import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalCounter } from "../../redux/authSlice.js";

export const Counter = () => {
  const dispatch = useDispatch();
  const { totalCount } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(totalCounter());
  }, []);
  return (
    <>
      <section
        className={`w-full h-full mb-1 py-4 flex justify-center items-center flex-wrap mb-5`}
      >
        <h3
          className={
            "w-full h-full flex items-center justify-center mb-5 text-3xl text-center font-bold text-indigo-800"
          }
        >
          Our Blogs and Members
        </h3>
        <div
          className={`md:w-[300px] h-fit flex flex-col font-bold w-full items-center justify-center bg-[#1F183D] md:mx2 mx-8 p-4 rounded-[10px] mb-8`}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-users"
            size={"lg"}
            className={"text-green-600"}
          />
          <h2 className={"text-3xl text-green-600"}>{totalCount.totalUser}</h2>
          <h1 className={"text-white"}>Total Users</h1>
        </div>
        <div
          className={`md:w-[300px] h-fit flex flex-col font-bold w-full items-center justify-center bg-[#1F183D] md:mx2 mx-8 p-4 rounded-[10px]  mb-8`}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-users"
            size={"lg"}
            className={"text-green-600"}
          />
          <h2 className={"text-3xl text-green-600"}>{totalCount.totalPost}</h2>
          <h1 className={"text-white"}>Total Blogs</h1>
        </div>
        <div
          className={`md:w-[300px] h-fit flex flex-col font-bold w-full items-center justify-center bg-[#1F183D] md:mx2 mx-8 p-4 rounded-[10px]  mb-8`}
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
    </>
  );
};
