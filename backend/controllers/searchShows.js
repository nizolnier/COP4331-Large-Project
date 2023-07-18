const Show = require("../models/showModel");
const asyncHandler = require("express-async-handler");

const SearchShows = asyncHandler(async (req, res) => {
  const { query } = req.query.search;
  const { page } = req.query.page;
  const { limit } = req.query.limit;

  const results = await Show.find({ title: query })

  if (results) {
    res.status(200).json(results.map(showCur => {
        return {
            showid: showCur.showid,
            picture: showCur.picture,
            title: showCur.title,
            genre: showCur.genre,
            description: showCur.description,
            year: showCur.year,
            director: showCur.director,
            num_of_ratings: showCur.num_of_ratings,
            total_ratings: showCur.total_ratings,
            average_ratings: showCur.average_ratings,
            num_of_favorites: showCur.num_of_favorites,
        }
    }));
  } else {
    res.status(400);
    throw new Error(
      "No results found."
    );
  }
});

module.exports = SearchShows;