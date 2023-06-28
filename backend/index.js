import express from "express"
import cors from "cors"

const app = express()
const connectDB = require('./DBConfig/DBConnect')
const port = process.env.PORT || 5000

app.use(cors())

app.listen(port, () => {
    console.log("Listening on backend")
})