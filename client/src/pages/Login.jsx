import register_img from "../assets/images/Sign up.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginInputs } from "../constants/inputs.js";
import { loginUser } from "../redux/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, userInfo } = useSelector(
    (state) => state.auth,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (userInfo) {
      navigate("/read-blogs");
    } else {
      navigate("/login");
    }
  }, [userInfo]);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(input));
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <section className="w-full h-full flex justify-center items-center px-2 py-4 md:px-0 ">
        <div className="w-full h-full  flex flex-wrap items-center justify-center rounded border-2 border-slate-300 shadow-2xl md:w-[69rem] md:h-[38rem] bg-white ">
          <div
            className={
              "w-full h-full md:w-1/2 md:h-full flex flex-col justify-center items-center overflow-hidden"
            }
          >
            <img src={register_img} className={"w-full h-full"} alt={".."} />
            <h1 className={"text-xl mb-7 font-bold text-black text-center"}>
              Dont have an account
            </h1>
          </div>
          <div className="w-full h-full mb-3 md:w-1/2 md:h-full flex justify-center items-center flex-col ">
            <h1 className={"text-xl mb-3 font-bold "}>Create an account</h1>
            <form
              className={
                "w-full h-fit flex flex-col justify-center items-center"
              }
              onSubmit={login}
            >
              {loginInputs.map((field, index) => {
                return (
                  <div key={index} className={field.div_class}>
                    <span className={field.span_class}>
                      <FontAwesomeIcon
                        icon={field.icon_1}
                        className={"animate-bounce"}
                      />
                    </span>
                    <input
                      className={field.input_class}
                      type={showPassword ? "text" : field.type}
                      name={field.name}
                      id={field.name}
                      placeholder={field.placeholder}
                      // value={name}
                      onChange={handleChange}
                    />
                    {field.type === "password" ? (
                      <span
                        className={field.span_class}
                        onClick={handleShowPassword}
                      >
                        <FontAwesomeIcon
                          icon={
                            showPassword
                              ? field.icon_2
                              : "fa-solid fa-eye-slash"
                          }
                        />
                      </span>
                    ) : null}
                  </div>
                );
              })}
              <button
                className={
                  "w-[16rem] p-2 mb-5 bg-indigo-50 text-white rounded valid:bg-indigo-950"
                }
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
              <p className={"w-full h-auto flex justify-center items-center"}>
                <span>Don't have a account? </span>
                <Link
                  to={"/register"}
                  className={
                    "underline text-start p-0 font-bold text-blue-600 bg-white"
                  }
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
