const requestUtilities = require("../utilities/requestUtilities")
const Show = require("../models/showModel")

export default (app, routeBase) => {
    app.get(`${routeBase}`, async (req, res, next) => {
        if (!jwtUtilities.verifyAuthorizationRequest(req.headers)) {
            res.status(401).send({
                error: "Invalid authorization headers, invalid / non existing token data."
            })
        } else {
            res.status(200).send(shows)
        }

    })

    app.get(`${routeBase}/id`, async (req, res, next) => {
        if (!jwtUtilities.verifyAuthorizationRequest(req.headers)) {
            res.status(401).send({
                error: "Invalid authorization headers, invalid / non existing token data."
            })
        } else {
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
                    email
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
        }

    })



}