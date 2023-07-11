const express = require("express");
const router = express.Router();

const {
  AddUser,
  updateUser,
  GetUser
  } = require('../controllers/userControllers');

  router.post("/AddUser", AddUser).post('/GetUser', GetUser).post('/forgotPassword', updateUser)

  module.exports = router;