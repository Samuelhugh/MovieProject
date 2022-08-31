import React from "react";
import axios from "axios";

const MainDelete = (props) => {
  const { movieId, deletionHandler } = props;

  const deleteHandler = () => {
    axios
      .delete(`http://localhost:8000/api/movies/delete/${movieId}`, {
        withCredentials: true,
      })
      .then((res) => {
        deletionHandler(movieId);
      })
      .catch((err) => console.log(`In MainDelete deleteHandler ${err}`));
  };

  return (
    <button className="btn btn-outline-info btn-sm" onClick={deleteHandler}>
      Delete
    </button>
  );
};

export default MainDelete;
