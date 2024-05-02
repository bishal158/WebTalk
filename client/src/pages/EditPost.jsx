import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { updatePost } from "../redux/postSlice.js";
import { categories, editorInputs } from "../constants/inputs.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@tinymce/tinymce-react";
import { editorInit } from "../constants/constants.js";
import writing_img from "../assets/images/Write.gif";
import { LoadingSpinner } from "../components/static/LoadingSpinner.jsx";

export const EditPost = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { id } = useParams();
  const { isLoading, error, success, posts, postInfo } = useSelector(
    (state) => state.post,
  );
  const editorRef = useRef(null);
  const [blog, setBlog] = useState({
    title: postInfo.title,
    cover: null,
    summary: postInfo.summary,
    category: postInfo.category,
  });
  const handleChange = (e) => {
    setBlog((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleProfilePictureChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setBlog((prevState) => ({
        ...prevState,
        cover: selectedFile,
      }));
    }
  };
  const update_post = async (e) => {
    e.preventDefault();
    const blogData = new FormData();
    blogData.append("title", blog.title);
    blogData.append("summary", blog.summary);
    blogData.append("category", blog.category);
    blogData.append("id", id);
    blogData.append("content", editorRef.current.getContent());
    blogData.append("cover", blog.cover);
    try {
      await dispatch(updatePost(blogData));
      if (success) {
        navigator(`/post/${id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section
        className={
          "w-full h-full flex flex-wrap justify-start items-center px-2 py-4 md:px-1.5 "
        }
      >
        {isLoading ? <LoadingSpinner /> : null}
        <div
          className={
            "w-full h-full flex flex-col justify-center items-center overflow-hidden md:w-3/4 md:h-full"
          }
        >
          <form
            onSubmit={update_post}
            className={"w-full h-full flex flex-wrap flex-col"}
          >
            <div className={"w-full mb-5 flex"}>
              <span
                className={
                  "bg-slate-200 flex justify-center items-center w-10 h-10 border border-gray-300"
                }
              >
                <FontAwesomeIcon icon="fa-solid fa-file-pen" size={"lg"} />
              </span>
              <input
                className={
                  "w-full h-10 flex justify-start items-center px-1 py-1 bg-gray-50 border border-gray-300 text-black-900 placeholder:font-bold"
                }
                type={"text"}
                name={"title"}
                id={"title"}
                value={blog.title}
                placeholder={"Give a title"}
                maxLength={80}
                onChange={handleChange}
              />
            </div>
            <div className={"w-full mb-5 flex"}>
              <span
                className={
                  "bg-slate-200 flex justify-center items-center w-10 h-10 border border-gray-300"
                }
              >
                <FontAwesomeIcon icon="fa-solid fa-user" size={"lg"} />
              </span>
              <input
                className={
                  "w-full h-10 flex justify-start items-center px-1 py-1 bg-gray-50 border border-gray-300 text-black-900 placeholder:font-bold"
                }
                type={"file"}
                name={"cover"}
                id={"cover"}
                placeholder={"Give a cover"}
                onChange={handleProfilePictureChange}
              />
            </div>
            <div className={"w-full mb-5 flex"}>
              <span
                className={
                  "bg-slate-200 flex justify-center items-center w-10 h-10 border border-gray-300"
                }
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-clipboard-list"
                  size={"lg"}
                />
              </span>
              <input
                className={
                  "w-full h-10 flex justify-start items-center px-1 py-1 bg-gray-50 border border-gray-300 text-black-900 placeholder:font-bold"
                }
                type={"text"}
                name={"summary"}
                id={"summary"}
                placeholder={"Give a summary"}
                maxLength={250}
                value={blog.summary}
                onChange={handleChange}
              />
            </div>
            <div className={"w-full  mb-5 flex"}>
              <Editor
                apiKey="g5t0lb044xbvf9kxol6dy9sv9297lj3ixsrzbn6ckyxkyhzz"
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue={postInfo.content}
                name={"content"}
                id={"content"}
                init={editorInit}
              />
            </div>
            <div className={"w-full mb-5 flex"}>
              <span
                className={
                  "bg-slate-200 flex justify-center items-center w-10 h-10 border border-gray-300"
                }
              >
                <FontAwesomeIcon icon="fa-solid fa-list" />
              </span>
              <select
                name="category"
                id={"category"}
                value={blog.category}
                placeholder={"Select a category"}
                onChange={handleChange}
                className={
                  "w-full h-10 flex justify-start items-center px-1 py-1  bg-gray-50 border border-gray-300 text-black-900 placeholder:font-bold"
                }
              >
                {categories.map((category, index) => {
                  return (
                    <option key={index} value={category.value}>
                      {category.value}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              className={
                "w-full md:w-[16rem] p-2 mb-5 bg-indigo-50 text-white rounded mt-2 valid:bg-indigo-950"
              }
            >
              {isLoading ? "Updating..." : "Update Post"}
            </button>
          </form>
        </div>
        <div className={"w-full h-full  md:w-3/12 md:h-full"}>
          <img src={writing_img} className={""} alt={".."} />
        </div>
      </section>
    </div>
  );
};
