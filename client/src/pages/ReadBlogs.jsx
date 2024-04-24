import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/postSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categories } from "../constants/inputs.js";
import { base_url } from "../constants/constants.js";
import { format } from "date-fns";
import moment from "moment-timezone";

export const ReadBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  const filterPost = (value) => {
    setFilterBy(value);
  };

  return (
    <div>
      <section className={"w-full h-screen flex flex-wrap gap-0 "}>
        <div className={"w-full h-fit md:w-1/4 md:h-full flex flex-col p-2"}>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            id={"search"}
            name={"search"}
            className={
              "w-full rounded-[3px] border-[2px] border-black placeholder:text-gray-600 p-2 mb-2"
            }
            placeholder={"Search for posts"}
          />
          <div
            className={
              "w-full h-fit flex md:flex-col  md:overflow-hidden overflow-auto list-none mt-1.5 bg-gray-300"
            }
          >
            <li
              className={
                "w-full h-12 flex items-center text-2xl text-start font-bold border-r-2 md:border-b-2 p-1"
              }
            >
              Topics
            </li>
            {categories.map((category, index) => {
              return (
                <li
                  key={index}
                  className={`w-full h-12 flex justify-start items-center border-r-2 md:border-b-2 p-1 font-medium text-black border-white m-0.5 cursor-pointer`}
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
            {posts.map((post, index) => {
              return (
                <div
                  key={index}
                  className={
                    "flex w-full h-fit bg-[#ffffff] shadow-sky-50 rounded-2xl shadow-xl mb-2 flex-col md:flex-row "
                  }
                >
                  <div className={"w-full h-full md:w-1/5"}>
                    <img
                      src={base_url + "/" + post.cover}
                      className={"w-full h-full py-1 rounded"}
                      alt={"ssss"}
                    />
                  </div>
                  <div className={"md:w-3/5 h-full w-full px-2"}>
                    <h1>{post.title}</h1>
                    <p className={"w-full text-justify"}>{post.summary}</p>
                    <p
                      className={
                        "w-full font-bold p-2 flex items-center justify-between"
                      }
                    >
                      <span className={"text-red-800"}>{post.author.name}</span>
                      <time>
                        {moment(post.createdAt).format(
                          "Do MMM YYYY dddd h:mm A ",
                        )}
                      </time>
                    </p>
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
