const requestUtilities = require("../utilities/requestUtilities")
const jwtUtilities = require("../utilities/jwtUtilities")
const Review = require("../models/reviewModel")
const authMiddleware = require("../middlewares/auth")
const logUtilities = require("../utilities/logUtilities")
const dotenv = require("dotenv")

dotenv.config()

export default (app, routeBase) => {
    app.post(`${routeBase}`, authMiddleware, async (req, res) => {
        
        if (!process.env.PROD) {
            logUtilities.log(routeBase, req)
        }
        
        const expectedBodyKeys = [
            "showid",
            "stars",
            "favorite",
            "comment",
            "dateWatched"
        ]

        const missingBodyKeys = requestUtilities.validatedRequestObjectKeys(req.body, expectedBodyKeys)

        if (missingBodyKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingBodyKeys.join(',')})`,
                created: false
            })
        } else {
            const { showid, stars, favorite, comment, dateWatched } = req.body

            const tokenData = jwtUtilities.getTokenData(req.header.auth)

            const newReview = {
                showid: mongoose.Types.ObjectId(showid),
                userid: mongoose.Types.ObjectId(tokenData.id),
                stars,
                favorite,
                comment,
                dateWatched
            }

            try {
                await Review.create(newReview)

                res.status(201).send({
                    message: "User created",
                    created: true
                })
            }
            catch (e) {
                res.status(400).send({
                    error: e.toString(),
                    created: false
                })
            }

        }
    })


    app.get(`${routeBase}/show`, authMiddleware, async (req, res) => {

        if (!process.env.PROD) {
            logUtilities.log(routeBase, req)
        }

        const expectedParamKeys = [
            "showid"
        ]

        const missingParameterKeys = requestUtilities.validatedRequestObjectKeys(req.params, expectedParamKeys)

        if (missingParameterKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const {
                showid
            } = req.params

            const reviewExists = Review.findOne({ showid: mongoose.Types.ObjectId(showid) })

            if (!reviewExists) {
                res.status(404).send({
                    error: 'The review does not exist',
                    found: false
                })
            } else {
                res.status(200).send({
                    found: true,
                    reviewExists
                })
            }
        }
    })


    app.get(`${routeBase}/user`, authMiddleware, async (req, res) => {

        if (!process.env.PROD) {
            logUtilities.log(routeBase, req)
        }

        const expectedParamKeys = [
            "userid"
        ]

        const missingParameterKeys = requestUtilities.validatedRequestObjectKeys(req.params, expectedParamKeys)

        if (missingParameterKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const {
                userid
            } = req.params

            const reviewExists = Review.findOne({ userid: mongoose.Types.ObjectId(userid) })

            if (!reviewExists) {
                res.status(404).send({
                    error: 'The review does not exist',
                    found: false
                })
            } else {
                res.status(200).send({
                    found: true,
                    reviewExists
                })
            }
        }
    })


}