const jwtUtilities = require("../utilities/jwtUtilities")

export default (req, res, next) => {
    if (!jwtUtilities.verifyAuthorizationRequest(req.headers)) {
        res.status(401).send({
            error: "Invalid authorization headers, invalid / non existing token data."
        })
    } else {
        next()
    }
}