import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "../redux/postSlice.js";
import { base_url } from "../constants/constants.js";

export const Carasoul = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  return (
    <>
      <div
        className={
          "md:w-[600px] md:h-[600px] flex justify-center items-center overflow-hidden"
        }
      >
        {posts.map((post) => {
          return (
            <div className={"w-full h-full"} key={post._id}>
              <img
                src={base_url + "/" + post.cover}
                alt={"sss"}
                className={"w-full h-full"}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
