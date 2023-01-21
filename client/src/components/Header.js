import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = Cookies.get('userToken');
    if (userToken) {
      const userToShow = jwtDecode(userToken);
      setUser(userToShow);
    } else {
      navigate('/');
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:8000/api/user/logout',
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        Cookies.remove('userToken');
        setUser(null);
        navigate('/login');
      })
      .catch((err) => {
        console.log(`Inside Error In Header ${err}`);
      });
  };

  return (
    <header>
      <div className="container">
        <h1 className="text-info fw-bold">Welcome to the Home of ReelFeels!</h1>
        <div className="d-flex justify-content-between align-items-center">
          {user ? (
            <h3 className="text-light fw-light mt-2">
              Hello, {user.firstName} {user.lastName}!
            </h3>
          ) : null}
          <nav className="nav mt-1">
            <NavLink
              style={{ 'font-size': 'small' }}
              className="fw-light btn btn-light text-dark btn-sm me-3"
              to={'/homepage'}
            >
              Dashboard
            </NavLink>
            <NavLink
              style={{ 'font-size': 'small' }}
              className="fw-light btn btn-light text-dark btn-sm me-3"
              to={'/homepage/new'}
            >
              Create New Movie Suggestion
            </NavLink>
            {user ? (
              <button
                style={{ 'font-size': 'small' }}
                className="fw-light btn btn-light text-dark btn-sm me-3"
                onClick={(e) => handleLogout(e)}
              >
                Logout
              </button>
            ) : null}
          </nav>
        </div>
      </div>
      <hr />
    </header>
  );
};

export default Header;
