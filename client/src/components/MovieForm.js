import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

const MovieForm = (props) => {
  const { movies, setMovies } = props;
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [actors, setActors] = useState([]);
  const [boxArtUrl, setBoxArtUrl] = useState("");
  const [watchLength, setWatchLength] = useState(0);
  const [releaseDate, setReleaseDate] = useState(0);
  const [movieLink, setMovieLink] = useState("");
  const [isOnNetflix, setIsOnNetflix] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log("INSIDE userToken Check");
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
        console.log("Inside ONSUBMITHANDLER for MovieForm");
        setTitle("");
        setGenre("");
        setRating("");
        setActors([]);
        setBoxArtUrl("");
        setWatchLength(0);
        setReleaseDate(0);
        setMovieLink("");
        setIsOnNetflix(false);
        setErrors({});
        setMovies([...movies, res.data]);
        navigate("/homepage");
      })
      .catch((err) => {
        console.log("INSIDE ERROR FOR ONSUBMITHANDLER IN MovieForm: ", err);
        console.log(err.response);
        if (err.response.data.error.errors) {
          setErrors(err.response.data.error.errors);
        }
      });
  };

  return (
    <div>
      <h1>Pet Shelter</h1>
      <h2>Know a pet needing a home?</h2>
      <Link to={"/homepage"}>Home</Link>
      <form onSubmit={onSubmitHandler}>
        <label>Title</label>
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Genre</label>
        {errors.genre && <p className="text-danger">{errors.genre.message}</p>}
        <select onChange={(e) => setGenre(e.target.value)}>
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
        </select>
        <label>Rating</label>
        {errors.rating && (
          <p className="text-danger">{errors.rating.message}</p>
        )}
        <select onChange={(e) => setRating(e.target.value)}>
          <option>Select a Rating</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
          <option value="NC-17">NC-17</option>
        </select>
        <label>actors</label>
        {errors.actors && (
          <p className="text-danger">{errors.actors.message}</p>
        )}
        <input
          type="text"
          value={actors}
          onChange={(e) => setActors(e.target.value.split(","))}
        />
        <label>boxArtUrl</label>
        {errors.boxArtUrl && (
          <p className="text-danger">{errors.boxArtUrl.message}</p>
        )}
        <input
          type="text"
          value={boxArtUrl}
          onChange={(e) => setBoxArtUrl(e.target.value)}
        />
        <label>watch Length</label>
        {errors.watchLength && (
          <p className="text-danger">{errors.watchLength.message}</p>
        )}
        <input
          type="number"
          value={watchLength}
          onChange={(e) => setWatchLength(e.target.value)}
        />
        <label>release Date</label>
        {errors.releaseDate && (
          <p className="text-danger">{errors.releaseDate.message}</p>
        )}
        <input
          type="number"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <label>Movie Link(IMDb)</label>
        {errors.movieLink && (
          <p className="text-danger">{errors.movieLink.message}</p>
        )}
        <input
          type="text"
          value={movieLink}
          onChange={(e) => setMovieLink(e.target.value)}
        />
        <label>
          isOnNetflix{" "}
          <input
            type="checkbox"
            checked={isOnNetflix}
            onChange={(e) => setIsOnNetflix(e.target.checked)}
          />
        </label>
        <br />
        <input type="submit" value="Add Movie" />
      </form>
    </div>
  );
};

export default MovieForm;
