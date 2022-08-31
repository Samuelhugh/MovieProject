import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegLog from './views/RegLog';
import Login from './components/Login';
import AllMovies from './components/AllMovies';
import MovieForm from './components/MovieForm';
import UpdateMovie from './components/UpdateMovie';
import OneMovie from './components/OneMovie';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<RegLog />} path="/register" default />
          <Route element={<Login />} path="/login" />
          <Route element={<AllMovies />} path="/homepage" />
          <Route element={<MovieForm />} path="/homepage/new" />
          <Route element={<UpdateMovie />} path="/homepage/update/:id" />
          <Route element={<OneMovie />} path="/homepage/info/:id" />
          <Route element={<Profile />} path="/homepage/profile/:userName" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
