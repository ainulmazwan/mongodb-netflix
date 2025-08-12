const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// setup an express app
const app = express();

// setup a middleware to handle JSON request
app.use(express.json());

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

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

// import all the routers
const movieRouter = require("./routes/movie");
const tvshowRouter = require("./routes/tvshow");

app.use("/movies", movieRouter);
app.use("/shows", tvshowRouter);

// start the express server
app.listen(5123, () => {
  console.log("server is running at http://localhost:5123");
});
