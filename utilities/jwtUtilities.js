const jwt = require("jsonwebtoken")


const getTokenData = token => jwt.verify(token, process.env.JWT_KEY)

export const generateToken = (username, id) => {
    const token = jwt.sign(
        { username, id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
    )

    return token
}

export const verifyAuthorizationRequest = (headers) => {
    if (!headers.auth) {
        return false
    }

    const tokenData = getTokenData(headers.auth)

    if (!tokenData) {
        return false
    }

    return true
}