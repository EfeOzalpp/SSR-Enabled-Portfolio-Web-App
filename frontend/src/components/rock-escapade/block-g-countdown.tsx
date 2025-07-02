import React from "react";

const CountdownDisplay = ({ countdown }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
        zIndex: 9999,
      }}
    >
      {countdown}
    </div>
  );
};

export default CountdownDisplay;
