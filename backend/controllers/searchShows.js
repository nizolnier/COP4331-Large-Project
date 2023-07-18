const Show = require("../models/showModel");
const asyncHandler = require("express-async-handler");

const SearchShows = asyncHandler(async (req, res) => {
  const { query } = req.query.search;
  const { page } = req.query.page;
  const { limit } = req.query.limit;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = await Show.find({ title: query })
  let pageResults = null;

  if (results) {
   pageResults = results.slice(startIndex, endIndex)
    res.status(200).json(pageResults);
  } else {
    res.status(400);
    throw new Error(
      "No results found."
    );
  }
});

module.exports = SearchShows;