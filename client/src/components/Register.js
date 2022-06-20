import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmMsg, setConfirmMsg] = useState("");
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
      .post("http://localhost:8000/api/user/register", user)
      .then((res) => {
        setUser({
          userName: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        setConfirmMsg("Thank You For Signing Up, You Can Now Sign In!");
        navigate("/signup");
      })
      .catch((err) => {
        console.log("Inside Error For handleSubmit In Register: ", err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container w-50">
      {confirmMsg ? <p className="text-success">{confirmMsg}</p> : null}
      <h1 className="text-light fw-light">Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="row row-cols-2 justify-content-evenly align-items-end text-start">
          <div className="col-sm-5">
            <label htmlFor="userName" className="fst-italic text-light">
              Username
            </label>
            {errors.userName ? (
              <p className="text-danger">{errors.userName.message}</p>
            ) : null}
            <input
              className="form-control"
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
            <label htmlFor="firstName" className="fst-italic text-light">
              First Name
            </label>
            {errors.firstName ? (
              <p className="text-danger">{errors.firstName.message}</p>
            ) : null}
            <input
              className="form-control"
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
            <label htmlFor="lastName" className="fst-italic text-light">
              Last Name
            </label>
            {errors.lastName ? (
              <p className="text-danger">{errors.lastName.message}</p>
            ) : null}
            <input
              className="form-control"
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
            <label htmlFor="email" className="fst-italic text-light">
              Email
            </label>
            {errors.email ? (
              <p className="text-danger">{errors.email.message}</p>
            ) : null}
            <input
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-5">
            <label htmlFor="password" className="fst-italic text-light">
              Password
            </label>
            {errors.password ? (
              <p className="text-danger">{errors.password.message}</p>
            ) : null}
            <input
              className="form-control"
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
            <label htmlFor="confirmPassword" className="fst-italic text-light">
              Confirm Password
            </label>
            {errors.confirmPassword ? (
              <p className="text-danger">{errors.confirmPassword.message}</p>
            ) : null}
            <input
              className="form-control"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-outline-light btn-sm-2 mt-4">
            Sign me up!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
