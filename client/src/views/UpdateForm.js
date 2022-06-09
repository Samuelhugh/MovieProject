import React from "react";
import Header from "../components/Header";
import UpdateMovie from "../components/UpdateMovie";

const UpdateForm = (props) => {
  // const [movies, setMovies] = useState([]);
  const { isLoggedIn } = props;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <hr />
      <UpdateMovie />
    </div>
  );
};

export default UpdateForm;
