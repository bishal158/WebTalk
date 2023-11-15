import { createContext, useState } from "react";

export const User_Context = createContext({});
export const User_Context_Provider = ({ children }) => {
  const [UserInfo, setUserInfo] = useState();
  return (
    <User_Context.Provider value={{ UserInfo, setUserInfo }}>
      {children}
    </User_Context.Provider>
  );
};
