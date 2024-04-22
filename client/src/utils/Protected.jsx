import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Cookies } from "react-cookie";

export const Protected = (props) => {
  const { Component } = props;
  const cookies = new Cookies();
  const token = cookies.get("token");
  console.log(token);
  let auth = { token: token };
  return auth.token ? <Component /> : <Navigate to="/login" />;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   let userInfo = localStorage.getItem("userInfo");
  //   if (!userInfo) {
  //     navigate("/login");
  //   }
  // }, []);
};
