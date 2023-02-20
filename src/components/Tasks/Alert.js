import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [list]);

  return (
    <div className="alertcontainer">
      <p className={`alert${type}`}>{msg}</p>
    </div>
  );
};

export default Alert;
