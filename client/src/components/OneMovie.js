import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, Link, useNavigate } from "react-router-dom";

const OneMovie = () => {
  // const { removeFromDom } = props;
  const [oneMovie, setOneMovie] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/movies/one/${id}`,{},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("Inside useEffect in OneMovie");
          const userToken = Cookies.get("userToken");
          if (!userToken) {
            navigate("/signup");
          }
        setOneMovie(res.data);
      })
      .catch((err) => {
        console.log("INSIDE USEEFFECT ERROR FOR OneMovie: ", err);
        // if (err.response.status === 401) {
        //   navigate("/signup");
        // }
      });
  }, []);

  const handleDelete = (movieID) => {
    axios
      .delete(
        `http://localhost:8000/api/movies/delete/${movieID}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("Inside handleDelete in OneMovie");
        navigate("/homepage");
        setOneMovie(oneMovie.filter((movie) => movie._id !== movieID));
      })
      .catch((err) => {
        console.log("INSIDE ERROR FOR HANDLEDELETE IN OneMovie: ", err);
      });
  };

  return (
    <>
      <h1>Pet Shelter</h1>
      <h2>Details about: {oneMovie.title}</h2>
      <div>
        <Link to={"/homepage"}>Home</Link>
        <p>
          <button onClick={(e) => handleDelete(oneMovie._id)}>
            Delete {oneMovie.title}
          </button>
        </p>
        <h3>Title: {oneMovie.title}</h3>
      </div>
    </>
  );
};

export default OneMovie;
