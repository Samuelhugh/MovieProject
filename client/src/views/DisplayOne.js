import React from "react";
import Header from "../components/Header";
import OneMovie from "../components/OneMovie";

const DisplayOne = (props) => {
  const { isLoggedIn } = props;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <OneMovie />
    </div>
  );
};

export default DisplayOne;
