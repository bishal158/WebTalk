import "./Read_Blogs.css";
import cover_image from "../../assets/images/programming-background-collage.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
const Read_Blogs = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user/getPost").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      <h2 className="text-dark text-center bg-body-tertiary p-3">Blogs!!!</h2>
      {posts.length > 0 &&
        posts.map((posts) => {
          return (
            <div
              className="container-fluid d-flex mt-3 p-3 mb-3"
              style={{ height: "100%", width: "100%" }}
              key={posts._id}
            >
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-3">
                    <Link to={`/post/${posts._id}`}>
                      <img
                        src={"http://localhost:5000/" + posts.images}
                        className="img-fluid"
                        alt="..."
                        style={{ width: "500px", height: "400px" }}
                      />
                    </Link>
                  </div>
                  <div className="col-md-9">
                    <div className="card-header">
                      <Link to={"/post/id"} className={"Link"}>
                        <h5 className="card-title">{posts.title}</h5>
                      </Link>
                    </div>
                    <div className="card-body">
                      <p className="card-text">{posts.summary}</p>
                      <p className="card-text">
                        <a className="author">Author: {posts.author.email}</a>
                        <time className={"mx-1 p-1"}>
                          {format(
                            new Date(posts.createdAt),
                            "MMM d, yyyy HH:mm:ss",
                          )}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
export default Read_Blogs;
