import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";
import { GlobalContextProvider } from "./context/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
