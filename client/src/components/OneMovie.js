import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MainDelete from './MainDelete';
import Header from './Header';

const OneMovie = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [oneMovie, setOneMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      axios
        .get(`http://localhost:8000/api/movies/one/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setOneMovie(res.data);
        })
        .catch((err) => {
          console.log(`Inside useEffect Error For OneMovie ${err}`);
          if (err.response.status === 401) {
            navigate('/register');
          }
        });
    } else {
      setOneMovie(state);
    }
  }, []);

  const handleDelete = () => {
    navigate('/homepage');
  };

  return (
    <>
      <Header />
      <h1>
        <em className="text-light fw-light">Details about {oneMovie.title}!</em>
      </h1>
      <div className="container border border-info w-50 headerBg text-info fst-italic">
        <img
          src={oneMovie.boxArtUrl}
          className="rounded mx-auto d-block p-2"
          alt={oneMovie.title}
        />
        <div className="row justify-content-start flex-direction-row-reverse align-items-center">
          <div className="col">
            <h4>Genre: </h4>
            <h6>{oneMovie.genre}</h6>
          </div>
          <div className="col">
            <h4>Actors: </h4>
            {oneMovie.actors ? (
              <h6>{oneMovie.actors.join(',')}</h6>
            ) : (
              <h6>No Actors to Display :/</h6>
            )}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col">
            <h4>Rating: </h4>
            <h6>{oneMovie.rating}</h6>
          </div>
          <div className="col">
            <h4>Movie Link: </h4>
            {oneMovie.movieLink ? (
              <h6>{oneMovie.movieLink}</h6>
            ) : (
              <h6>No Movie Link to Display :/</h6>
            )}
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col">
            <h4>Release Date: </h4>
            <h6>{oneMovie.releaseDate}</h6>
          </div>
          <div className="col">
            <h4>Watch Length: </h4>
            <h6>{oneMovie.watchLength}</h6>
          </div>
          <MainDelete movieId={oneMovie._id} deletionHandler={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default OneMovie;
