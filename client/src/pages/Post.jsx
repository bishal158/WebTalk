import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSinglePost,
  getSinglePost,
  likedPost,
} from "../redux/postSlice.js";
import { base_url } from "../constants/constants.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";
import { LoadingSpinner } from "../components/LoadingSpinner.jsx";
import Modal from "react-bootstrap/Modal";

export const Post = () => {
  const navigation = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const { posts, isLoading, error, success, postInfo } = useSelector(
    (state) => state.post,
  );
  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch]);
  const deletePost = () => {
    dispatch(deleteSinglePost(id));
  };
  const likeIt = () => {
    console.log("liked");
    dispatch(likedPost(id));
    setLiked(true);
  };
  const dislikeIt = () => {
    setLiked(false);
    console.log("dislike");
  };
  if (!postInfo) return null;

  return (
    <div>
      <section
        className={"w-full h-full flex flex-wrap justify-start px-3 py-4 "}
      >
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete this post</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this post????</Modal.Body>
          <Modal.Footer
            className={
              "w-full h-fit flex justify-between items-center text-white font-bold"
            }
          >
            <button
              className={
                "bg-red-600 w-[60px] h-[40px] flex justify-center items-center rounded-[5px]"
              }
              onClick={deletePost}
            >
              Yes
            </button>
            <button
              className={
                "bg-blue-600 w-[60px] h-[40px] flex justify-center items-center rounded-[5px]"
              }
              onClick={handleClose}
            >
              No
            </button>
          </Modal.Footer>
        </Modal>
        {isLoading ? <LoadingSpinner /> : null}
        <div
          className={
            "md:w-3/4 flex flex-col w-full h-fit bg-[#EDF0F2]  rounded-[10px] dark:bg-black shadow-sky-50 shadow-xl dark:text-white "
          }
        >
          <div className={"w-full h-full  flex justify-center items-center"}>
            <img
              src={base_url + "/" + postInfo.cover}
              className={"md:w-full md:h-96 h-60 rounded"}
              alt={"ssss"}
            />
          </div>
          <div className={"w-full flex flex-col justify-center items-center"}>
            <h1
              className={
                "w-full flex justify-center items-center py-2 md:text-3xl text-center text-[16px] font-bold "
              }
            >
              {postInfo.title}
            </h1>
            <h2
              className={
                "w-full h-auto flex items-center justify-center text-[16px] font-bold mb-3"
              }
            >
              <img
                src={base_url + "/" + postInfo.author.avatar}
                alt={"..."}
                className={
                  "md:w-14 md:h-14 h-10 w-10 rounded-full border-red-500 border-2 mx-2"
                }
              />
              <span className={"text-[16px] md:text-[18px]"}>
                {postInfo.author.email}
              </span>
            </h2>
            <div
              className={"w-full h-auto flex justify-between items-center px-3"}
            >
              <time className={"md:text-[16px] text-[12px] font-bold"}>
                {moment(postInfo.createdAt).format(
                  "Do MMM, YYYY ddd, hh:mm A ",
                )}
              </time>
              {postInfo.author._id === userInfo._id ? (
                <div
                  className={
                    "flex text-[14px] px-1 md:text-[16px] cursor-pointer"
                  }
                >
                  <Link
                    to={`/post/edit/${postInfo._id}`}
                    className={
                      "w-10 h-10 rounded-full items-center justify-center font-bold text-center text-blue-500"
                    }
                  >
                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                  </Link>
                  <a
                    className={
                      "w-10 h-10 rounded-full items-center justify-center font-bold text-center text-red-500"
                    }
                    onClick={() => setShow(!show)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          <h1 className={"w-full h-full text-center font-bold text-2xl mt-4  "}>
            Post Details
          </h1>
          <div
            className={"w-full h-full p-2 mb-3 mt-2 bg-[#fff] "}
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          ></div>
          <div
            className={
              "w-full h-full flex justify-between items-center mb-3 text-[20px] font-bold text-blue-950  px-3"
            }
          >
            <p className={"text-gray-950 md:text-2xl"}>Do you like it ?</p>
            <span>
              {liked ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-thumbs-down"
                  onClick={dislikeIt}
                  className={`${liked ? "text-red-600" : "text-blue-500"}`}
                  size={"xl"}
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-thumbs-up"
                  onClick={likeIt}
                  size={"xl"}
                  className={`${liked ? "text-red-600" : "text-blue-500"}`}
                />
              )}
            </span>
          </div>
        </div>
        <div className={"md:w-1/4 h-fit w-full flex flex-col "}>
          Popular Details
        </div>
      </section>
    </div>
  );
};
