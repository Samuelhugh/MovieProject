import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import MainDelete from './MainDelete';
import Header from './Header';

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
        console.log(`Inside Error For useEffect In Profile ${err}`);
        if (err.response.status === 401) {
          navigate('/register');
        }
      });
  }, []);

  const handleDelete = () => {
    navigate(`/homepage/profile/${userName}`);
  };

  return (
    <div>
      <Header />
      <h1 className="fw-light text-light">
        Viewing{' '}
        <small className="text-muted text-light fw-light">
          {userName} Page!
        </small>
      </h1>
      <div className='row row-cols-1 row-cols-md-2 g-4 mb-4 me-4 ms-4'>
      {movies.map((movie) => (
        <div
          key={movie._id}
        >
        <div className='card col border-info rounded-2 shadow fst-italic headerBg'>
          <img
            src={movie.boxArtUrl}
            className="imageSize mx-auto mt-1"
            alt={movie.title}
          />
          <div className="card-body">
            <ul className="list-group w-50 mx-auto">
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
                <span className='ms-2'>
                <MainDelete
                  movieId={movie._id}
                  deletionHandler={handleDelete}
                />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      ))}
      </div>
    </div>
  );
};

export default Profile;
