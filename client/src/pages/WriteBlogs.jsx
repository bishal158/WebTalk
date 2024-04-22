import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { editorInit } from "../constants/constants.js";
import writing_img from "../assets/images/Write.gif";
import { editorInputs } from "../constants/inputs.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { registerUser } from "../redux/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { savePost } from "../redux/postSlice.js";

export const WriteBlogs = () => {
  const dispatch = useDispatch();
  const { isLoading, error, success, posts } = useSelector(
    (state) => state.post,
  );
  const editorRef = useRef(null);
  const [blog, setBlog] = useState({
    title: "",
    cover: null,
    summary: "",
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
    // console.log(blog);
    // console.log(inputs.avatar);
    blogData.append("title", blog.title);
    blogData.append("cover", blog.cover);
    blogData.append("summary", blog.summary);
    blogData.append("content", editorRef.current.getContent());
    try {
      await dispatch(savePost(blogData));
    } catch (err) {
      console.log(err);
    }
    // console.log(blogData.get("content"));
  };

  return (
    <div>
      <section
        className={
          "w-full h-full flex flex-wrap justify-start items-center px-2 py-4 md:px-1.5 "
        }
      >
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
                    onChange={
                      field.type === "file"
                        ? handleProfilePictureChange
                        : handleChange
                    }
                  />
                </div>
              );
            })}
            <Editor
              apiKey="g5t0lb044xbvf9kxol6dy9sv9297lj3ixsrzbn6ckyxkyhzz"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
              name={"content"}
              id={"content"}
              init={editorInit}
            />
            <button
              className={
                "w-full md:w-[16rem] p-2 mb-5 bg-indigo-50 text-white rounded mt-2 valid:bg-indigo-950"
              }
            >
              Post
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
