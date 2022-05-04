import React from "react";

const LoadingSippner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "rgba(255,255,255, 0.5)",
      }}
    >
      <img
        src="https://c.tenor.com/64UaxgnTfx0AAAAC/memes-loading.gif"
        alt="loading.."
      />
    </div>
  );
};

export default LoadingSippner;
