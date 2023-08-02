import mongoose from "mongoose"

const verificationSchema = mongoose.Schema({
  email: { type: String, require: [false, "please add an email"]},
  code: { type: String, require: false},
  createdAt: {type: Date, require: false},
  expiredAt: {type: Date, require: false}
}, {timestamps: true});


export default mongoose.model("Verification", verificationSchema)