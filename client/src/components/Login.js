import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Reel from '../assets/reel.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:8000/api/user/login',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setErrors('');
        navigate('/homepage');
      })
      .catch((err) => {
        console.log(`Inside Error For handleLogin In Login ${err}`);
        setErrors(err.response.data.message);
      });
  };

  return (
    <div className="container w-50">
      <h1 className="text-light fw-light">Login</h1>
      <nav className="d-flex" style={{ 'margin-left': '37px' }}>
        <NavLink className="fw-light btn btn-outline-info btn-sm" to={'/'}>
          Back
        </NavLink>
      </nav>
      <p
        style={{ 'font-weight': '700', 'font-size': 'large' }}
        className="text-danger"
      >
        {errors ? errors : null}
      </p>
      <form onSubmit={handleLogin}>
        <div className="row row-cols-2 justify-content-evenly align-items-end text-start">
          <div className="col-sm-5">
            <label className="fw-italic text-light">E-mail Address</label>
            <input
              className="fw-italic form-control"
              placeholder="Email@gmail.com"
              aria-label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-sm-5">
            <label className="fw-italic text-light">Password</label>
            <input
              className="fw-italic form-control"
              placeholder="Password"
              aria-label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="fw-light btn btn-outline-light btn-sm-4 mt-4">
            Log-In!
          </button>
        </div>
      </form>
      <span>
        <img
        className='themeStyleLog'
          src={Reel}
          alt="Movie Reel"
        />
      </span>
    </div>
  );
};

export default Login;
