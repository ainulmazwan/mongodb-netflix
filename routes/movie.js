const express = require("express");
// create an express router
const router = express.Router();

// import the Movie module
const Movie = require("../models/movie");

/* 
  routes for movies
  GET /movies - list all the movies
  GET /movies/68941c79075fda221c909716 - get a specific movie
  POST /movies - add new movie
  PUT /movies/68941c79075fda221c909716 - update movie
  DELETE /movies/68941c79075fda221c909716 - delete movie
*/

// GET /movies - list all the movies
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load movie data based on id
  const movie = await Movie.findById(id);
  res.send(movie);
});

// export the router
module.exports = router;
