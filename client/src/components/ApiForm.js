import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
// import {useNavigate} from "react-router-dom";

const ApiForm = () => {
  const [everyMovies, setEveryMovies] = useState([]);

  useEffect(() => {
    axios
      .get('https://imdb-api.com/en/API/MostPopularMovies/k_4821f82n')
      .then((res) => {
        console.log(res.data);
        setEveryMovies(res.data.items);
        // console.log(everyMovies);
        // console.log(`Object Keys Res.Data ${Object.keys(res.data)}`);
      })
      .catch((err) => {
        console.log('ERROR - ' + err);
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
          to={'/testing'}
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
      <div className="row row-cols-1 row-cols-md-4 g-4 mb-4">
        {everyMovies.slice(0, 12).map((move) => (
          <div className="col" key={move.id}>
            <div className="card border-dark bg-info h-100">
              <img
                src={move.image}
                className="w-50 mx-auto h-auto card-img-top mt-1"
                alt={move.title}
              />
              <div className="card-body">
                <h5 className="d-flex justify-content-center card-title">
                  {move.title}
                </h5>
                <p className="card-text">Crew - {move.crew}</p>
                <p className="card-text">IMDb Rating - {move.imDbRating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ApiForm;
