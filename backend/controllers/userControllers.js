const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const AddUser = asyncHandler(async (req, res) => {
  const { userid, username, password } = req.headers;

  if (!username || !password || !userid) {
    res
      .status(400)
      .json({
        Error: "please provide all fields (userid, username, password)",
      });
    return;
  }

  //create user
  const newuser = await User.create({
    userid: req.headers.userid,
    username: req.headers.username,
    email: req.headers.email,
    password: req.headers.password,
    userType: req.headers.userType,
    fav_cartoon: req.headers.fav_cartoon,
    watch_list: req.headers.watch_list,
  });

  if (newuser) {
    res.status(201).json({
      userid: req.headers.userid,
      username: newuser.username,
      email: newuser.email,
      password: newuser.password,
      userType: newuser.userType,
      fav_cartoon: newuser.fav_cartoon,
      watch_list: newuser.watch_list,
    });
  } else {
    res.status(400);
    throw new Error("Error Creating User, server/database error");
  }
});

const GetUser = asyncHandler(async (req, res) => {
  const { username, userid, password } = req.headers;

  if (!username || !userid || !password) {
    res.status(400);
    throw new Error(
      "please provide required all fields (username, userid, password)"
    );
  }

  const userCur = await User.findOne({ userid });

  if (
    userCur &&
    req.headers.password === userCur.password &&
    req.headers.username === userCur.username
  ) {
    res.status(200).json({
      message: "successfully login for " + username,
      userid: userCur.userid,
      username: userCur.username,
      email: userCur.email,
      password: userCur.password,
      userType: userCur.userType,
      fav_cartoon: userCur.fav_cartoon,
      watch_list: userCur.watch_list,
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials/user doesn't exist");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { username, userid } = req.headers;

  if (!username || !userid) {
    res.status(400);
    throw new Error("please provide required all fields (username, userid");
  }

  const userCur = await User.findOne({ userid });

  if (userCur && req.headers.username === userCur.username) {
    res.status(200).json({
      message: "successfully updated user" + userCur.username,
      userid: userCur.userid,
      username: userCur.username,
      email: req.headers.email ? req.headers.email : userCur.email,
      password: req.headers.password ? req.headers.password : userCur.password,
      userType: req.headers.userType ? req.headers.userType : userCur.userType,
      fav_cartoon: userCur.fav_cartoon,
      watch_list: userCur.watch_list,
    });
  }
  else
  {
    res.status(200).json({Error: "User doesn't exist (most likely), or database error"})
  }
});

module.exports = { AddUser, GetUser, updateUser };
