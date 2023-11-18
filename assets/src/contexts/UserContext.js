import React, { createContext, useContext } from "react";
import useDataApi from "../hooks/useDataApi";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [{ data, isLoading, isError }, setUrl, fetchUser] = useDataApi(
    "/users/user",
    {}
  );

  const isAuthenticated = () => (data.is_authenticated);

  return (
    <UserContext.Provider value={{ user:data, isErrorUser: isError, isLoadingUser: isLoading, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
