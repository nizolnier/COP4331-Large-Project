const express = require("express");
const router = express.Router();

const {
  GetReview,
  updateReview,
  deleteReview,
  addReview,
} = require("../controllers/reviewController");

router
  .post("/getreview", GetReview)
  .post("/updatereview", updateReview)
  .post("/deletereview", deleteReview)
  .post("/addreview", addReview);

module.exports = router;
