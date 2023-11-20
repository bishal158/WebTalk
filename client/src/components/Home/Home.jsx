import { Hero_Section } from "./components/Hero_Section/Hero_Section.jsx";
import { useContext } from "react";
import { User_Context } from "../../context/User_Context.jsx";
import { toast } from "react-toastify";

export const Home = () => {
  const { UserInfo } = useContext(User_Context);
  return (
    <>
      <Hero_Section />
    </>
  );
};
