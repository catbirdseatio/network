import React from "react";
import { useUserContext } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = useUserContext();

  return user.is_authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
