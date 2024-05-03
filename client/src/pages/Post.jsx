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
import { LoadingSpinner } from "../components/static/LoadingSpinner.jsx";
import { DeleteModal } from "../utils/DeleteModal.jsx";
import { NotAvailableModal } from "../utils/NotAvailableModal.jsx";
import { TrendingNow } from "../components/TrendingNow.jsx";
import { WriteComment } from "../components/WriteComment.jsx";
import { PostComments } from "../components/PostComments.jsx";

export const Post = () => {
  const navigation = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(!show);
  const dispatch = useDispatch();
  const { posts, isLoading, error, success, postInfo, deleted } = useSelector(
    (state) => state.post,
  );

  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch]);
  const deletePost = async () => {
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
  // post not found
  if (!postInfo) {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return (
      <NotAvailableModal
        message={"Post Not Available"}
        link={"/read-blogs"}
      ></NotAvailableModal>
    );
  }
  return (
    <div>
      <h1 className={"w-full h-fit text-3xl px-3 font-bold text-[#1f1f1f]"}>
        {postInfo.title}
      </h1>
      <section
        className={
          "w-full h-full flex  flex-wrap justify-start items-start px-3 py-4 "
        }
      >
        {show && (
          <DeleteModal onDelete={deletePost} onClose={handleClose}>
            <h1 className={"text-[18px] mb-2 text-center font-bold"}>
              Delete Post
            </h1>
            <p className={"text-[15px]  text-center font-medium mb-4"}>
              This will permanently delete this post
            </p>
          </DeleteModal>
        )}
        {isLoading ? <LoadingSpinner /> : null}
        {/*Post detail and comment side*/}
        <div
          className={
            "md:w-3/4 flex flex-col w-full h-fit bg-[#EDF0F2]  rounded-[10px] dark:bg-black  dark:text-white "
          }
        >
          <div className={"w-full h-full  flex justify-center items-center"}>
            <img
              src={base_url + "/" + postInfo.cover}
              className={"md:w-full md:h-96 h-60 w-full rounded"}
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
                    "flex  text-[14px] px-1 md:text-[16px] cursor-pointer"
                  }
                >
                  <Link
                    to={`/post/edit/${postInfo._id}`}
                    className={
                      "w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-center bg-blue-300 mx-2"
                    }
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-pen-to-square"
                      className={
                        "text-blue-800 hover:shadow-black hover:shadow-2xl"
                      }
                    />
                  </Link>
                  <a
                    className={
                      "w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-center bg-red-300"
                    }
                    onClick={() => setShow(!show)}
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-trash"
                      className={
                        "text-red-800 hover:shadow-black hover:shadow-2xl"
                      }
                    />
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          <h1 className={"w-full h-full text-center font-bold text-2xl mt-4  "}>
            Post Details
          </h1>
          <div
            className={
              "w-full h-full p-2  mt-2 bg-[#F9FAFB] overflow-hidden dark:text-white border-[2px]"
            }
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          ></div>
          <div
            className={
              "w-full h-full flex justify-between items-center mb-3 text-[20px] font-bold text-blue-950 py-2 px-3 border-[2px]"
            }
          >
            <p className={"text-blue-500 md:text-[18px] font-bold"}>
              Do you like it ?
            </p>
            <span>
              {liked ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-thumbs-down"
                  onClick={dislikeIt}
                  className={`${
                    liked
                      ? "text-red-600 hover:animate-bounce"
                      : "text-blue-500 hover:animate-bounce"
                  }`}
                  size={"lg"}
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-thumbs-up"
                  onClick={likeIt}
                  size={"lg"}
                  className={`${
                    liked
                      ? "text-red-600 hover:animate-bounce"
                      : "text-blue-500 hover:animate-bounce"
                  }`}
                />
              )}
            </span>
          </div>
          <PostComments />
        </div>
        {/*Write comments and Trending Post Side*/}
        <div className={"md:w-1/4 h-fit w-full flex flex-col md:px-3 mt-2  "}>
          <WriteComment />
          <h1
            className={
              "w-full h-10 bg-gray-900 border flex justify-center items-center text-center text-white font-normal rounded-[8px] text-[20px] py-4"
            }
          >
            Trending Now
          </h1>
          <p>
            {postInfo.comments.map((comment, index) => {
              return (
                <span key={index}>
                  {comment.commentedBy === userInfo._id ? "yes" : "no"}
                </span>
              );
            })}
          </p>
          <TrendingNow />
        </div>
      </section>
    </div>
  );
};
