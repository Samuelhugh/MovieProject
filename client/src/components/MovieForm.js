import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const MovieForm = (props) => {
  const { movies, setMovies } = props;
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [actors, setActors] = useState([]);
  const [boxArtUrl, setBoxArtUrl] = useState("");
  const [watchLength, setWatchLength] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [movieLink, setMovieLink] = useState("");
  const [isOnNetflix, setIsOnNetflix] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = Cookies.get("userToken");
    if (!userToken) {
      navigate("/signup");
    }
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/movies/create",
        {
          title,
          genre,
          rating,
          actors,
          boxArtUrl,
          watchLength,
          releaseDate,
          movieLink,
          isOnNetflix,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setTitle("");
        setGenre("");
        setRating("");
        setActors([]);
        setBoxArtUrl("");
        setWatchLength("");
        setReleaseDate("");
        setMovieLink("");
        setIsOnNetflix(false);
        setErrors({});
        setMovies([...movies, res.data]);
        navigate("/homepage");
      })
      .catch((err) => {
        console.log("Inside Error For onSubmitHandler In MovieForm: ", err);
        console.log(err.response);
        if (err.response.data.error.errors) {
          setErrors(err.response.data.error.errors);
        }
      });
  };

  return (
    <div>
      <h1 className="text-light fw-light">Create your Movie!</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="container row g-3 w-50 mx-auto border border-secondary m-1 p-1 rounded-2">
          <div className="input-group mb-1 col-sm-5">
            <label className="input-group-text">Title</label>
            <input
              className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />{" "}
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
          </div>
          <div className="input-group mb-1 col-sm-7">
            <label className="input-group-text">Actors</label>
            <input
              className="form-control"
              type="text"
              value={actors}
              onChange={(e) => setActors(e.target.value.split(","))}
            />
          </div>
          <div className="input-group mb-1 col-sm-7">
            <label className="input-group-text">CoverArtUrl</label>
            <input
              className="form-control"
              type="text"
              value={boxArtUrl}
              onChange={(e) => setBoxArtUrl(e.target.value)}
            />{" "}
            {errors.boxArtUrl && (
              <p className="text-danger">{errors.boxArtUrl.message}</p>
            )}
          </div>
          <div className="input-group mb-1 col-sm-7">
            <label className="input-group-text">Watch Length</label>
            <input
              className="form-control"
              type="text"
              value={watchLength}
              onChange={(e) => setWatchLength(e.target.value)}
            />{" "}
            {errors.watchLength && (
              <p className="text-danger">{errors.watchLength.message}</p>
            )}
          </div>
          <div className="input-group mb-1 col-sm-7">
            <label className="input-group-text">Release Date</label>
            <input
              className="form-control"
              type="text"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />{" "}
            {errors.releaseDate && (
              <p className="text-danger">{errors.releaseDate.message}</p>
            )}
          </div>
          <div className="input-group mb-1 col-sm-7">
            <label className="input-group-text">Movie Link</label>
            <input
              className="form-control"
              type="text"
              value={movieLink}
              onChange={(e) => setMovieLink(e.target.value)}
            />
          </div>
          <div>
            <select
              className="form-select"
              onChange={(e) => setGenre(e.target.value)}
            >
              <option>Select a Genre</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Animation">Animation</option>
              <option value="Biographical">Biographical</option>
              <option value="Comedy">Comedy</option>
              <option value="Crime">Crime</option>
              <option value="Classical">Classical</option>
              <option value="Documentary">Documentary</option>
              <option value="Drama">Drama</option>
              <option value="Experimental">Experimental</option>
              <option value="Family">Family</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Film-Noir">Film-Noir</option>
              <option value="Foreign">Foreign</option>
              <option value="Horror">Horror</option>
              <option value="Kung Fu">Kung Fu</option>
              <option value="Musical">Musical</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Silent Movie">Silent Movie</option>
              <option value="Sport">Sport</option>
              <option value="Thriller">Thriller</option>
              <option value="War">War</option>
              <option value="Western">Western</option>
            </select>{" "}
            {errors.genre && (
              <p className="text-danger">{errors.genre.message}</p>
            )}
          </div>
          <div>
            <select
              className="form-select"
              onChange={(e) => setRating(e.target.value)}
            >
              <option>Select a Rating</option>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="NC-17">NC-17</option>
            </select>{" "}
            {errors.rating && (
              <p className="text-danger">{errors.rating.message}</p>
            )}
          </div>
          <div className="form-check">
            <label className="form-check-label">
              On Netflix
              <input
                className="form-check-input"
                type="checkbox"
                checked={isOnNetflix}
                onChange={(e) => setIsOnNetflix(e.target.checked)}
              />
            </label>
          </div>
          <button className="btn btn-outline-secondary">Add Movie</button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
