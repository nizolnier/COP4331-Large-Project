const express = require("express");
const router = express.Router();

const {
  GetShow,
  updateShow,
  addShow,
  deleteShow,
} = require("../controllers/showController");

router
  .post("/getshow", GetShow)
  .post("/updateshow", updateShow)
  .post("/addshow", addShow)
  .post("/deleteshow", deleteShow);

module.exports = router;
