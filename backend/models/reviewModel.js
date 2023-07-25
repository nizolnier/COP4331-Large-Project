const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    showid: {type: Number, require: [true, "please provide a showID "], unique: true},
    userid: {type: Number},
    stars: {type: Number, default: 0},
    comment: {type: String},
    created: {type: Date},
    favorite: {type: Boolean}
},
  { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewSchema);