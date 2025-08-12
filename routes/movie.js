const express = require("express");
// create an express router
const router = express.Router();

const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie");

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
  const movies = await getMovies(genre, rating, director); // function from controller
  res.status(200).send(movies);
});

// GET /movies/:id - get a specific movie
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  const movie = await getMovie(id); // function from controller
  res.status(200).send(movie);
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

// add movie
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

    res
      .status(200)
      // short hand
      .send(await addMovie(title, director, release_year, genre, rating));
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
    res
      .status(200)
      .send(
        await updateMovie(id, title, director, release_year, genre, rating)
      );
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// DELETE /movies/68941c79075fda221c909716 - delete movie
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteMovie(id);
    
    res.status(200).send({
      message: `Movie with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// export the router
module.exports = router;
