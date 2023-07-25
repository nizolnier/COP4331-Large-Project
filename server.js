import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import setApp from './api.js'

dotenv.config()

const PORT = process.env.PORT
const URL = process.env.MONGODB_URI

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    )
    next();
})

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {

        console.log(error)
        process.exit(1)
    }
}

connectDB()

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, 'frontend/build')))

    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
    })
}

//listening on port
app.listen(PORT, () => {
    console.log('Server listening on port ' + (PORT));
})


setApp(app)
