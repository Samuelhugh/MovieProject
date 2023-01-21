import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import Header from './Header';
import { GlobalContext } from '../context/MyContext';

const AllMovies = (props) => {
  const { getAllMovies, movies } = useContext(GlobalContext);
  const [socket] = useState(() => io(':8000'));

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('movieDeleted', (allMovies) => {
        getAllMovies(allMovies);
      });
    });
    axios
      .get('http://localhost:8000/api/movies/all', {
        withCredentials: true,
      })
      .then((res) => {
        getAllMovies(res.data);
      })
      .catch((err) => {
        console.log(`Inside Error For useEffect In AllMovies ${err}`);
      });
    return () => socket.disconnect(true);
  }, []);

  const handleDelete = (movieID) => {
    socket.emit('clientDeletedMovie', movieID);
  };

  return (
    <>
      <Header />
      <h4 className="textLine fw-light mt-2 text-info fw-light">
        Movies Are In Chronological Order
      </h4>
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
        {movies.map((movie) => (
          <div key={movie._id}>
            <div className="col cardSizing card m-auto mb-2 rounded border-info">
              <img className="imageSize w-25 p-3 m-auto" src={movie.boxArtUrl} alt={movie.title} />
              <div className="card-body">
                <h4 className="card-title">{movie.title}</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item border-info">
                    <strong className="card-text">Rating: </strong>
                    {movie.rating}
                  </li>
                  <li className="list-group-item border-info">
                    <strong className="card-text">On Netflix? </strong>
                    {movie.isOnNetflix ? <p>Yes!</p> : <p>Not on Netflix.</p>}
                  </li>
                  <li className="list-group-item border-info">
                    <strong className="card-text">Created by: </strong>
                    <Link
                      className="link-dark textLink"
                      to={`/homepage/profile/${movie.createdBy.userName}`}
                    >
                      {movie.createdBy.userName}
                    </Link>
                  </li>
                  <li className="list-group-item border-info">
                    <strong className="card-text">Details About: </strong>
                    <Link
                      className="link-dark textLink"
                      to={`/homepage/info/${movie._id}`}
                      state={movie}
                    >
                      {movie.title}
                    </Link>
                  </li>
                  <li className="list-group-item border-info">
                    <Link
                      className="btn btn-info textLink me-4"
                      to={`/homepage/update/${movie._id}`}
                      state={movie}
                    >
                      Edit
                    </Link>
                    <button className="btn btn-outline-warning" onClick={() => handleDelete(movie._id)}>
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllMovies;
