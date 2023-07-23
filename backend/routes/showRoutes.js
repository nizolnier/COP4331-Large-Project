const express = require("express");
const router = express.Router();

const {
  GetShow,
  updateShow
  } = require('../controllers/showController');

  router.post("/getshow", GetShow).post('/updateshow', updateShow)

  module.exports = router;