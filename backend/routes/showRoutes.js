const express = require("express");
const router = express.Router();
const SearchShows = require('../controllers/searchShows')

const {
  GetShow,
  updateShow
  } = require('../controllers/showController');

  router.post("/GetShow", GetShow).post('/UpdateShow', updateShow)
  router.get("/Search", SearchShows)

  module.exports = router;