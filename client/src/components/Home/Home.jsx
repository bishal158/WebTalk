import { Hero_Section } from "./components/Hero_Section/Hero_Section.jsx";
import { useContext } from "react";
import { User_Context } from "../../context/User_Context.jsx";
import { toast } from "react-toastify";

export const Home = () => {
  const success_toast = () => {
    toast.success("Login Successful", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      onClick: () => {
        navigator("/login");
      },
      draggable: true,
      progress: undefined,
      theme: "dark",
      icon: "✔️",
    });
  };
  const { UserInfo } = useContext(User_Context);
  return (
    <>
      {UserInfo && success_toast()}
      <Hero_Section />
    </>
  );
};
