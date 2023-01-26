import React, { useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../context/MyContext';

const AlternativeAllMovies = (props) => {
  const { getAllMovies, movies } = useContext(GlobalContext);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/movies/all', {
        withCredentials: true,
      })
      .then((res) => {
        getAllMovies(res.data);
      })
      .catch((err) => {
        console.log(`Inside Error For useEffect In AllMovies ${err}`);
      });
  }, []);

  return (
    <>
      <div>
        <h1 className="titleMargin text-info fw-bold">
          Welcome to the Home of ReelFeels!
        </h1>
      </div>
      <nav className="mb-4">
        <NavLink
          className="fw-italic btn btn-outline-info btn-sm me-3"
          to={'/registration'}
        >
          Sign-Up
        </NavLink>
        <NavLink
          className="fw-italic btn btn-outline-info btn-sm me-3"
          to={'/login'}
        >
          Login
        </NavLink>
        <NavLink
          className="fw-italic btn btn-outline-info btn-sm me-3"
          to={'/top'}
        >
          View 12 Current Popular Movies
        </NavLink>
        <NavLink
          className="fw-italic btn btn-outline-info btn-sm me-3"
          to={'/alt'}
        >
          View User Created Suggestions
        </NavLink>
      </nav>
      <h4 className="textLine fw-light mt-2 text-info fw-light">
        Movies Are In Chronological Order
      </h4>
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
        {movies.map((movie) => (
          <div key={movie._id}>
            <div className="col cardSizing card m-auto mb-2 rounded border shadow border-dark">
              <img
                className="imageSize w-25 p-3 m-auto"
                src={movie.boxArtUrl}
                alt={movie.title}
              />
              <div className="card-body">
                <h4 className="card-title">{movie.title}</h4>
                <h5 className="card-text">{movie.rating}</h5>
                <h5 className="card-text">
                  Created by: {movie.createdBy.userName}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AlternativeAllMovies;
