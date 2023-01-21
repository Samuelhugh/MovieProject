import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Header from './Header';
import { GlobalContext } from '../context/MyContext';

const AllMovies = (props) => {
  // const [canShow, setCanShow] = useState(null);
  const { getAllMovies, movies } = useContext(GlobalContext);
  const [socket] = useState(() => io(':8000'));
  const navigate = useNavigate();

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
        // if (err.response.status === 401) {
        //   navigate('/registration');
        // }
      });
    return () => socket.disconnect(true);
  }, []);

  const handleDelete = (movieID) => {
    socket.emit('clientDeletedMovie', movieID);
  };

  // useEffect(() => {
  //   const userToken = Cookies.get('userToken');
  //   if (userToken) {
  //     const userToShow = jwtDecode(userToken);
  //     setCanShow(userToShow);
  //   } else {
  //     navigate('/');
  //   }
  // }, []);

  return (
    <>
      <Header />
      {/* 
        <>
          <div>
            <h1
              style={{ 'margin-right': '19px' }}
              className="text-info fw-bold"
            >
              Welcome to the Home of ReelFeels!
            </h1>
          </div>
          <nav
            style={{ 'margin-left': '200px', 'margin-bottom': '10px' }}
            className="d-flex"
          >
            <NavLink className="fw-light btn btn-outline-info btn-sm" to={'/'}>
              Back
            </NavLink>
          </nav>
        </> */}
      {/* )} */}
      {/* <div>
        <h1 style={{ 'margin-right': '19px' }} className="text-info fw-bold">
          Welcome to the Home of ReelFeels!
        </h1>
      </div>
      <nav
        style={{ 'margin-left': '200px', 'margin-bottom': '10px' }}
        className="d-flex"
      >
        <NavLink className="fw-light btn btn-outline-info btn-sm" to={'/'}>
          Back
        </NavLink>
      </nav> */}
      <h4 className="textLine fw-light mt-2 text-info fw-light">
        Movies Are In Chronological Order
      </h4>
      {/* <div className="mx-auto w-75"> */}
      <div className="row row-cols-1 row-cols-md-4 g-3">
        {movies.map((movie) => (
          <div
            className="col bg-info text-light border-light fw-light"
            key={movie._id}
          >
            <div className="card">
              <span>
                <img
                  className="w-50 mx-auto h-auto card-img-top"
                  src={movie.boxArtUrl}
                  alt={movie.title}
                />
              </span>
              <div className="card-body">
                <h5>
                  <strong className="card-title">Title: </strong>
                  {movie.title}
                </h5>
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
                      className="link-dark textLink me-4"
                      to={`/homepage/update/${movie._id}`}
                      state={movie}
                    >
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(movie._id)}>
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {/* <ul className="list-group">
                <li className="list-group-item border-secondary">
                  <strong className="card-title">Title: </strong>
                  {movie.title}
                </li>
                <li className="list-group-item border-secondary">
                  <strong className="card-text">Rating: </strong>
                  {movie.rating}
                </li>
                <li className="list-group-item border-secondary">
                  <strong className="card-text">On Netflix? </strong>
                  {movie.isOnNetflix ? <p>Yes!</p> : <p>Not on Netflix.</p>}
                </li>
                <li className="list-group-item border-secondary">
                  <strong className="card-text">Created by: </strong>
                  <Link
                    className="link-info textLink"
                    to={`/homepage/profile/${movie.createdBy.userName}`}
                  >
                    {movie.createdBy.userName}
                  </Link>
                </li>
                <li className="list-group-item border-secondary">
                  <strong className="card-text">Details About: </strong>
                  <Link
                    className="link-info textLink"
                    to={`/homepage/info/${movie._id}`}
                    state={movie}
                  >
                    {movie.title}
                  </Link>
                </li>
                <li className="list-group-item border-secondary">
                  <Link
                    className="link-info textLink me-4"
                    to={`/homepage/update/${movie._id}`}
                    state={movie}
                  >
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(movie._id)}>
                    Delete
                  </button>
                </li>
              </ul> */}
            {/* </div> */}
          </div>
        ))}
      </div>
      {/* </div> */}
    </>
  );
};

export default AllMovies;
