import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DeleteModal = ({ onDelete, onClose, children }) => {
  return (
    <div
      className={
        "fixed top-0 left-0 w-full h-full flex justify-center items-center bg-modal-backdrop"
      }
    >
      <div
        className={
          "bg-[#FFFFFF] w-full mx-4 md:w-[350px] h-fit flex flex-col items-center justify-center p-8 rounded-[10px]"
        }
      >
        <div
          className={
            "w-10 h-10 bg-red-300 mb-4 flex justify-center items-center rounded-full font-bold animate-bounce"
          }
        >
          <FontAwesomeIcon
            icon="fa-solid fa-triangle-exclamation"
            size={"lg"}
            className={"font-extrabold text-red-600"}
          />
        </div>
        <div
          className={"w-full h-fit flex flex-col justify-center items-center"}
        >
          {children}
        </div>
        <div className={"w-full h-fit flex items-center justify-between "}>
          <button
            className={
              "text-[16px] max-w-fit h-fit bg-red-600 px-4 py-2 rounded-[16px] hover:shadow-2xl text-white font-bold"
            }
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className={
              "text-[16px] max-w-fit h-fit bg-blue-600 px-4 py-2 rounded-[16px] hover:shadow-2xl text-white font-bold"
            }
          >
            Keep it
          </button>
        </div>
      </div>
    </div>
  );
};
