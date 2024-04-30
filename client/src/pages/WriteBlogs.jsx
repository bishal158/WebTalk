import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { editorInit } from "../constants/constants.js";
import writing_img from "../assets/images/Write.gif";
import { categories, editorInputs } from "../constants/inputs.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { savePost } from "../redux/postSlice.js";
import { useNavigate } from "react-router-dom";
import { Toast } from "../utils/Toast.jsx";
import { LoadingSpinner } from "../components/LoadingSpinner.jsx";

export const WriteBlogs = () => {
  const [showToast, setShowToast] = useState(true);
  const handleToast = () => {
    setShowToast(false);
  };
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { isLoading, error, success, posts } = useSelector(
    (state) => state.post,
  );
  const editorRef = useRef(null);
  const [blog, setBlog] = useState({
    title: "",
    cover: null,
    summary: "",
    category: "",
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

  const blog_post = async (e) => {
    e.preventDefault();
    const blogData = new FormData();
    blogData.append("title", blog.title);
    blogData.append("cover", blog.cover);
    blogData.append("summary", blog.summary);
    blogData.append("category", blog.category);
    blogData.append("content", editorRef.current.getContent());
    try {
      await dispatch(savePost(blogData));
      if (success) {
        navigator("/read-blogs");
      }
    } catch (err) {}
  };
  return (
    <div>
      <section
        className={
          "w-full h-full flex flex-wrap justify-start items-center px-2 py-4 md:px-1.5 "
        }
      >
        {/* if success*/}
        {/*{showToast && (*/}
        {/*  <Toast*/}
        {/*    type="success"*/}
        {/*    onClose={handleToast}*/}
        {/*    content={"Please wait..."}*/}
        {/*  ></Toast>*/}
        {/*)}*/}
        <div
          className={
            "w-full h-full flex flex-col justify-center items-center overflow-hidden md:w-3/4 md:h-full"
          }
        >
          <form
            onSubmit={blog_post}
            className={"w-full h-full flex flex-wrap flex-col"}
          >
            {editorInputs.map((field, index) => {
              return (
                <div className={field.div_class} key={index}>
                  <span className={field.span_class}>
                    <FontAwesomeIcon icon={field.icon} size={"lg"} />
                  </span>
                  <input
                    className={field.input_class}
                    type={field.type}
                    name={field.name}
                    id={field.id}
                    placeholder={field.placeholder}
                    maxLength={
                      field.name === "title"
                        ? 80
                        : field.name === "summary"
                          ? 250
                          : null
                    }
                    // minLength={
                    //   field.name === "title"
                    //     ? 80
                    //     : field.name === "summary"
                    //       ? 250
                    //       : null
                    // }
                    onChange={
                      field.type === "file"
                        ? handleProfilePictureChange
                        : handleChange
                    }
                  />
                </div>
              );
            })}
            <div className={"w-full  mb-5 flex"}>
              <Editor
                apiKey="g5t0lb044xbvf9kxol6dy9sv9297lj3ixsrzbn6ckyxkyhzz"
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
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
              {isLoading ? "Posting..." : "Post"}
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
