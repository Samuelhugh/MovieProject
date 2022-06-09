const Movie = require("../models/movie.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

module.exports = {
  createAnMovie: (req, res) => {
    console.log("IN CREATE MOVIE");

    const user = jwt.verify(req.cookies.userToken, SECRET);
    Movie.create({ ...req.body, createdBy: user._id })
      .then((newMovie) => {
        res.status(201).json(newMovie);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Something went wrong in create", error: err });
      });
  },

  findAllMovies: (req, res) => {
    console.log("IN FIND ALL MOVIE");

    Movie.find({})
      .populate("createdBy", "userName firstName lastName email")
      .sort({ releaseDate: 1 })
      .then((allMovies) => {
        res.json(allMovies);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Something went wrong in findAll", error: err });
      });
  },

  findOneMovie: (req, res) => {
    console.log("IN FIND ONE MOVIE");

    Movie.findOne({ _id: req.params.id })
      .then((oneMovie) => {
        res.json(oneMovie);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Something went wrong in findOne", error: err });
      });
  },

  findAllMoviesByUser: (req, res) => {
    console.log("IN MOVIES BY USER");

    User.findOne({ userName: req.params.userName })
      .then((user) => {
        Movie.find({ createdBy: user._id })
          .populate("createdBy", "userName")
          .then((allMoviesFromUser) => {
            console.log(allMoviesFromUser);
            res.json(allMoviesFromUser);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateMovie: (req, res) => {
    console.log("IN UPDATE MOVIE");

    Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updateMovie) => {
        res.json(updateMovie);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Something went wrong in update", error: err });
      });
  },

  deleteMovie: (req, res) => {
    console.log("IN DELETE MOVIE");

    Movie.deleteOne({ _id: req.params.id })
      .then((deleteMovie) => {
        res.json(deleteMovie);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Something went wrong in delete", error: err });
      });
  },
};
