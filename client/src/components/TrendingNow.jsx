import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingPosts } from "../redux/postSlice.js";
import { base_url } from "../constants/constants.js";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TrendingNow = () => {
  const dispatch = useDispatch();
  const { isLoading, postInfo, trendingPosts } = useSelector(
    (state) => state.post,
  );
  useEffect(() => {
    dispatch(getTrendingPosts());
  }, [dispatch]);
  return (
    <>
      <div
        className={
          "w-full md:h-96 h-56 flex flex-col py-4 px-1 justify-start items-center overflow-y-scroll mt-2"
        }
      >
        {trendingPosts.map((trendingPosts) => {
          return (
            <div
              key={trendingPosts._id}
              className={
                "w-full h-60 flex border mb-3 bg-[#fff]  shadow-white border-b-2"
              }
            >
              <div
                className={
                  "w-1/5 h-full max-h-full p-1 flex justify-center items-center"
                }
              >
                <img
                  className={
                    "w-full h-full border-1 border-black rounded-[5px]"
                  }
                  src={base_url + "/" + trendingPosts.cover}
                  alt={"...."}
                />
              </div>
              <div className={"w-4/5 h-full max-h-full flex flex-col"}>
                <Link
                  className={
                    "w-full h-full px-2 text-[14px] text-blue-600 underline"
                  }
                  to={`/post/${trendingPosts._id}`}
                >
                  {trendingPosts.title}
                </Link>
                <p className={"w-full h-full px-2 "}>
                  <time className={"text-[12px] font-medium"}>
                    {moment(trendingPosts.createdAt).format(
                      "Do MMM, YYYY ddd, hh:mm A ",
                    )}
                  </time>
                </p>
                <h1
                  className={
                    "w-full h-full px-2 flex justify-between items-center"
                  }
                >
                  <span className={"mr-1 font-medium"}>Likes:</span>
                  <span>
                    <FontAwesomeIcon
                      icon="fa-solid fa-heart"
                      className={"text-red-700 mr-1"}
                    />
                    {trendingPosts.likes.length}
                  </span>
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
