const mongoose = require("mongoose")

const showSchema = mongoose.Schema(
  {
    picture: { type: String, require: [false, "please add a picture url"] },
    title: { type: String, require: [false, "please add a title "] },
    genre: { type: Array, require: [false, "please add a genre "] },
    description: { type: String, require: [false, "please add a description "] },
    year: { type: Number, require: [false, "please add a year "] },
    director: { type: String, require: [false, "please add a director"] },
    nratings: { type: Number, require: [false, "please add ratings count"] },
    tratings: { type: Number, require: [false, "please add a total ratings"] },
    avgratings: { type: Number, require: [false, "please add avg rating"] },
    nfavorites: { type: Number, require: [false, "please add number of fav"] }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Show", showSchema)