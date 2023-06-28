const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("please provide all fields");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("user already exists");
    }
});

module.exports = { registerUser, loginUser, getMe };
