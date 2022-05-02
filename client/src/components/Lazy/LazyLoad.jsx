import React from "react";

const LazyLoad = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif"
        alt="loading...."
      ></img>
    </div>
  );
};

export default LazyLoad;
