import { validatedRequestObjectKeys } from "../utilities/requestUtilities.js"
import { getTokenData } from "../utilities/jwtUtilities.js"
import Review from "../models/reviewModel.js"
import authMiddleware from "../middlewares/auth.js"
import log from "../utilities/logUtilities.js"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

export default (app, routeBase) => {
    app.post(`${routeBase}`, authMiddleware, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
        }

        const expectedBodyKeys = [
            "showid",
            "stars",
            "favorite",
            "comment",
            "dateWatched"
        ]

        const missingBodyKeys = validatedRequestObjectKeys(req.body, expectedBodyKeys)

        if (missingBodyKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingBodyKeys.join(',')})`,
                created: false
            })
        } else {
            const { showid, stars, favorite, comment, dateWatched } = req.body

            const tokenData = getTokenData(req.headers.authorization)

            const newReview = {
                showid: new mongoose.Types.ObjectId(showid),
                userid: new mongoose.Types.ObjectId(tokenData.id),
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


    app.get(`${routeBase}/show/:showid`, authMiddleware, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
        }

        const expectedParamKeys = [
            "showid"
        ]

        const missingParameterKeys = validatedRequestObjectKeys(req.params, expectedParamKeys)

        if (missingParameterKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const {
                showid
            } = req.params

            const reviewExists = await Review.findOne({ showid: new mongoose.Types.ObjectId(showid) })

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


    app.get(`${routeBase}/user/:userid`, authMiddleware, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
        }

        const expectedParamKeys = [
            "userid"
        ]

        const missingParameterKeys = validatedRequestObjectKeys(req.params, expectedParamKeys)

        if (missingParameterKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const {
                userid
            } = req.params

            const reviewExists = await Review.findOne({ userid: new mongoose.Types.ObjectId(userid) })

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


    app.get(`${routeBase}/all`, authMiddleware, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
        }

        const expectedParamKeys = [
            'sort',
            'limit'
        ]

        const missingParameterKeys = validatedRequestObjectKeys(req.query, expectedParamKeys)

        if (missingParameterKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const {
                sort,
                limit
            } = req.query

            const reviews = await Review.find()

            if (!reviews || reviews.length == 0) {
                res.status(404).send({
                    error: 'There are no reviews',
                    found: false
                })
            } else {
                if (reviews.length > limit) {
                    reviews = reviews.splice(0, limit)
                }

                const sortedReviews = reviews.sort((a, b) => {
                    if (sort == 'ascending') 
                        return a.dateWatched - b.dateWatched
                    else 
                        return b.dateWatched - a.dateWatched
                })

                res.status(200).send({
                    found: true,
                    reviews: sortedReviews
                })
            }
        }
    })


}