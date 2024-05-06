import { useParams } from "react-router-dom";
import avatar from "../assets/images/User.jpg";
import moment from "moment-timezone";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments, getAllLikes } from "../redux/postSlice.js";
import { base_url } from "../constants/constants.js";

export const PostComments = () => {
  const dispatch = useDispatch();
  const { isLoading, postComments } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllComments(id));
  }, [dispatch, id, isLoading]);
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
          {postComments.map((comment) => {
            return (
              <div
                className={
                  "w-full flex h-auto justify-start items-center mt-3 bg-[#FFFFFF] text-[11px] rounded shadow-gray-200 shadow-2xl"
                }
                key={comment._id}
              >
                <div className={"w-auto h-full p-2 "}>
                  <img
                    src={base_url + "/" + comment.commentedBy.avatar}
                    alt={"profile"}
                    className={"w-10 h-10 "}
                  />
                </div>
                <div className={"w-3/4 h-full p-2"}>
                  <h6 className={"font-bold"}>
                    {userInfo._id === comment.commentedBy._id
                      ? "You"
                      : comment.commentedBy.name}
                  </h6>
                  <p className={"text-justify "}>{comment.comment}</p>
                  <time className={"text-[10px] font-bold"}>
                    {moment(comment.createdAt).format(
                      "Do MMM, YYYY ddd, hh:mm A ",
                    )}
                  </time>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
