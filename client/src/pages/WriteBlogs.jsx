import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { editorInit } from "../constants/constants.js";
import register_img from "../assets/images/Sign up.gif";
import { editorInputs } from "../constants/inputs.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const WriteBlogs = () => {
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
    // console.log(blogData.get("content"));
  };

  return (
    <div>
      <section className={""}>
        <div className={""}>
          <form onSubmit={blog_post}>
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
            <button>dadadad</button>
          </form>
        </div>
        <div>
          <img src={register_img} className={""} alt={".."} />
        </div>
      </section>
    </div>
  );
};
