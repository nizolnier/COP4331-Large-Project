const express = require("express");
const router = express.Router();

const {
  GetReview,
  updateReview
  } = require('../controllers/reviewController');

  router.post("/getreview", GetReview).post('/updatereview', updateReview)

  module.exports = router;