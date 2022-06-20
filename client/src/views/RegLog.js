import React from "react";
import Register from "../components/Register";
import Login from "../components/Login";

const RegLog = (props) => {
  const { setIsLoggedIn } = props;

  return (
    <div className="mb-2">
      <h1 className="bg-secondary text-info fw-light">
        Welcome to Nostalgia Reels!
      </h1>
      <div className="d-flex">
        <Register />
        <Login setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
};

export default RegLog;
