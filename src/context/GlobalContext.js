import { createContext, useState } from "react";
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [error, setError] = useState({
    show: false,
    message: "",
    color: "red",
  });

  return (
    <GlobalContext.Provider value={{ error, setError }}>
      {children}
    </GlobalContext.Provider>
  );
};
