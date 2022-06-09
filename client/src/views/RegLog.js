import React from "react";
import Register from "../components/Register";
import Login from "../components/Login";

const RegLog = (props) => {
  const { setIsLoggedIn } = props;

  return (
    <div>
      <h1>Welcome to Nostalgic!</h1>
      <Register />
      <hr />
      <Login setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default RegLog;
