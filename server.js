const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require('mongoose')
const path = require('path')

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

app.use(express.static('frontend/build'))

app.get('/search', require('./backend/controllers/searchShows'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
})

//listening on port
app.listen(PORT || 3000, () => {
    console.log('Server listening on port ' + (PORT || 3000));
})


//connect DB
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch(error){

        console.log(error)
        process.exit(1)
    }
}

// connectDB();

// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

app.use('', require('./backend/routes/userRoutes'))
app.use('/', require('./backend/routes/showRoutes'))