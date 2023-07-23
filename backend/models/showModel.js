const mongoose = require("mongoose");

const showSchema = mongoose.Schema(
  {
    showid: {type: Number, require: [true, "please provide a showID "], unique: true},
    picture: {type: String, require: [false, "please embedded a picture url"]},
    title: {type: String, require: [false, "please embedded a title "]},
    genre: {type: String, require: [false, "please embedded a genre "]},
    description: {type: String, require: [false, "please embedded a description "]},
    year: {type: Number, require: [false, "please embedded a year "]},
    director: {type: String, require: [false, "please embedded a director"]},
    nrating: {type: Number, require: [false, "please embedded ratings count"]},
    trating: {type: Number, require: [false, "please embedded a total ratings"]},
    avgrating: {type: Number, require: [false, "please embedded avg rating"]},
    nfavorites: {type: Number, require: [false, "please embedded number of fav"]}},
  { timestamps: true }
);

module.exports = mongoose.model("shows", showSchema);