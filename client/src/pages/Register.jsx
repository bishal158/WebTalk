import register_img from "../assets/images/Sign up.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice.js";
import { registerInputs } from "../constants/inputs.js";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, success, userInfo } = useSelector(
    (state) => state.auth,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    avatar: null,
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (success) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  }, [success]);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleViewPassword = (fieldName) => {
    if (fieldName === "password") {
      handleClickShowPassword();
    }
    if (fieldName === "confirmPassword") {
      handleClickShowConfirmPassword();
    }
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleProfilePictureChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setInputs((prevState) => ({
        ...prevState,
        avatar: selectedFile,
      }));
    }
  };
  const register = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    // console.log(inputs.avatar);
    userData.append("name", inputs.name);
    userData.append("avatar", inputs.avatar);
    userData.append("email", inputs.email);
    userData.append("password", inputs.password);
    userData.append("confirmPassword", inputs.confirmPassword);
    try {
      await dispatch(registerUser(userData));
    } catch (err) {
      console.log(err);
    }
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
            <img src={register_img} className={"w-96 h-96"} alt={".."} />
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
              onSubmit={register}
            >
              {registerInputs.map((field, index) => {
                return (
                  <div className={field.div_class} key={index}>
                    <span className={field.span_class}>
                      <FontAwesomeIcon icon={field.icon_1} />
                    </span>
                    <input
                      className={field.input_class}
                      type={
                        field.name === "password"
                          ? showPassword
                            ? "text"
                            : field.type
                          : field.name === "confirmPassword"
                            ? showConfirmPassword
                              ? "text"
                              : field.type
                            : field.type
                      }
                      name={field.name}
                      id={field.id}
                      onChange={
                        field.type === "file"
                          ? handleProfilePictureChange
                          : handleChange
                      }
                      placeholder={field.placeholder}
                    />
                    {field.type === "password" ? (
                      <span
                        className={field.span_class}
                        onClick={() => handleViewPassword(field.name)}
                      >
                        <FontAwesomeIcon
                          icon={
                            field.name === "password"
                              ? showPassword
                                ? field.icon_2
                                : "fa-solid fa-eye-slash"
                              : field.name === "confirmPassword"
                                ? showConfirmPassword
                                  ? field.icon_2
                                  : "fa-solid fa-eye-slash"
                                : field.icon_2
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
                {isLoading ? "Loading..." : "Create Account"}
              </button>

              {error && (
                <p
                  className={"w-full h-auto text-red-700 font-bold text-center"}
                >
                  {error.message}
                </p>
              )}
              <p className={"w-full h-auto flex justify-center items-center"}>
                <span>Already have an account? </span>
                <Link
                  to={"/login"}
                  className={
                    "underline text-start p-0 font-bold text-blue-600 bg-white"
                  }
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
