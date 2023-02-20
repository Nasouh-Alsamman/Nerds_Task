import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list2 }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [list2]);

  return (
    <div className="alertcontainer">
      <p className={`alert${type}`}>{msg}</p>
    </div>
  );
};

export default Alert;
