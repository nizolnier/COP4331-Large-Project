const Show = require("../models/showModel");
const asyncHandler = require("express-async-handler");

const sampleCartoons = require('../../frontend/src/tests/sample_cartoons.json')

const SearchCartoons = asyncHandler(async (req, res) => {
  let query = req.query.q;
  let page = parseInt(req.query.page);
  let cartoonsPerPage = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * cartoonsPerPage;
  const endIndex = page * cartoonsPerPage;

  // const results = await Show.find({ title: query })
  const results = sampleCartoons;

  let pageResults = null;
  const numPages = Math.ceil(results.length / cartoonsPerPage);

  if (results) {
   pageResults = results.slice(startIndex, endIndex)
    res.status(200).json({
        pages: numPages,
        page: page,
        total: numPages * cartoonsPerPage,
        cartoons: pageResults
    });
  } else {
    res.status(400);
    throw new Error(
      "No results found."
    );
  }
});

module.exports = SearchCartoons;