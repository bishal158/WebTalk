import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../redux/postSlice.js";
import { base_url } from "../constants/constants.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";

export const Post = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error, success, postInfo } = useSelector(
    (state) => state.post,
  );
  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [like, setLike] = useState(false);
  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch]);
  const likeIt = () => {
    console.log("liked");
    setLike(true);
  };
  const dislikeIt = () => {
    setLike(false);
  };
  if (!postInfo) return "";
  return (
    <div>
      <section
        className={"w-full h-full flex flex-wrap justify-start px-3 py-4 "}
      >
        <div
          className={
            "md:w-4/5 flex flex-col w-full h-fit bg-[#EDF0F2]  rounded dark:bg-black shadow-sky-50 shadow-xl dark:text-white"
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
                  <FontAwesomeIcon
                    icon="fa-solid fa-trash"
                    className={"mx-2.5 text-red-800"}
                  />
                  <FontAwesomeIcon
                    icon="fa-solid fa-pen-to-square"
                    className={"text-blue-500"}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <h1
            className={
              "w-full h-full text-center font-bold text-2xl mt-4  border-b-blue-950 border-b-2"
            }
          >
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
              {like ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-thumbs-down"
                  onClick={dislikeIt}
                  className={`${like ? "text-red-600" : "text-blue-500"}`}
                  size={"xl"}
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-thumbs-up"
                  onClick={likeIt}
                  size={"xl"}
                  className={`${like ? "text-red-600" : "text-blue-500"}`}
                />
              )}
            </span>
          </div>
        </div>
        <div>Popular Details</div>
      </section>
    </div>
  );
};
