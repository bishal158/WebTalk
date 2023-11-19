import { toast } from "react-toastify";

export const success_toast = () => {
  toast.success("Post Successful", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    icon: "✔️",
  });
};
const error_toast = () => {
  toast.error("Login Failed", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    icon: "❌",
  });
};
