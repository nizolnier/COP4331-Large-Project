import mongoose from "mongoose"
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
    {
        showid: { type: Schema.Types.ObjectId, required: [true, "[please add a showid"] },
        userid: { type: Schema.Types.ObjectId, required: [true, "[please add a userid"] },
        stars: { type: Number, required: [true, "[please add stars"] },
        favorite: { type: Number, default: 0 },
        comment: { type: String, default: "" },
        dateWatched: { type: Date, default: Date.now() },
    },
    { timestamps: true }
)

export default mongoose.model("Review", reviewSchema)