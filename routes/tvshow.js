const express = require("express");
// create an express router
const router = express.Router();

// import the Movie module
const TvShow = require("../models/tvshow");

const {
  getTvShows,
  getTvShow,
  addTvShow,
  updateTvShow,
  deleteTvShow,
} = require("../controllers/tvshow");

// tvshow routes
router.get("/", async (req, res) => {
  console.log(TvShow.find());
  const genre = req.query.genre;
  console.log(genre);
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  res.send(await getTvShows(genre, rating, premiere_year));
});

// GET /shows/:id - get a specific tvshow
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  res.send(await getTvShow(id));
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

    res
      .status(200)
      .send(
        await addTvShow(
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
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

    res
      .status(200)
      .send(
        await updateTvShow(
          id,
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// DELETE /movies/68941c79075fda221c909716 - delete movie
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteTvShow(id);

    res.status(200).send({
      message: `Tv show with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// export the router
module.exports = router;
