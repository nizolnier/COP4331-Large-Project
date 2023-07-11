const express = require("express");
const router = express.Router();

const {
  GetShow,
  updateShow
  } = require('../controllers/showController');

  router.post("/GetShow", GetShow).post('/UpdateShow', updateShow)

  module.exports = router;