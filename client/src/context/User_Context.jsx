import { createContext, useState } from "react";

export const User_Context = createContext({});
export const User_Context_Provider = ({ children }) => {
  const [UserId, setUserId] = useState();
  const [UserEmail, setUserEmail] = useState();
  return (
    <User_Context.Provider
      value={{ UserId, setUserId, UserEmail, setUserEmail }}
    >
      {children}
    </User_Context.Provider>
  );
};
