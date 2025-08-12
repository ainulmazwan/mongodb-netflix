// import the Movie module
const TvShow = require("../models/tvshow");

async function getTvShows(genre, rating, premiere_year) {
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
  const tvshows = await TvShow.find(filter).sort({ _id: -1 });

  // return the movies
  return tvshows;
}

async function getTvShow(id) {
  // load movie data based on id
  const tvshow = await TvShow.findById(id);
  return tvshow;
}

async function addTvShow(
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) {
  // create new tvshow
  const newTvShow = new TvShow({
    title, // equal to title: title
    creator,
    premiere_year,
    end_year,
    seasons,
    genre,
    rating,
  });

  // save the new tvshow into mongodb
  await newTvShow.save(); // clicking the "save" button
  return newTvShow;
}

async function updateTvShow(
  id,
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) {
  // short hand
  return await TvShow.findByIdAndUpdate(
    id,
    {
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating,
    },
    {
      new: true, // return the updated data
    }
  );
}

async function deleteTvShow(id) {
  // delete the movie
  await TvShow.findByIdAndDelete(id);
}

module.exports = {
  getTvShows,
  getTvShow,
  addTvShow,
  updateTvShow,
  deleteTvShow,
};
