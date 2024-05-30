import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTrendingPosts } from "../redux/postSlice.js";
import { base_url } from "../constants/constants.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PopularPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrendingPosts());
  }, []);
  const { trendingPosts } = useSelector((state) => state.post);
  let posts = document.querySelector("#posts");
  const next = () => {
    let width = posts.clientWidth;
    posts.scrollLeft = posts.scrollLeft + width;
  };
  const previous = () => {
    let width = posts.clientWidth;
    posts.scrollLeft = posts.scrollLeft - width;
  };
  return (
    <>
      <div
        className={
          "w-full min-h-[400px] h-fit flex flex-col justify-center items-start mb-3"
        }
      >
        <h1
          className={
            "w-full flex items-center justify-center mb-5 text-3xl text-center font-bold text-indigo-800"
          }
        >
          Popular Now
        </h1>
        <div
          className={
            "w-full  min-h-full overflow-hidden h-full p-2 relative bg-gradient-to-r from-slate-50 to-sky-50 bg-white flex justify-center items-center "
          }
        >
          <button
            className={
              "absolute top-1/2 right-2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center p-2"
            }
            onClick={next}
          >
            <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
          </button>
          <button
            className={
              "absolute top-1/2 left-2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center p-2"
            }
            onClick={previous}
          >
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
          </button>
          <div
            className={
              "w-full h-full overflow-hidden  flex justify-center items-center transition-all duration-700 ease-in-out"
            }
            id="posts"
          >
            {trendingPosts.map((post) => {
              return (
                <div
                  className={
                    "min-w-[300px] max-w-full w-[300px] h-[300px] min-h-[300px] border border-indigo-50 flex flex-col m-2 bg-[#fff] shadow rounded"
                  }
                  key={post._id}
                >
                  <div className={"w-full h-1/2 p-2"}>
                    <img
                      src={post.cover}
                      alt={"...."}
                      className={"w-full h-full rounded"}
                    />
                  </div>
                  <div className={"w-full h-full p-2 flex flex-col"}>
                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                    <Link to={`/post/${post._id}`}>Read More</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
