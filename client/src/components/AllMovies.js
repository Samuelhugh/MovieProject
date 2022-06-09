import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const AllMovies = (props) => {
  const { movies, setMovies } = props;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/api/movies/all",{},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("Inside useEffect in AllMovies");
        const userToken = Cookies.get("userToken");
        if (!userToken) {
          navigate("/signup");
        }
        setMovies(res.data);
      })
      .catch((err) => {
        console.log("INSIDE ERROR FOR USEEFFECT IN AllMovies: ", err);
      });
  }, []);

  const handleDelete = (movieID) => {
    axios
      .delete(
        `http://localhost:8000/api/movies/delete/${movieID}`,{},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("Inside handleDelete in AllMovies");
        setMovies(movies.filter((movie) => movie._id !== movieID));
        navigate("/homepage");
      })
      .catch((err) => {
        console.log("INSIDE ERROR FOR HANDLEDELETE IN AllMovies: ", err);
      });
  };

  return (
    <div>
      <h4>*Movies Are In Order From Newest To Oldest</h4>
      <Link to={"/homepage/new"}>Add a Movie</Link>
      <div>
        {movies.map((movie) => (
          <div className="movie" key={movie._id}>
            <h2>{movie.title}</h2>
            <img src={movie.boxArtUrl} alt="" />
            <br />
            <p>Created by:</p>
            <Link to={`/homepage/profile/${movie.createdBy.userName}`}>
              {movie.createdBy.userName}
            </Link>
            <br />
            <Link to={`/homepage/info/${movie._id}`}>
              Details About {movie.title}
            </Link>
            <span> | </span>
            <Link to={`/homepage/edit/${movie._id}`}>Update {movie.title}</Link>
            <br />
            <button onClick={() => handleDelete(movie._id)}>
              Delete {movie.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
