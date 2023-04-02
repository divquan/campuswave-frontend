import React, { useContext, useEffect, useState } from "react";
import "./ErrorMessage.scss";
import { GlobalContext } from "../../context/GlobalContext";

const ErrorMessage = () => {
  const { setError, error } = useContext(GlobalContext);
  //   const clear = se4tTimeout(() => setError({ show: false }), 4000);

  return (
    <>
      {error && error.show && (
        <div
          className="error-message"
          onClick={() => {
            setError({ show: false });
          }}
        >
          <p>{error.message}</p>
          <span>❌</span>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
