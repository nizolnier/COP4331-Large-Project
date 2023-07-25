import { verifyAuthorizationRequest } from "../utilities/jwtUtilities.js"

export default (req, res, next) => {
    if (!verifyAuthorizationRequest(req.headers)) {
        res.status(401).send({
            error: "Invalid authorization headers, invalid / non existing token data."
        })
    } else {
        next()
    }
}