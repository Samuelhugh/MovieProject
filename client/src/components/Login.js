import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        console.log(res.data, "res data!");
        setIsLoggedIn(true);
        setErrors("");
        navigate("/homepage");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.message);
      });
  };

  return (
    <>
      <h1>Login</h1>
      <p>{errors ? errors : null}</p>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign In</button>
      </form>
    </>
  );
};

export default Login;
