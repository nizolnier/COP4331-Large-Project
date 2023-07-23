const mongoose = require("mongoose");

const verificationSchema = mongoose.Schema({
  username: { type: String, require: [false, "please add a username"], unique: true },
  email: { type: String, require: [false, "please add an email"]},
  verificationCode: { type: String, require: false},
  createdAt: {type: Date, require: false},
  expiredAt: {type: Date, require: false}
}, {timestamps: true});


module.exports = mongoose.model("Verification", verificationSchema)