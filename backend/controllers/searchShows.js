const Show = require("../models/showModel");
const asyncHandler = require("express-async-handler");

const sampleSearchShows = require('../../frontend/src/tests/sample_shows.json')

const SearchShows = asyncHandler(async (req, res) => {
  const query = req.query.q;
  const page = req.query.page;
  const limit = req.query.limit;

  let pagesPerPage = limit;

  if (!limit) {
    pagesPerPage = 10;
  }

  const startIndex = (page - 1) * pagesPerPage;
  const endIndex = page * pagesPerPage;

  // const results = await Show.find({ title: query })
  const results = sampleSearchShows;

  let pageResults = null;
  const numPages = Math.ceil(results.length / pagesPerPage);

  if (results) {
   pageResults = results.slice(startIndex, endIndex)
    res.status(200).json({
        pages: numPages,
        page: page,
        total: numPages * pagesPerPage,
        tv_shows: pageResults
    });
  } else {
    res.status(400);
    throw new Error(
      "No results found."
    );
  }
});

module.exports = SearchShows;