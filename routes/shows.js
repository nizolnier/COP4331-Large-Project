const requestUtilities = require("../utilities/requestUtilities")
const Show = require("../models/showModel")
const authMiddleware = require("../middlewares/auth")

export default (app, routeBase) => {


    app.get(`${routeBase}/all`, authMiddleware, async (req, res) => {
        const shows = await Show.find()
        res.status(200).send(shows)
    })


    app.get(`${routeBase}/one`, authMiddleware, async (req, res) => {

        const expectedParamKeys = [
            "id"
        ]

        const missingParameterKeys = requestUtilities.validatedRequestObjectKeys(req.params, expectedParamKeys)

        if (missingParameterKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const {
                id
            } = req.params

            const showExists = Show.findOne({ _id: mongoose.Types.ObjectId(id) })

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


}