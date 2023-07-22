const express = require("express");
const router = express.Router();
const SearchCartoons = require('../controllers/searchCartoons')

const {
  GetShow,
  updateShow
  } = require('../controllers/showController');

  router.post("/GetShow", GetShow).post('/UpdateShow', updateShow)
  router.post("/search", SearchCartoons)

  module.exports = router;