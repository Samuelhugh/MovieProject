import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // const [email, setEmail] = useState("");
  // const [email, setEmail] = useState("");
  // const [email, setEmail] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmMsg, setConfirmMsg] = useState("");
  const [errors, setErrors] = useState({}); // May need ""
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
        console.log(res.data);
        setUser({
          userName: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        setConfirmMsg("Thank You For Registering, You Can Now Log In!");
        navigate("/signup");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <>
      {confirmMsg ? <p>{confirmMsg}</p> : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">UserName</label>
        {errors.userName ? <p>{errors.userName.message}</p> : null}
        <input
          type="text"
          name="userName"
          id="userName"
          value={user.userName}
          onChange={handleChange}
        />
        <label htmlFor="firstName">firstName</label>
        {errors.firstName ? <p>{errors.firstName.message}</p> : null}
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">lastName</label>
        {errors.lastName ? <p>{errors.lastName.message}</p> : null}
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={user.lastName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        {errors.email ? <p>{errors.email.message}</p> : null}
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        {errors.password ? <p>{errors.password.message}</p> : null}
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">ConfirmPassword</label>
        {errors.confirmPassword ? (
          <p>{errors.confirmPassword.message}</p>
        ) : null}
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
        />
        <button>Sign Up!</button>
      </form>
    </>
  );
};

export default Register;
