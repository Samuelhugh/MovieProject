import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { userName } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/movies/byUser/${userName}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log("Inside Error For useEffect In Profile: ", err);
        if (err.response.status === 401) {
          navigate("/signup");
        }
      });
  }, []);

  return (
    <div>
      <h1 className="fw-light text-light">
        Viewing{" "}
        <small className="text-muted text-light fw-light">
          {userName} Page!
        </small>
      </h1>
      {movies.map((movie) => (
        <div
          key={movie._id}
          className="card container border-info rounded-2 shadow text-light fst-italic w-50 mb-1 headerBg"
        >
          <img
            src={movie.boxArtUrl}
            className="card-img-top w-25 h-25 p-1 mx-auto"
            alt={movie.title}
          />
          <div className="card-body">
            <ul className="list-group w-25 mx-auto">
              <li className="list-group-item border-info">
                <strong className="card-title">Title: </strong>
                {movie.title}
              </li>
              <li className="list-group-item border-info">
                <strong className="card-text">Genre: </strong>
                {movie.genre}
              </li>
              <li className="list-group-item border-info">
                <Link
                  className="btn btn-info btn-sm"
                  to={`/homepage/info/${movie._id}`}
                >
                  View Movie Details!
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
