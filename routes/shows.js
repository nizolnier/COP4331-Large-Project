import { validatedRequestObjectKeys } from "../utilities/requestUtilities.js"
import Show from "../models/showModel.js"
import authMiddleware from "../middlewares/auth.js"
import dotenv from "dotenv"
import log from "../utilities/logUtilities.js"
import mongoose from "mongoose"

dotenv.config()

export default (app, routeBase) => {
    app.patch(`${routeBase}/update`, authMiddleware, async (req, res) => {
        log(routeBase, req)

        const expectedBodyKeys = [
            "showid",
            "stars",
            "favorite"
        ]

        const missingBodyKeys = validatedRequestObjectKeys(req.body, expectedBodyKeys)

        if (missingBodyKeys > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const { showid, stars, favorite } = req.body

            try {
                const show = await Show.findOne({ _id: new mongoose.Types.ObjectId(showid) })

                const newR = show.nrating + 1
                const newF = show.nfavorites + favorite
                const newT = show.trating + stars
                const newA = newT / newR
                await show.updateOne({
                    nrating: newR,
                    nfavorites: newF,
                    trating: newT,
                    avgrating: newA,
                })

                res.status(200).send({ message: "Show updated", created: true })


            } catch (err) {
                res.status(400).send({
                    error: err.message,
                    created: false
                })
            }
        }
    })


    app.get(`${routeBase}/all`, authMiddleware, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
        }

        const shows = await Show.find()
        res.status(200).send(shows)
    })


    app.get(`${routeBase}/one/:id`, authMiddleware, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
        }

        const expectedParamKeys = [
            "id"
        ]

        const missingParameterKeys = validatedRequestObjectKeys(req.params, expectedParamKeys)

        if (missingParameterKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const {
                id
            } = req.params

            const showExists = await Show.findOne({ _id: new mongoose.Types.ObjectId(id) })

            if (!showExists) {
                res.status(404).send({
                    error: 'The show does not exist',
                    found: false
                })
            } else {
                res.status(200).send({
                    found: true,
                    showExists
                })
            }
        }

    })

    app.get(`${routeBase}/search`, authMiddleware, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
        }

        const expectedQueryKeys = [
            'input',
            'pageIndex'
        ]

        const missingQueryKeys = validatedRequestObjectKeys(req.query, expectedQueryKeys)

        if (missingQueryKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingQueryKeys.join(',')})`,
                found: false
            })
        } else {

            const {
                input,
                pageIndex // Assume that this, based on handling on the frontend, is not allowed to be lower than 1
            } = req.query

            const likeInputRegex = new RegExp(`.*${input}.*`, 'i')

            try {

                // Would do the cool way with mongo operators but genre lowkey annoying to do for regex
                const allShows = await Show.find()

                const similarShows = allShows.filter(show => {
                    return (
                        likeInputRegex.test(show.title) ||
                        likeInputRegex.test(show.genre.join()) ||
                        likeInputRegex.test(show.description) ||
                        likeInputRegex.test(show.year.toString()) ||
                        likeInputRegex.test(show.director)
                    )
                })

                // Using min and max for indexing safety
                const showsForPage = similarShows.slice(
                    Math.max(0, 10 * (pageIndex - 1)),
                    Math.min(similarShows.length, 10 * pageIndex)
                )

                res.status(201).send({
                    found: true,
                    shows: showsForPage
                })
            } catch (e) {
                res.status(400).send({
                    error: e.toString(),
                    found: false
                })
            }
        }

    })


}