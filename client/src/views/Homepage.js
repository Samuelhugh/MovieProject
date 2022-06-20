import React from "react";
import Header from "../components/Header";
import AllMovies from "../components/AllMovies";

const Homepage = (props) => {
  const { movies, setMovies } = props;
  const { isLoggedIn } = props;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <AllMovies movies={movies} setMovies={setMovies} />
    </div>
  );
};

export default Homepage;
