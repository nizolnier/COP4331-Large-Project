const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, require: [true, "please add a username"], unique: true },
  name: { type: String, require: [true, "please add a name"] },
  email: { type: String, require: [true, "please add an email"]},
  password: { type: String, require: [true, "please add a password"] },
  userType: {type: Number, default: 1, require: [true, "please add a userType(1-regular, 2-admin)"]},
  favcartoons: {type : Array , default : [] },
  twatched: {type: Number, default: 0},
  watchlist: {type : Array , default : [] },
  verified: {type: Boolean, default : false},
}, {timestamps: true});


module.exports = mongoose.model("User", userSchema)
