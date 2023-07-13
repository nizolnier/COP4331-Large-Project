const mongoose = require("mongoose");

const showSchema = mongoose.Schema(
  {
    showid: {type: String, require: [true, "please provide a showID "], unique: true},
    picture: {type: String, require: [false, "please embedded a picture url"]},
    title: {type: String, require: [false, "please embedded a title "]},
    genre: {type: String, require: [false, "please embedded a genre "]},
    description: {type: String, require: [false, "please embedded a description "]},
    year: {type: Number, require: [false, "please embedded a year "]},
    director: {type: String, require: [false, "please embedded a director"]},
    num_of_ratings: {type: Number, require: [false, "please embedded ratings count"]},
    total_ratings: {type: Number, require: [false, "please embedded a total ratings"]},
    average_ratings: {type: Number, require: [false, "please embedded avg rating"]},
    num_of_favorites: {type: Number, require: [false, "please embedded number of fav"]}},
  { timestamps: true }
);

module.exports = mongoose.model("Show", showSchema);