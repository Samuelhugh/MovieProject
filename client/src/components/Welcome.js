import React from 'react';
import { NavLink } from 'react-router-dom';
import Reel from '../assets/reel.jpg';

const Welcome = () => {
  return (
    <div>
      <div>
        <h1 className="titleMargin text-info fw-bold">
          Welcome to the Home of ReelFeels!
        </h1>
      </div>
      <nav>
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
      <div>
        <img
          className="homeImage"
          src={Reel}
          alt="Movie Reel"
        />
      </div>
    </div>
  );
};

export default Welcome;
