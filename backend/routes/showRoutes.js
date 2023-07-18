const express = require("express");
const router = express.Router();
const SearchShows = require('../controllers/searchShows')

const {
  GetShow,
  updateShow
  } = require('../controllers/showController');

  router.post("/GetShow", GetShow).post('/UpdateShow', updateShow)
  router.post("/search", SearchShows)

  module.exports = router;