const mongoose = require("mongoose")

const showSchema = mongoose.Schema(
  {
    picture: {type: String, require: [false, "please embedded a picture url"]},
    title: {type: String, require: [false, "please embedded a title "]},
    genre: {type: Array, require: [false, "please embedded a genre "]},
    description: {type: String, require: [false, "please embedded a description "]},
    year: {type: Number, require: [false, "please embedded a year "]},
    director: {type: String, require: [false, "please embedded a director"]},
    nratings: {type: Number, require: [false, "please embedded ratings count"]},
    tratings: {type: Number, require: [false, "please embedded a total ratings"]},
    avgratings: {type: Number, require: [false, "please embedded avg rating"]},
    nfavorites: {type: Number, require: [false, "please embedded number of fav"]}},
  { timestamps: true }
)

module.exports = mongoose.model("Show", showSchema)