const requestUtilities = require("../utilities/requestUtilities")
const jwtUtilities = require("../utilities/jwtUtilities")
const Review = require("../models/reviewModel")

export default (app, routeBase) => {
    app.post(`${routeBase}`, async (req, res, next) => {
        if (!jwtUtilities.verifyAuthorizationRequest(req.headers)) {
            res.status(401).send({
                error: "Invalid authorization headers, invalid / non existing token data."
            })
        } else {
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
                }
                catch (e) {
                    res.status(400).send({
                        error: e.toString(),
                        created: false
                    })
                }

                res.status(201).send({
                    message: "User created",
                    created: true
                })

            }
        }
    })

    app.get(`${routeBase}/show`, async (req, res, next) => {
        if (!jwtUtilities.verifyAuthorizationRequest(req.headers)) {
            res.status(401).send({
                error: "Invalid authorization headers, invalid / non existing token data."
            })
        } else {
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

        }
    })

    app.get(`${routeBase}/user`, async (req, res, next) => {
        if (!jwtUtilities.verifyAuthorizationRequest(req.headers)) {
            res.status(401).send({
                error: "Invalid authorization headers, invalid / non existing token data."
            })
        } else {
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

        }
    })


}