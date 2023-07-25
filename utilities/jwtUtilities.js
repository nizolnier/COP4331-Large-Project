import jwt from "jsonwebtoken"

export const getTokenData = token => jwt.verify(token, process.env.JWT_SECRET)

export const generateToken = (username, id) => {
    const token = jwt.sign(
        { username, id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
    )

    return token
}

export const verifyAuthorizationRequest = (headers) => {
    if (!headers.authorization) {
        return false
    }

    const tokenData = getTokenData(headers.authorization)

    if (!tokenData) {
        return false
    }

    return true
}