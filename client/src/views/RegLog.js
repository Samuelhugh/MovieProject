import React from 'react';
import { NavLink } from 'react-router-dom';
import Registration from '../components/Registration';
import Login from '../components/Login';
import Reel from '../assets/reel.jpg';

const RegLog = (props) => {
  const { setIsLoggedIn } = props;

  return (
    <div className="mb-2">
      <h1 className="text-info fw-bold">ReelFeels</h1>
      {/* <nav className="d-flex ms-5">
        <NavLink className="fw-italic btn btn-outline-info btn-sm" to={'/'}>
          Back
        </NavLink>
      </nav> */}
      <div className="d-flex">
        <Registration />
        <Login setIsLoggedIn={setIsLoggedIn} />
      </div>
      <span>
        <img
          style={{
            'margin-left': '950px',
            'margin-top': '70px',
            filter: 'drop-shadow(0 -6mm 4mm rgb(0,191,230))',
          }}
          src={Reel}
          alt="Movie Reel"
        />
      </span>
    </div>
  );
};

export default RegLog;
