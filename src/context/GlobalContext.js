import { createContext, useEffect, useState } from "react";
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [error, setError] = useState({
    show: false,
    message: "",
    color: "",
  });

  return (
    <GlobalContext.Provider value={{ error, setError }}>
      {children}
    </GlobalContext.Provider>
  );
};
