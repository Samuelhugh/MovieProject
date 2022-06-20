import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
// import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
import axios from "axios";

const AllMovies = (props) => {
  const { movies, setMovies } = props;
  const [socket] = useState(() => io(":8000"));
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Inside Token Check In Header");
  //   const userToken = Cookies.get("userToken");
  //   if (userToken) {
  //     const userToShow = jwtDecode(userToken);
  //     setUser(userToShow);
  //   }
  // }, []);

  useEffect(() => {
    socket.on("connect", () => {
      socket.on("movieDeleted", (allMovies) => {
        setMovies(allMovies);
      });
    });
    axios
      .get("http://localhost:8000/api/movies/all", {
        withCredentials: true,
      })
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log("Inside Error For useEffect In AllMovies: ", err);
        if (err.response.status === 401) {
          navigate("/signup");
        }
      });
    return () => socket.disconnect(true);
  }, []);

  const handleDelete = (movieID) => {
    socket.emit("clientDeletedMovie", movieID);
  };

  return (
    <>
      <h4 className="textLine lead">
        Movies Are In Order From Newest To Oldest!
      </h4>
      <div className="headerBg mx-auto w-75 rounded-2">
        <div className="mx-auto d-flex flex-wrap justify-content-center border-info">
          {movies.map((movie) => (
            <div
              className="card text-dark border-info shadow w-25 m-4 fst-italic"
              key={movie._id}
            >
              <img
                className="w-50 mx-auto p-2"
                src={movie.boxArtUrl}
                alt={movie.title}
              />
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item border-secondary">
                    <strong className="card-title">Title: </strong>
                    {movie.title}
                  </li>
                  <li className="list-group-item border-secondary">
                    <strong className="card-text">Rating: </strong>
                    {movie.rating}
                  </li>
                  <li className="list-group-item border-secondary">
                    <strong className="card-text">On Netflix? </strong>
                    {movie.isOnNetflix ? <p>Yes!</p> : <p>Not on Netflix.</p>}
                  </li>
                  <li className="list-group-item border-secondary">
                    <strong className="card-text">Created by: </strong>
                    <Link
                      className="link-info textLink"
                      to={`/homepage/profile/${movie.createdBy.userName}`}
                    >
                      {movie.createdBy.userName}
                    </Link>
                  </li>
                  <li className="list-group-item border-secondary">
                    <strong className="card-text">Details About: </strong>
                    <Link
                      className="link-info textLink"
                      to={`/homepage/info/${movie._id}`}
                    >
                      {movie.title}
                    </Link>
                  </li>
                  <li className="list-group-item border-secondary">
                    <Link
                      className="link-info textLink me-4"
                      to={`/homepage/edit/${movie._id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={() => handleDelete(movie._id)}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllMovies;
