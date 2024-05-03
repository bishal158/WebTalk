import { useParams } from "react-router-dom";
import avatar from "../assets/images/User.jpg";
import moment from "moment-timezone";
import React from "react";
import { date } from "yup";

export const PostComments = () => {
  const { id } = useParams();

  return (
    <>
      <div
        className={
          "w-full h-full mb-3 flex flex-col px-2 justify-center items-center "
        }
      >
        <h1 className={"text-black font-bold text-center mb-1"}>
          Comments section
        </h1>
        <div
          className={
            "w-full h-56 overflow-y-scroll bg-[#F9FAFB] rounded flex flex-col justify-start items-start p-2 border-[2px] "
          }
        >
          <div
            className={
              "w-full flex h-fit max-h-fit overflow-hidden justify-start items-center mt-3 bg-[#FFFFFF] text-[11px] rounded shadow-gray-200 shadow-2xl"
            }
          >
            <div className={" h-full p-4"}>
              <img src={avatar} alt={"profile"} className={"w-10 h-10 "} />
            </div>
            <div className={"w-3/4 h-full"}>
              <h6 className={"font-bold"}>Mafuj Ahmed Bishal</h6>
              <p className={"text-justify "}>
                definitiones morbi adipisci dico litora referrentur definitiones
                has interesset commune menandri eget graeci blandit euismod
              </p>
              <time className={"text-[10px] font-bold"}>
                {moment(Date.now()).format("Do MMM, YYYY ddd, hh:mm A ")}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
