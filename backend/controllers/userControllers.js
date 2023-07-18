const User = require("../models/userModel");
const Show = require("../models/showModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const verification = require("../models/verificationModel");
const { json } = require("body-parser");

const deleteFavorite = asyncHandler(async (req, res) => {
  const { showid, username } = req.body;

  try {
    if (!username || !showid) {
      res.status(400).json({
        error: "please provide required fields",
        username: username,
        showid: showid,
      });
      return;
    }
    const userCur = await User.findOne({ username });

    if (!userCur) {
      res.status(400).json({
        error: "user with " + username + " not found",
      });

      return;
    }

    let curFavList = userCur.fav_cartoon;
    const index = await curFavList.indexOf(showid.toString());

    if (index < 0) {
      res.json({
        error: "selected item not found in the favorite_list",
        username: username,
        showid: showid,
      });

      return;
    }

    curFavList.splice(index, 1);

    const ifUpdated = await User.findOneAndUpdate(
      { username },
      {
        $set: {
          fav_cartoon: curFavList,
        },
      }
    );

    if (ifUpdated) {
      res.status(200).json({
        updated_status: true,
        update_field: "favorite_list",
        username: username,
        fav_cartoon: curFavList,
      });
    } else {
      res.json({
        error: `unable to update favorite_list for ${username} / Internal server error`,
        update_status: false,
      });

      return;
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

const deleteWatchList = asyncHandler(async (req, res) => {
  const { showid, username } = req.body;

  try {
    if (!username || !showid) {
      res.status(400).json({
        error: "please provide required fields",
        username: username,
        showid: showid,
      });
      return;
    }
    const userCur = await User.findOne({ username });

    if (!userCur) {
      res.status(400).json({
        error: "user with " + username + " not found",
      });

      return;
    }

    let curWatchList = userCur.watch_list;
    const index = curWatchList.indexOf(showid.toString());

    if (index < 0) {
      res.json({
        error: "selected item not found in the watch_list",
        username: username,
        showid: showid,
      });

      return;
    }

    curWatchList.splice(index, 1);

    const ifUpdated = await User.findOneAndUpdate(
      { username },
      {
        $set: {
          watch_list: curWatchList,
        },
      }
    );

    if (ifUpdated) {
      res.status(200).json({
        updated_status: true,
        update_field: "watch_list",
        username: username,
        watch_list: curWatchList,
      });
    } else {
      res.json({
        error: `unable to update watch_list for ${username} / Internal server error`,
        update_status: false,
      });

      return;
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

const addFavorite = asyncHandler(async (req, res) => {
  const { showid, username } = req.body;

  try {
    if (!username || !showid) {
      res.status(400).json({
        error: "please provide required fields",
        username: username,
        showid: showid,
      });
      return;
    }
    const userCur = await User.findOne({ username });

    if (!userCur) {
      res.status(400).json({
        error: "user with " + username + " not found",
      });

      return;
    }

    const ifUpdated = await userCur.updateOne({
      fav_cartoon: [...userCur.fav_cartoon, showid],
    });

    if (ifUpdated) {
      res.status(200).json({
        updated_status: true,
        update_field: "favorite_list",
        username: username,
        fav_cartoon: [...userCur.fav_cartoon, showid],
      });
    } else {
      res.json({
        error: `unable to update favorite_list for ${username}, internal server error`,
        update_status: false,
      });

      return;
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

const addWatchList = asyncHandler(async (req, res) => {
  const { showid, username } = req.body;

  try {
    if (!username || !showid) {
      res.status(400).json({
        error: "please provide required fields",
        username: username,
        showid: showid,
      });
      return;
    }
    const userCur = await User.findOne({ username });

    if (!userCur) {
      res.status(400).json({
        error: "user with " + username + " not found",
      });

      return;
    }

    const ifUpdated = await userCur.updateOne({
      watch_list: [...userCur.watch_list, showid],
    });

    if (ifUpdated) {
      res.status(200).json({
        updated_status: true,
        update_field: "watch_list",
        username: username,
        watch_list: [...userCur.watch_list, showid],
      });
    } else {
      res.json({
        error: `unable to update favorite_list for ${username}, internal server error`,
        update_status: false,
      });

      return;
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

const AddUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).json({
      Error: "please provide all fields (username, password, email)",
    });
    return;
  }

  //check if user exist
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400).json({ Error: "user already exists" });
    return;
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedpw = await bcrypt.hash(password, salt);

  //create user
  const newuser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedpw,
    userType: req.body.userType,
    fav_cartoon: req.body.fav_cartoon,
    watch_list: req.body.watch_list,
  });

  if (newuser) {
    sendVerification(req, res);
  } else {
    res
      .status(400)
      .json({ Error: "Error Creating User, server/database error" });
    return;
  }
});

const GetUser = asyncHandler(async (req, res) => {
  const { username, password, authUser } = req.body;

  if (!username || !password) {
    res.status(400).json({
      Error: "please provide required all fields (username, password)",
    });
    return;
  }

  const userCur = await User.findOne({ username });

  if (!userCur) {
    res.json({
      error: username + " not found / not exist",
    });

    return;
  }

  // if(authUser.username != username)     //bypass token checking, uncomment to make it work
  // {
  //   res.json({
  //     error: "Wrong token for user " + username + ", please double check"

  //   })

  //   return;
  // }

  if (!userCur.verified) {
    res.json({
      error: `${username} not verified, please check your email inbox and complete the verification process`,
    });
    return;
  }

  if (await bcrypt.compare(password, userCur.password)) {
    res.status(200).json({
      message: "successfully login for " + username,
      username: userCur.username,
      email: userCur.email,
      password: userCur.password,
      userType: userCur.userType,
      fav_cartoon: userCur.fav_cartoon,
      watch_list: userCur.watch_list,
      token: userCur.token,
    });
  } else {
    res.status(400).json({ Error: "invalid credentials/user not exist" });
    return;
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const code = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    if (!email) {
      res.json({
        Error: "Please provide email",
      });
      return;
    }

    const userCur = await User.findOne({ email });
    const verificationCur = await verification.findOne({ email });

    if (!userCur) {
      res.json({
        Error: "No user associated with email " + email,
      });
      return;
    }

    if (verificationCur.expiredAt > Date.now()) {
      res.json({
        error: "Code already sent, check your email inbox",
      });

      return;
    }

    await verification.deleteMany({ email });

    const newVerification = await verification.create({
      username: req.body.username,
      email: email,
      verificationCode: code,
      createdAt: Date.now(),
      expiredAt: Date.now() + 1800000,
    });

    if (!newVerification) {
      res.json({
        Error: "Internal Server Error failed to generate verification code",
        username: username,
        email: email,
      });

      return;
    }

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      auth: {
        user: process.env.AUTH_USERNAME,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_USERNAME,
      to: email,
      subject: "Forgot password for Large Project COP4331",
      html: `<p>Enter <b>${code}</b> in the app to complete your sign in if you <b>forgot</b> your password. This code expires in 30 minutes</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      sent: true,
      status: "verification code sent, waiting on user action",
      verification: code,
      data: {
        username: userCur.username,
        email: req.body.email,
        verified: userCur.verified,
        password: userCur.password,
      },
    });
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    res.status(400).json({ Error: "please provide required field (username)" });
    return;
  }

  const userCur = await User.findOne({ username });

  if (!userCur) {
    res.json({
      error: `could not find ${username} / not exist`,
      username: username,
    });

    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedpw = await bcrypt.hash(password, salt);

  const ifUpdated = await User.findOneAndUpdate(
    { username },
    {
      $set: {
        email: email ? email : userCur.email,
        password: password ? hashedpw : userCur.password,
      },
    }
  );

  if (ifUpdated) {
    res.json({
      update_status: true,
      username: username,
      email: email ? email : userCur.email,
      password: password ? hashedpw : userCur.password,
    });
  } else {
    res.json({
      error: "Unable to update database / Internal server error",
    });
  }
});

const sendVerification = asyncHandler(async (req, res) => {
  try {
    const { email, username } = req.body;
    const code = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    const userCur = await User.findOne({ username });

    if (userCur.verified) {
      res.json({
        error: `${username} has already been verified, no action needed at this time`,
      });

      return;
    }

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      auth: {
        user: process.env.AUTH_USERNAME,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_USERNAME,
      to: email,
      subject: "verify your email for Large Project COP4331",
      html: `<p>Enter <b>${code}</b> in the app to verify your email and complete <b>sign in</b>. This code expires in 30 minutes</p>`,
    };

    const newVerification = await verification.create({
      username: req.body.username,
      email: email,
      verificationCode: code,
      createdAt: Date.now(),
      expiredAt: Date.now() + 1800000,
    });

    if (!newVerification) {
      res.json({
        Error: "Internal Error failed to generate verification code",
        username: username,
        email: email,
      });

      return;
    }

    await transporter.sendMail(mailOptions);

    res.json({
      sent: true,
      status: "verification code sent, waiting on user to verify",
      verification: code,
      data: {
        username: req.body.username,
        email: req.body.email,
        verified: false,
      },
      token: userCur.token,
    });
  } catch (err) {
    res.json({
      sent: false,
      status: "failed to send verification code - " + err,
      data: {
        username: req.body.username,
        email: req.body.email,
      },
    });
  }
});

const UserVerify = asyncHandler(async (req, res) => {
  try {
    const { username, code } = req.body;

    if (!username || !code) {
      res.json({ error: "empty fields (username, code)" });
      return;
    }

    const verificationCur = await verification.findOne({ username });

    if (!verificationCur) {
      res.json({
        error: `${username} not exist / ${username} not require verification at this moment`,
      });
      return;
    }

    const expiredTime = verificationCur.expiredAt;
    const codeCur = verificationCur.code;

    if (expiredTime < Date.now()) {
      await verification.deleteMany({ username });
      await User.findOneAndRemove({ username });
      res.json({
        error: "code expire, please try again later",
        username: username,
      });
      return;
    }

    if (code != verificationCur.verificationCode) {
      res.json({
        error:
          "invalid verification code, please double check your email inbox",
        username: username,
      });

      return;
    } else {
      const usercur = await User.findOne({ username });

      await User.updateOne(
        { username: username },
        {
          $set: {
            verified: true,
            token: genereteToken(usercur),
          },
        }
      );
      await verification.deleteMany({ username });

      res.json({
        status: `${username} has been successfully verified`,
        verified: true,
      });
    }
  } catch (err) {
    res.json({
      status: "Failed",
      Error: err
        ? err
        : "unknown Error during verification process (database Error)",
    });
  }
});

const genereteToken = (user) => {
  return jwt.sign(user.toJSON(), process.env.JWT_SECRET);
};

module.exports = {
  AddUser,
  GetUser,
  updateUser,
  UserVerify,
  sendVerification,
  forgotPassword,
  addFavorite,
  addWatchList,
  deleteFavorite,
  deleteWatchList,
};
