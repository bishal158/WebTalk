import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const NotAvailableModal = ({ message, link }) => {
  return (
    <div
      className={
        "fixed top-0 left-0 w-full h-full flex justify-center items-center bg-modal-backdrop"
      }
    >
      <div
        className={
          "bg-[#FFFFFF] w-full mx-4 md:w-[350px] h-fit flex flex-col items-center justify-center p-8 rounded-[8px]"
        }
      >
        <FontAwesomeIcon
          icon="fa-solid fa-face-frown-open"
          className={"text-red-800 animate-bounce font-extrabold mb-2"}
          size={"3x"}
        />
        <h1 className={"text-3xl font-bold mb-3"}>Oops!</h1>
        <h2 className={"text-black text-center font-medium text-2xl mb-3"}>
          {message}
        </h2>
        <Link className={"underline text-blue-800 font-bold  "} to={link}>
          Back to blogs
        </Link>
      </div>
    </div>
  );
};
