import React from "react";
import Header from "../components/Header";
import Profile from "../components/Profile";

const ShowProfile = (props) => {
  const { isLoggedIn } = props;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <Profile />
    </div>
  );
};

export default ShowProfile;
