import "./Write_Blogs.css";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { Editor } from "../../editor/Editor.jsx";
const Write_Blogs = () => {
  // states
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState("");
  // references
  const title_ref = useRef();
  const summary_ref = useRef();
  const content_ref = useRef();
  // navigation
  const navigator = useNavigate();
  const blog_post = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("images", images[0]);
    e.preventDefault();
    const response = await fetch("http://localhost:5000/user/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.status === 200) {
      navigator("/");
    }
  };
  return (
    <>
      <h3 className={"text-center p-3 mb-3 bg-body-tertiary"}>
        Write Your Blogs Here
      </h3>
      <div className="container  ">
        <form onSubmit={blog_post}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder={"Give a Title"}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              ref={title_ref}
            />
            <label htmlFor="title">
              <FontAwesomeIcon icon="pen" className="mx-1" />
              Enter Title Here
            </label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder={"Summary Here"}
              value={summary}
              id="summary"
              name="summary"
              onChange={(event) => setSummary(event.target.value)}
            ></textarea>
            <label htmlFor="summary">
              <FontAwesomeIcon icon="pen-to-square" className="mx-1" />
              Summary
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="cover-image" className="form-label">
              <FontAwesomeIcon icon="images" className="mx-1" />
              Cover Image
            </label>
            <input
              className="form-control"
              type="file"
              id="images"
              name="images"
              // value={images}
              onChange={(event) => setImages(event.target.files)}
            />
          </div>
          <Editor onChange={setContent} value={content} />
          <button className="btn btn-secondary p-2 mt-2 w-100" type="submit">
            Post Blog
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
export default Write_Blogs;
