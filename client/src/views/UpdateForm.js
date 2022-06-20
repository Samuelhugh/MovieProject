import React from "react";
import Header from "../components/Header";
import UpdateMovie from "../components/UpdateMovie";

const UpdateForm = (props) => {
  const { isLoggedIn } = props;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <UpdateMovie />
    </div>
  );
};

export default UpdateForm;
