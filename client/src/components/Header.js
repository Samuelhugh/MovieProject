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
    console.log("INSIDE userToken Check");
    const userToken = Cookies.get('userToken');
    if (userToken) {
      const userToShow = jwtDecode(userToken);
      // console.log("USERTOSHOW", userToShow);
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
        console.log("Inside handleLogout for Header");
        Cookies.remove("userToken");
        setUser(null);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="header">
      <h1>Movies List!</h1>
      <NavLink className="nav-link" to={"/homepage"}>
        Home
      </NavLink>
      <span> | </span>
      <NavLink className="nav-link" to={"/homepage/new"}>
        New Movie
      </NavLink>
      <span> | </span>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {user ? (
          <div>
            <h3>
              Hello, {user.firstName} {user.lastName}
            </h3>
            <span> | </span>
            <button onClick={(e) => handleLogout(e)}>Logout</button>
          </div>
        ) : null}
        <button onClick={(e) => handleLogout(e)}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
