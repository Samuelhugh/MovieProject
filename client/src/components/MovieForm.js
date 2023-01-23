import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainForm from './MainForm';
import Header from './Header';

const MovieForm = () => {
  // Create state for this component, remove movieLink maybe
  const [newMovie, setNewMovie] = useState({
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
  // Create errors holder
  const [errors, setErrors] = useState({});
  // Using navigation hook to redirect after submission
  const navigate = useNavigate();

  // Dynamically account for changes
  const handleOnChange = (e) => {
    if (e.target.name === 'isOnNetflix') {
      setNewMovie({ ...newMovie, [e.target.name]: e.target.checked });
    } else if (e.target.name === 'actors') {
      setNewMovie({ ...newMovie, [e.target.name]: e.target.value.split(',') });
    } else {
      setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/movies/create', newMovie, {
        withCredentials: true,
      })
      .then((res) => {
        navigate('/homepage');
      })
      .catch((err) => {
        console.log(`Inside Error For handleOnSubmit In MovieForm ${err}`);
        setErrors(err.response.data.error.errors);
      });
  };

  return (
    <div>
      <Header />
      <h1 className="text-light fw-light mb-4">Create Your Movie!</h1>
      <MainForm
        onSubmitHandler={handleOnSubmit}
        onChangeHandler={handleOnChange}
        newMovieOrUpdateMovie={newMovie}
        errors={errors}
        buttonText="Submit"
      />
    </div>
  );
};

export default MovieForm;
