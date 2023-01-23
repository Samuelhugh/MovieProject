import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const MainForm = (props) => {
  // Destructuring what I need from props object
  const {
    onSubmitHandler,
    onChangeHandler,
    newMovieOrUpdateMovie,
    errors,
    buttonText,
  } = props;
  // Use navigation hook to redirect to register if userToken is not in cookies
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = Cookies.get('userToken');
    if (!userToken) {
      navigate('/register');
    }
  }, []);

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="container row g-3 w-50 mx-auto mb-4">
          <div className="input-group mb-1 col-sm-5">
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
            <label className="input-group-text">Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              value={newMovieOrUpdateMovie.title}
              onChange={onChangeHandler}
            />
          </div>

          <div className="input-group mb-1 col-sm-7">
            <label className="input-group-text">Actors</label>
            <input
              className="form-control"
              type="text"
              name="actors"
              value={newMovieOrUpdateMovie.actors}
              onChange={onChangeHandler}
            />
          </div>

          <div className="input-group mb-1 col-sm-7">
            {errors.boxArtUrl && (
              <p className="text-danger">{errors.boxArtUrl.message}</p>
            )}
            <label className="input-group-text">CoverArtUrl</label>
            <input
              className="form-control"
              type="text"
              name="boxArtUrl"
              value={newMovieOrUpdateMovie.boxArtUrl}
              onChange={onChangeHandler}
            />
          </div>

          <div className="input-group mb-1 col-sm-7">
            {errors.watchLength && (
              <p className="text-danger">{errors.watchLength.message}</p>
            )}
            <label className="input-group-text">Watch Length</label>
            <input
              className="form-control"
              type="text"
              name="watchLength"
              value={newMovieOrUpdateMovie.watchLength}
              onChange={onChangeHandler}
            />
          </div>

          <div className="input-group mb-1 col-sm-7">
            {errors.releaseDate && (
              <p className="text-danger">{errors.releaseDate.message}</p>
            )}
            <label className="input-group-text">Release Date</label>
            <input
              className="form-control"
              type="text"
              name="releaseDate"
              value={newMovieOrUpdateMovie.releaseDate}
              onChange={onChangeHandler}
            />
          </div>

          <div className="input-group mb-1 col-sm-7">
            <label className="input-group-text">Movie Link</label>
            <input
              className="form-control"
              type="text"
              name="movieLink"
              value={newMovieOrUpdateMovie.movieLink}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            {errors.genre && (
              <p className="text-danger">{errors.genre.message}</p>
            )}
            <select
              className="form-select"
              name="genre"
              value={newMovieOrUpdateMovie.genre}
              onChange={onChangeHandler}
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
            </select>
          </div>

          <div>
            {errors.rating && (
              <p className="text-danger">{errors.rating.message}</p>
            )}
            <select
              className="form-select"
              name="rating"
              value={newMovieOrUpdateMovie.rating}
              onChange={onChangeHandler}
            >
              <option>Select a Rating</option>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="NC-17">NC-17</option>
            </select>
          </div>

          <div className="d-flex justify-content-center">
            {/* may need to wrap input with label tags, also add 2 more checkboxes */}
            <input
              className="m-1"
              type="checkbox"
              name="isOnNetflix"
              checked={newMovieOrUpdateMovie.isOnNetflix}
              onChange={onChangeHandler}
            />
            <label className="form-check-label">On Netflix?</label>
          </div>

          <button className="btn btn-outline-light text-dark">
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainForm;
