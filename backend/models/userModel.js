const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  //userid: {type: String, require: [true, "please provide a userId"], unique: true},
  username: { type: String, require: [true, "please add a username"], unique: true },
  email: { type: String, require: [true, "please add an email"]},
  password: { type: String, require: [true, "please add a password"] },
  userType: {type: Number, default: 1, require: [true, "please add a userType(1-regular, 2-admin)"]},
  fav_cartoon: {type : Array , default : [] },
  watch_list: {type : Array , default : [] },
  verified: {type: Boolean, default : false}
}, {timestamps: true});


module.exports = mongoose.model("User", userSchema)