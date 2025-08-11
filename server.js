const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// setup an express app
const app = express();

// connect to mongodb using Mongoose
async function connectToMongoDB() {
  try {
    // wait for the MongoDB to connect
    await mongoose.connect("mongodb://localhost:27017/netflix");
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(error);
  }
}

// trigger the connection with MongoDB
connectToMongoDB();

// declare schema for movies
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  release_year: Number,
  genre: String,
  rating: Number,
});

// declare schema for tvshows
const tvShowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  premiere_year: {
    type: Number,
    required: true,
  },
  end_year: Number,
  seasons: {
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

// create a Modal from the schema
const Movie = mongoose.model("Movie", movieSchema);
const TvShow = mongoose.model("TvShow", tvShowSchema);

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

/* 
  routes for movies
  GET /movies - list all the movies
  GET /movies/68941c79075fda221c909716 - get a specific movie
  POST /movies - add new movie
  PUT /movies/68941c79075fda221c909716 - update movie
  DELETE /movies/68941c79075fda221c909716 - delete movie
*/

// GET /movies - list all the movies
app.get("/movies", async (req, res) => {
  const director = req.query.director;
  const genre = req.query.genre;
  const rating = req.query.rating;

  // create an empty container for filter
  let filter = {};
  // if director exists, then only add it to the filter container
  if (director) {
    filter.director = director;
  }
  // if genre exists, then only add it to the filter container
  if (genre) {
    filter.genre = genre;
  }
  // if rating exists, then only add it to the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }

  // load the movies data from Mongodb
  const movies = await Movie.find(filter);
  res.send(movies);
});

// GET /movies/:id - get a specific movie
app.get("/movies/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load movie data based on id
  const movie = await Movie.findById(id);
  res.send(movie);
});

// tvshow routes
app.get("/shows", async (req, res) => {
  console.log(TvShow.find());
  const genre = req.query.genre;
  console.log(genre);
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  // create an empty container for filter
  let filter = {};
  // if genre exists, then only add it to the filter container
  if (genre) {
    filter.genre = genre;
  }
  // if rating exists, then only add it to the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }
  // if premiere year exists, then only add it to the filter container
  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }

  // load the tvshows data from Mongodb
  const tvshows = await TvShow.find(filter);
  res.send(tvshows);
});

// GET /shows/:id - get a specific tvshow
app.get("/shows/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load movie data based on id
  const tvshow = await TvShow.findById(id);
  res.send(tvshow);
});

// start the express server
app.listen(5123, () => {
  console.log("server is running at http://localhost:5123");
});
