import React, { createContext, useContext } from "react";
import axios from "../axios";

const ApiContext = createContext();

const ApiProvider = ({ children }) => (
  <ApiContext.Provider value={axios}>{children}</ApiContext.Provider>
);

export const useApi = () => useContext(ApiContext);

export default ApiProvider;
