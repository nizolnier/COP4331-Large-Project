const jwt = require("jsonwebtoken")

exports.generateToken = (username) => {
    const token = jwt.sign(
        {
            username
          },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
    )

    return token
}

exports.getTokenData = (token) => {
    const payload = jwt.verify(token, process.env.JWT_KEY);

    return payload
}