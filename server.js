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
const TvShow = mongoose.model("TvShow", tvShowSchema);

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

// import all the routers
const movieRouter = require("./routes/movie");

app.use("/movies", movieRouter);

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
