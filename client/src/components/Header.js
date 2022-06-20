import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Header = (props) => {
  const { isLoggedIn } = props;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = Cookies.get("userToken");
    if (userToken) {
      const userToShow = jwtDecode(userToken);
      setUser(userToShow);
    }
  }, [isLoggedIn]);

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/user/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        Cookies.remove("userToken");
        setUser(null);
        navigate("/login");
      })
      .catch((err) => {
        console.log("Inside Error In Header: ", err);
      });
  };

  return (
    <header className="headerBg">
      <div className="container">
        <h1 className="text-light fw-light">Nostalgia Reels! :)</h1>
        <div className="d-flex justify-content-between align-items-center">
          {user ? (
            <h3 className="text-light mt-1">
              <em>
                Hello, {user.firstName} {user.lastName}!
              </em>
            </h3>
          ) : null}
          <nav className="nav">
            <NavLink className="btn btn-info btn-sm me-3" to={"/homepage"}>
              Home
            </NavLink>
            <NavLink className="btn btn-info btn-sm me-3" to={"/homepage/new"}>
              New Movie
            </NavLink>
            {user ? (
              <button
                className="btn btn-outline-info btn-sm me-3"
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
