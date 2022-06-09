const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A Movie Title is Required!"],
      maxlength: [50, "Title Has 50 Character Max!"],
      unique: true,
    },
    genre: {
      type: String,
      required: [true, "A Movie Genre is Required!"],
      enum: [
        "Action",
        "Adventure",
        "Animation",
        "Biographical",
        "Comedy",
        "Crime",
        "Classical",
        "Documentary",
        "Drama",
        "Experimental",
        "Family",
        "Fantasy",
        "Film-Noir",
        "Foreign",
        "Horror",
        "Kung Fu",
        "Musical",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Silent Movie",
        "Sport",
        "Thriller",
        "War",
        "Western",
      ],
    },
    rating: {
      type: String,
      required: [true, "A Rating is Require!"],
      enum: ["G", "PG", "PG-13", "R", "NC-17"],
    },
    actors: {
      type: [String],
      default: "N/A",
    },
    boxArtUrl: {
      type: String,
      required: [
        true,
        "A Movie Picture is Required, Because We Love Pictures!",
      ],
    },
    watchLength: {
      type: Number,
      required: [true, "A Movie Length is Required!"],
    },
    releaseDate: {
      type: Number,
      required: [true, "A Release Date is Required!"],
      min: [1950, "1950 is The Oldest!"],
      max: [2012, "2012 is The Newest!"],
    },
    movieLink: {
      type: String,
      default: "N/A",
    },
    isOnNetflix: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
