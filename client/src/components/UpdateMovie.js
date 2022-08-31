import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MainForm from './MainForm';
import Header from './Header';

const UpdateMovie = () => {
  const { id } = useParams();
  // Use the useLocation hook to bring in state from browser/previous components and also to check where it came from
  const { state } = useLocation(); // null initially unless I had to retrieve it from my backend or it comes from the browsers state (previous component/s)
  const navigate = useNavigate();
  // Create a updatedMovie object
  const [updateMovie, setUpdateMovie] = useState({
    title: '',
    genre: '',
    rating: '',
    actors: '',
    boxArtUrl: '',
    watchLength: '',
    releaseDate: '',
    movieLink: '',
    isOnNetflix: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!state) {
      axios
        .get(`http://localhost:8000/api/movies/one/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setUpdateMovie(res.data);
        })
        .catch((err) => {
          console.log(`Inside Error For useEffect In UpdateMovie ${err}`);
          if (err.response.status === 401) {
            navigate('/register');
          }
        });
    } else {
      setUpdateMovie(state);
    }
  }, [id]); // Component Update Logic - Updates every time id change

  // Dynamically account for changes
  const handleUpdateOnChange = (e) => {
    if (e.target.name === 'isOnNetflix') {
      setUpdateMovie({ ...updateMovie, [e.target.name]: e.target.checked });
    } else if (e.target.name === 'actors') {
      setUpdateMovie({
        ...updateMovie,
        [e.target.name]: e.target.value.split(','),
      });
    } else {
      setUpdateMovie({ ...updateMovie, [e.target.name]: e.target.value });
    }
  };

  const handleUpdateOnSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/movies/update/${id}`, updateMovie, {
        withCredentials: true,
      })
      .then((res) => {
        setErrors({});
        navigate(`/homepage/info/${id}`);
      })
      .catch((err) => {
        console.log(
          `Inside Error For updateSubmitHandler In UpdateMovie {$err}`
        );
        setErrors(err.response.data.error.errors);
      });
  };

  return (
    <div>
      <Header />
      <h1 className="text-light fw-light">Update {updateMovie.title}</h1>
      <MainForm
        onSubmitHandler={handleUpdateOnSubmit}
        onChangeHandler={handleUpdateOnChange}
        newMovieOrUpdateMovie={updateMovie}
        errors={errors}
        buttonText="Update it!"
      />
    </div>
  );
};

export default UpdateMovie;
