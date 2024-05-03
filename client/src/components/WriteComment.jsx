import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveComment } from "../redux/postSlice.js";

export const WriteComment = () => {
  const { id } = useParams();
  const commentRef = useRef(null);
  const dispatch = useDispatch();
  const [commentData, setCommentData] = useState({
    postId: id,
    comment: "",
  });
  const handleChange = (e) => {
    setCommentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const comment = async (e) => {
    e.preventDefault();
    commentRef.current.value = null;
    try {
      await dispatch(saveComment(commentData));
    } catch (error) {
      throw new error();
    }
  };
  return (
    <>
      <div className={"w-full h-fit mb-3"}>
        <form className={"w-full"} onSubmit={comment}>
          <label
            htmlFor="comment"
            className="block mb-2 text-sm  text-black font-bold dark:text-white"
          >
            Comment Here
          </label>
          <textarea
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            name="comment"
            id="comment"
            ref={commentRef}
            onChange={handleChange}
          ></textarea>
          <button className={"w-full flex justify-end items-center py-2"}>
            <span
              className={
                "w-10 h-10 rounded-full bg-gray-800 flex justify-center items-center hover:shadow-gray-950 hover:shadow-2xl"
              }
            >
              <FontAwesomeIcon
                icon="fa-solid fa-paper-plane"
                size={"sm"}
                color={"white"}
              />
            </span>
          </button>
        </form>
      </div>
    </>
  );
};
