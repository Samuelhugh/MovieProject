import React from "react";
import Header from "../components/Header";
import MovieForm from "../components/MovieForm";

const ShowForm = (props) => {
  const { movies, setMovies } = props;
  const { isLoggedIn } = props;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <MovieForm movies={movies} setMovies={setMovies} />
    </div>
  );
};

export default ShowForm;
