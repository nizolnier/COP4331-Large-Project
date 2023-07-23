const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  AddUser,
  updateUser,
  GetUser,
  UserVerify,
  sendVerification,
  forgotPassword,
  addFavorite,
  addWatchList,
  deleteFavorite,
  deleteWatchList,
} = require("../controllers/userControllers");

router
  .post("/signup", AddUser)
  .post("/login", GetUser)
  .post("/updateuser", updateUser)
  .post("/verifyemail", UserVerify)
  .post("/resendcode", sendVerification)
  .post("/forgot-password", forgotPassword)
  .post("/addfavorite", addFavorite)
  .post("/addwatchlist", addWatchList)
  .post("/deletefavoritelist", deleteFavorite)
  .post("/deletewatchlist", deleteWatchList);

module.exports = router;
