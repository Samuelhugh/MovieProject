import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MainDelete from './MainDelete';
import Header from './Header';
import { GlobalContext } from '../context/MyContext';

const OneMovie = (props) => {
  const { id } = useParams();
  const { state } = useLocation();
  const { getOneMovie, movie } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      axios
        .get(`http://localhost:8000/api/movies/one/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          getOneMovie(res.data);
        })
        .catch((err) => {
          console.log(`Inside useEffect Error For OneMovie ${err}`);
          if (err.response.status === 401) {
            navigate('/register');
          }
        });
    } else {
      getOneMovie(state);
    }
  }, []);

  const handleDelete = () => {
    navigate('/homepage');
  };

  return (
    <>
      <Header />
      <h1>
        <em className="text-light fw-light">Details about {movie.title}</em>
      </h1>
      <div className="container border border-light w-50 fst-italic mb-4">
        <img
          src={movie.boxArtUrl}
          className="rounded mx-auto d-block p-2"
          alt={movie.title}
        />
        <div className="row justify-content-start flex-direction-row-reverse align-items-center">
          <div className="col">
            <h4 className='text-info underlineWords'>Genre: </h4>
            <h6 className='text-light'>{movie.genre}</h6>
          </div>
          <div className="col">
            <h4 className='text-info underlineWords'>Actors: </h4>
            {movie.actors ? (
              <h6 className='text-light'>{movie.actors.join(',')}</h6>
            ) : (
              <h6 className='text-light'>No Actors to Display :/</h6>
            )}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col">
            <h4 className='text-info underlineWords'>Rating: </h4>
            <h6 className='text-light'>{movie.rating}</h6>
          </div>
          <div className="col">
            <h4 className='text-info underlineWords'>Movie Link: </h4>
            {movie.movieLink ? (
              <h6 className='text-light'>{movie.movieLink}</h6>
            ) : (
              <h6 className='text-light'>No Movie Link to Display :/</h6>
            )}
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col">
            <h4 className='text-info underlineWords'>Release Date: </h4>
            <h6 className='text-light'>{movie.releaseDate}</h6>
          </div>
          <div className="col">
            <h4 className='text-info underlineWords'>Watch Length: </h4>
            <h6 className='text-light'>{movie.watchLength}</h6>
          </div>
          <span className="mb-2">
          <MainDelete movieId={movie._id} deletionHandler={handleDelete} />
          </span>
        </div>
      </div>
    </>
  );
};

export default OneMovie;
