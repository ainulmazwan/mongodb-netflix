const express = require("express");
// create an express router
const router = express.Router();

// import the Movie module
const TvShow = require("../models/tvshow");

// tvshow routes
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load movie data based on id
  const tvshow = await TvShow.findById(id);
  res.send(tvshow);
});

// export the router
module.exports = router;
