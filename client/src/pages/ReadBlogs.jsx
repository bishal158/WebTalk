import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getFilteredPosts } from "../redux/postSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categories } from "../constants/inputs.js";
import { base_url } from "../constants/constants.js";
import moment from "moment-timezone";
import { LoadingSpinner } from "../components/static/LoadingSpinner.jsx";
import { Link } from "react-router-dom";

export const ReadBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("All");
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getFilteredPosts(filterBy));
  }, [filterBy]);
  const filterPost = (value) => {
    setFilterBy(value);
  };
  return (
    <div>
      <section className={"w-full md:h-screen h-full  flex flex-wrap gap-0 "}>
        <div className={"w-full h-fit md:w-1/4 md:h-full flex flex-col p-2"}>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            id={"search"}
            name={"search"}
            className={
              "w-full rounded-[10px] border-[2px] border-black placeholder:text-gray-600 p-2 mb-2"
            }
            placeholder={"Search for posts"}
          />
          <div
            className={
              "w-full h-fit flex flex-wrap list-none mt-1.5 bg-[#fff] p-2 items-center justify-start"
            }
          >
            <li
              className={
                "w-full h-12 flex items-center text-2xl text-start font-bold p-1"
              }
            >
              Topics
            </li>
            {categories.map((category, index) => {
              return (
                <li
                  key={index}
                  className={`max-w-full h-[40px] flex justify-start items-center  px-3 font-medium text-[#ffffff] border-white m-0.5 cursor-pointer bg-[#1f1f1a]  rounded-[15px] mb-3`}
                  id={"category"}
                  onClick={() => filterPost(category.value)}
                >
                  {category.value}
                </li>
              );
            })}
          </div>
        </div>
        <div className={"w-full h-full p-2 md:w-3/4 flex flex-col"}>
          <h3
            className={
              "w-full text-2xl font-bold flex items-center py-2 text-blue-950"
            }
          >
            Recent Posts
          </h3>
          <h4 className={"flex items-center py-1 font-medium text-red-800"}>
            Filter By &#8594; "{filterBy}"
          </h4>
          <div className={"w-full h-full p-4 flex flex-col"}>
            {isLoading ? <LoadingSpinner /> : null}
            {posts.length > 0 &&
              posts
                .filter((post) => {
                  if (searchTerm === "") {
                    return post;
                  } else if (
                    post.title.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return post;
                  } else if (
                    post.author.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return post;
                  }
                })
                .map((post) => {
                  return (
                    <div
                      key={post._id}
                      className={
                        "flex w-full h-fit bg-[#f9fafb] shadow-[#FFFFFF] rounded-2xl shadow-xl mb-2 flex-col md:flex-row "
                      }
                    >
                      <div
                        className={
                          "w-full h-full md:w-1/5 flex justify-center items-center p-4 "
                        }
                      >
                        <img
                          src={base_url + "/" + post.cover}
                          className={"w-full h-full rounded-[10px]"}
                          alt={"ssss"}
                        />
                      </div>
                      <div className={"md:w-4/5 h-full w-full px-2 py-4"}>
                        <div
                          className={"w-full flex items-center justify-start"}
                        >
                          <img
                            className={
                              "w-10 h-10 rounded border-blue-950 border-[1px] mx-1"
                            }
                            src={base_url + "/" + post.author.avatar}
                            alt={"...."}
                          />
                          <span className={"w-auto text-red-800 font-medium"}>
                            {post.author.name}
                          </span>
                        </div>
                        <h1
                          className={
                            "w-full h-auto flex justify-start items-center font-bold text-[22px] "
                          }
                        >
                          {post.title}
                        </h1>
                        <p
                          className={
                            "w-full text-justify font-medium text-[18px]"
                          }
                        >
                          {post.summary}
                        </p>
                        <div
                          className={
                            "w-full h-fit py-2 px-3 font-bold flex items-center md:justify-start justify-between"
                          }
                        >
                          <span
                            className={
                              "w-1/2 h-auto flex items-center justify-start text-[16px] text-blue-800 "
                            }
                          >
                            <FontAwesomeIcon
                              icon="fa-solid fa-thumbs-up"
                              size={"lg"}
                              className={"mr-1"}
                            />
                            {post.likes.length + "+"}
                          </span>
                          <span
                            className={
                              "w-1/2 h-auto flex items-center justify-end text-[16px] text-rose-600"
                            }
                          >
                            <FontAwesomeIcon
                              icon="fa-solid fa-comment"
                              size={"lg"}
                              className={"mx-1"}
                            />
                            {post.comments.length + "+"}
                          </span>
                        </div>
                        <div
                          className={
                            "w-full flex items-center justify-between "
                          }
                        >
                          <p>
                            <time className={"text-[14px] font-bold"}>
                              {moment(post.createdAt).format(
                                "Do MMM, YYYY ddd, hh:mm A ",
                              )}
                            </time>
                          </p>
                          <Link
                            className={
                              "max-w-fit mb-3 py-2 bg-blue-950 text-white font-medium rounded-[8px] px-2 hover:-translate-y-1 hover:scale-10 duration-300"
                            }
                            to={`/post/${post._id}`}
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>
    </div>
  );
};
