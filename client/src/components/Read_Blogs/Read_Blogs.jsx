import "./Read_Blogs.css";
import cover_image from "../../assets/images/programming-background-collage.jpg";
import { Link } from "react-router-dom";
const Read_Blogs = () => {
  return (
    <>
      <h2 className="text-dark text-center bg-body-tertiary p-3">Blogs!!!</h2>
      <div
        className="container-fluid mt-3 p-3"
        // style={{ height: "100%", width: "100%" }}
      >
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-3">
              <img src={cover_image} className="img-fluid" alt="..." />
            </div>
            <div className="col-md-9">
              <div className="card-header d-flex align-items-center">
                <h5 className="card-title">Card title</h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.This is a wider card with supporting text below as a
                  natural lead-in to additional content. This content is a
                  little bit longer.
                </p>
                <p className="card-text">
                  <a className="author">Mafuj Ahmed Bishal</a>
                  <time>2023-10-12 08:30 PM</time>
                </p>
              </div>
              <div className="card-footer d-flex align-items-center">
                <Link to={"/"} className="btn btn-success text-center m-1">
                  Read More
                </Link>
                <Link to={"/"} className="btn btn-success text-center">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Read_Blogs;
