import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = () => {
  const { userName } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/movies/byUser/${userName}`,{},
      {
        withCredentials: true,
      })
      .then((res) => {
        console.log("USER MOVIES", movies);
        const userToken = Cookies.get("userToken");
        if (!userToken) {
          navigate("/signup");
        }
        setMovies(res.data);
      })
      .catch((err) => console.log("PROFILE ERROR", err));
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>You are viewing {userName} Profile</h1>
      {movies.map((movie) => (
        <div key={movie._id}>
          <p>{movie.title}</p>
          <p>{movie.genre}</p>
          <p>{movie.releaseYear}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;