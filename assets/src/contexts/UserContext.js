import React, { createContext, useContext } from "react";
import useDataApi from "../hooks/useDataApi";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [{ data, isLoading, isError }, setUrl, fetchUser] = useDataApi(
    "/users/user",
    {pk: 0,
    username: ""}
  );

  return (
    <UserContext.Provider value={{ user: data, isErrorUser: isError, isLoadingUser: isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
