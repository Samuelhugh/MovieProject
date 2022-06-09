import React from "react";
import Header from "../components/Header";
import OneMovie from "../components/OneMovie";

const DisplayOne = (props) => {
  // const [movies, setMovies] = useState([]);
  const { isLoggedIn } = props;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <hr />
      <OneMovie />
    </div>
  );
};

export default DisplayOne;
