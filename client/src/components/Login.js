import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/user/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setIsLoggedIn(true);
        setErrors("");
        navigate("/homepage");
      })
      .catch((err) => {
        console.log("Inside Error For handleLogin In Login: ", err);
        setErrors(err.response.data.message);
      });
  };

  return (
    <div className="container w-50">
      <h1 className="text-light fw-light">Login</h1>
      <p className="text-danger">{errors ? errors : null}</p>
      <form onSubmit={handleLogin}>
        <div className="row row-cols-2 justify-content-evenly align-items-end text-start">
          <div className="col-sm-5">
            <label className="fst-italic text-light">Email</label>
            <input
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-sm-5">
            <label className="fst-italic text-light">Password</label>
            <input
              className="form-control"
              placeholder="Password"
              aria-label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-outline-light btn-sm-4 mt-4">
            Sign in!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
