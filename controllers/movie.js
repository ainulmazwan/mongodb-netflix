// import the Movie module
const Movie = require("../models/movie");

async function getMovies(genre, rating, director) {
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

  // return the movies
  return movies;
}

async function getMovie(id) {
  // load movie data based on id
  const movie = await Movie.findById(id);
  return movie;
}

async function addMovie(title, director, release_year, genre, rating) {
  // create new movie
  const newMovie = new Movie({
    title,
    director,
    release_year,
    genre,
    rating,
  });

  // save the new movie into mongodb
  await newMovie.save(); // clicking the "save" button
  return newMovie;
}

async function updateMovie(id, title, director, release_year, genre, rating) {
  // short hand
  return await Movie.findByIdAndUpdate(
    id,
    {
      title,
      director,
      release_year,
      genre,
      rating,
    },
    {
      new: true, // return the updated data
    }
  );
}

async function deleteMovie(id) {
  // delete the movie
  return await Movie.findByIdAndDelete(id);
}

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
