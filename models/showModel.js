import mongoose from "mongoose"

const showSchema = mongoose.Schema(
  {
    picture: { type: String, require: [false, "please add a picture url"] },
    title: { type: String, require: [false, "please add a title "] },
    genre: { type: Array, require: [false, "please add a genre "] },
    description: { type: String, require: [false, "please add a description "] },
    year: { type: Number, require: [false, "please add a year "] },
    director: { type: String, require: [false, "please add a director"] },
    nrating: { type: Number, require: [false, "please add ratings count"] },
    trating: { type: Number, require: [false, "please add a total ratings"] },
    avgrating: { type: Number, require: [false, "please add avg rating"] },
    nfavorites: { type: Number, require: [false, "please add number of fav"] }
  },
  { timestamps: true }
)

export default mongoose.model("Show", showSchema)