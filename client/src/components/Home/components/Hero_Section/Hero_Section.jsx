import "./Hero_Section.css";
import hero_section from "../../../../assets/images/Blog post.gif";
export const Hero_Section = () => {
  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-7">
            <h5 className="animate-character">Web Talk</h5>
            <h1 className="text">
              <span>Staying up-to-date on the latest trends and news</span>
            </h1>
            <h5 className="text-start text-dark p-5">
              "The Web as I envisaged it, we have not seen it yet. The future is
              still so much bigger than the past."
              <b className="text-primary">-Tim Berners Lee</b>
            </h5>
          </div>
          <div className="col-md-5">
            <img src={hero_section} className="img-fluid" alt="...." />
          </div>
        </div>
      </div>
    </>
  );
};
