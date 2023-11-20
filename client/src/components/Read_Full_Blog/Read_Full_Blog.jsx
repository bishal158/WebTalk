import "./Read_Full_Blog.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { User_Context } from "../../context/User_Context.jsx";

export function Read_Full_Blog() {
  const [postInfo, setPostInfo] = useState();
  const { UserId } = useContext(User_Context);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/user/post/${id}`).then((response) => {
      response.json().then((postsInfo) => {
        setPostInfo(postsInfo);
      });
    });
  }, []);

  if (!postInfo) return "";
  return (
    <>
      <h1 className={"text-center p-3 text-dark h-25 bg-body-tertiary"}>
        Read Blog
      </h1>
      <div className={"container"}>
        {UserId === postInfo.author._id && (
          <button className={"button"}>Edit Post</button>
        )}
        <h2 className={"title"}>{postInfo.title}</h2>
        <time className={"time"}>
          {format(new Date(postInfo.createdAt), "MMM d, yyyy HH:mm:ss")}
        </time>
        <img
          className={"cover"}
          src={`http://localhost:5000/${postInfo.images}`}
          alt={"...."}
        />
        <a className="author">by {postInfo.author.email}</a>
        <div
          className={"content"}
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </div>
    </>
  );
}
