import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import RegLog from './views/RegLog';
import Login from './components/Login';
import AllMovies from './components/AllMovies';
import MovieForm from './components/MovieForm';
import UpdateMovie from './components/UpdateMovie';
import OneMovie from './components/OneMovie';
import Profile from './components/Profile';
// import Test from './components/ApiForm';
import Welcome from './components/Welcome';
import Registration from './components/Registration';
import AltAllMovies from './components/AlternativeAllMovies';
import { GlobalProvider } from './context/MyContext';

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Routes>
          {/* <Route element={<Test />} path="/testing" /> */}
          <Route element={<AltAllMovies />} path="/alt" />
          <Route element={<Welcome />} path="/" default />
          <Route element={<Registration />} path="/registration" />
          {/* <Route element={<RegLog />} path="/register" /> */}
          <Route element={<Login />} path="/login" />
          <Route element={<AllMovies />} path="/homepage" />
          <Route element={<MovieForm />} path="/homepage/new" />
          <Route element={<UpdateMovie />} path="/homepage/update/:id" />
          <Route element={<OneMovie />} path="/homepage/info/:id" />
          <Route element={<Profile />} path="/homepage/profile/:userName" />
        </Routes>
      </div>
    </GlobalProvider>
  );
}

export default App;
