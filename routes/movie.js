const express = require("express");
// create an express router
const router = express.Router();

// import the Movie module
const Movie = require("../models/movie");
const req = require("express/lib/request");

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
  const movies = await Movie.find(filter).sort({ _id: -1 });
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

/* 
  POST /movies - add new movie
  this POST route needs to accept the following parameters:
  - title
  - director
  - release_year
  - genre
  - rating
*/
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (!title || !director || !release_year || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    // create new movie
    const newMovie = new Movie({
      title: title,
      director: director,
      release_year: release_year,
      genre: genre,
      rating: rating,
    });

    // save the new movie into mongodb
    await newMovie.save(); // clicking the "save" button

    res.status(200).send(newMovie);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// PUT /movies/68941c79075fda221c909716 - update movie
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the movie
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (!title || !director || !release_year || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        title: title,
        director: director,
        release_year: release_year,
        genre: genre,
        rating: rating,
      },
      {
        new: true, // return the updated data
      }
    );

    res.status(200).send(updatedMovie);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// DELETE /movies/68941c79075fda221c909716 - delete movie
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // delete the movie
    await Movie.findByIdAndDelete(id);
    res.status(200).send({
      message: `Movie with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// export the router
module.exports = router;
