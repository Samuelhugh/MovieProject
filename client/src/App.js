import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegLog from "./views/RegLog";
import Login from "./components/Login";
import Homepage from "./views/Homepage";
import ShowForm from "./views/ShowForm";
import UpdateForm from "./views/UpdateForm";
import DisplayOne from "./views/DisplayOne";
import ShowProfile from "./views/ShowProfile";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            element={<RegLog setIsLoggedIn={setIsLoggedIn} />}
            default
            path="/signup"
          />
          <Route
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
            path="/login"
          />
          <Route
            element={
              <Homepage
                isLoggedIn={isLoggedIn}
                movies={movies}
                setMovies={setMovies}
              />
            }
            path="/homepage"
          />
          <Route
            element={
              <ShowForm
                isLoggedIn={isLoggedIn}
                movies={movies}
                setMovies={setMovies}
              />
            }
            path="/homepage/new"
          />
          <Route
            element={
              <UpdateForm
                isLoggedIn={isLoggedIn}
                movies={movies}
                setMovies={setMovies}
              />
            }
            path="/homepage/edit/:id"
          />
          <Route
            element={
              <DisplayOne
                isLoggedIn={isLoggedIn}
                movies={movies}
                setMovies={setMovies}
              />
            }
            path="/homepage/info/:id"
          />
          <Route
            element={
              <ShowProfile
                isLoggedIn={isLoggedIn}
                movies={movies}
                setMovies={setMovies}
              />
            }
            path="/homepage/profile/:userName"
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
