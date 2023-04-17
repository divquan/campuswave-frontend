import React, { useContext, useEffect, useState } from "react";
import "./ErrorMessage.scss";
import { GlobalContext } from "../../context/GlobalContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ErrorMessage = () => {
  const { setError, error } = useContext(GlobalContext);

  const danger = { backgroundColor: "rgba(255, 0, 0, 0.925)" };
  const good = { backgroundColor: " rgb(85, 199, 85)" };

  // console.log(color);
  return (
    <>
      {error?.show && (
        <div
          className="error-message"
          style={
            error?.color === "red"
              ? danger
              : error?.color === "green"
              ? good
              : null
          }
          onClick={() => {
            setError({ show: false });
          }}
        >
          <p>{error.message}</p>
          <AiOutlineCloseCircle size={32} />
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
