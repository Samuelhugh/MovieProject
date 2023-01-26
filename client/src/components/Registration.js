import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Reel from '../assets/reel.jpg';

const Register = () => {
  const [user, setUser] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [confirmMsg, setConfirmMsg] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/api/user/register', user)
      .then((res) => {
        setUser({
          userName: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
        setConfirmMsg('Thank You For Signing Up, You Can Now Sign-In!');
        navigate('/registration');
      })
      .catch((err) => {
        console.log(`Inside Error For handleSubmit In Register ${err}`);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container w-50">
      <h1 className="text-light fw-light">Sign-Up</h1>
      {confirmMsg ? <p className="text-success">{confirmMsg}</p> : null}
      <nav
        style={{ 'margin-left': '35px', 'margin-bottom': '10px' }}
        className="d-flex"
      >
        <NavLink className="fw-light btn btn-outline-info btn-sm" to={'/'}>
          Back
        </NavLink>
      </nav>
      <form onSubmit={handleSubmit}>
        <div className="row row-cols-2 justify-content-evenly align-items-end text-start">
          <div className="col-sm-5">
            <label htmlFor="userName" className="fw-italic text-light">
              Username
            </label>
            {errors.userName ? (
              <p
                style={{ 'font-weight': '700', 'font-size': 'medium' }}
                className="text-danger"
              >
                {errors.userName.message}
              </p>
            ) : null}
            <input
              className="fw-italic form-control"
              placeholder="Username"
              aria-label="Username"
              type="text"
              name="userName"
              id="userName"
              value={user.userName}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-5">
            <label htmlFor="firstName" className="fw-italic text-light">
              First Name
            </label>
            {errors.firstName ? (
              <p
                style={{ 'font-weight': '700', 'font-size': 'medium' }}
                className="text-danger"
              >
                {errors.firstName.message}
              </p>
            ) : null}
            <input
              className="fw-italic form-control"
              placeholder="First Name"
              aria-label="First Name"
              type="text"
              name="firstName"
              id="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-5">
            <label htmlFor="lastName" className="fw-italic text-light">
              Last Name
            </label>
            {errors.lastName ? (
              <p
                style={{ 'font-weight': '700', 'font-size': 'medium' }}
                className="text-danger"
              >
                {errors.lastName.message}
              </p>
            ) : null}
            <input
              className="fw-italic form-control"
              placeholder="Last Name"
              aria-label="Last Name"
              type="text"
              name="lastName"
              id="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-5">
            <label htmlFor="email" className="fw-italic text-light">
              E-mail Address
            </label>
            {errors.email ? (
              <p
                style={{ 'font-weight': '700', 'font-size': 'medium' }}
                className="text-danger"
              >
                {errors.email.message}
              </p>
            ) : null}
            <input
              className="fw-italic form-control"
              placeholder="E-mail@gmail.com"
              aria-label="Email"
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-5">
            <label htmlFor="password" className="fw-italic text-light">
              Password
            </label>
            {errors.password ? (
              <p
                style={{ 'font-weight': '700', 'font-size': 'medium' }}
                className="text-danger"
              >
                {errors.password.message}
              </p>
            ) : null}
            <input
              className="fw-italic form-control"
              placeholder="Password"
              aria-label="Password"
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-5">
            <label htmlFor="confirmPassword" className="fw-italic text-light">
              Confirm Password
            </label>
            {errors.confirmPassword ? (
              <p
                style={{ 'font-weight': '700', 'font-size': 'medium' }}
                className="text-danger"
              >
                {errors.confirmPassword.message}
              </p>
            ) : null}
            <input
              className="fw-italic form-control"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button className="fw-light btn btn-outline-light btn-sm-2 mt-4">
            Signup!
          </button>
        </div>
      </form>
      <span>
        <img
        className='regTheme'
          src={Reel}
          alt="Movie Reel"
        />
      </span>
    </div>
  );
};

export default Register;
