const express = require("express");
// create an express router
const router = express.Router();

// import the Movie module
const TvShow = require("../models/tvshow");
const req = require("express/lib/request");

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

// add new tvshow
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (!title || !creator || !premiere_year || !seasons || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    // create new movie
    const newTvShow = new TvShow({
      title: title,
      creator: creator,
      premiere_year: premiere_year,
      end_year: end_year,
      seasons: seasons,
      genre: genre,
      rating: rating,
    });

    // save the new tvshow into mongodb
    await newTvShow.save(); // clicking the "save" button

    res.status(200).send(newTvShow);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// PUT /shows/68941c79075fda221c909716 - update tvshow
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the movie
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (!title || !creator || !premiere_year || !seasons || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    const updatedTvShow = await TvShow.findByIdAndUpdate(
      id,
      {
        title: title,
        creator: creator,
        premiere_year: premiere_year,
        end_year: end_year,
        seasons: seasons,
        genre: genre,
        rating: rating,
      },
      {
        new: true, // return the updated data
      }
    );

    res.status(200).send(updatedTvShow);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// DELETE /movies/68941c79075fda221c909716 - delete movie
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // delete the movie
    await TvShow.findByIdAndDelete(id);
    res.status(200).send({
      message: `Movie with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// export the router
module.exports = router;
