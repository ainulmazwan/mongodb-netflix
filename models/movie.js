const {Schema, model} = require("mongoose");

// declare schema for movies
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Movie = model("Movie", movieSchema);

// export the Modal
module.exports = Movie;