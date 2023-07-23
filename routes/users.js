const requestUtilities = require("../utilities/requestUtilities")
const jwtUtilities = require("../utilities/jwtUtilities")

export default (app, routeBase) => {


    app.post(`${routeBase}/signup`, async (req, res, next) => {
        // "name" : "Zain",
        // 	"username" : "zainh",
        // 	"password" : "qwerty123"
        const expectedBodyKeys = [
            "name",
            "username",
            "email",
            "password"
        ]

        const missingBodyKeys = requestUtilities.validatedRequestObjectKeys(req.body, expectedBodyKeys)

        if (missingBodyKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingBodyKeys.join(',')})`,
                created: false
            })
        } else {

            const {
                name,
                username,
                email,
                password
            } = req.body

            const userExists = await User.findOne({ username })

            if (userExists) {
                res.status(409).send({
                    error: "The user already exists",
                    created: false
                })
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(password, salt)

                const newUser = {
                    name,
                    username,
                    email,
                    password: hashed,
                    verified: false
                }

                try {
                    await User.create(newUser)
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


    app.post(`${routeBase}/login`, async (req, res, next) => {
        // "username" : "zainh",
        // "password" : "qwerty"

        const expectedBodyKeys = [
            "username",
            "password"
        ]

        const missingBodyKeys = requestUtilities.validatedRequestObjectKeys(req.body, expectedBodyKeys)

        if (missingBodyKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingBodyKeys.join(',')})`,
                found: false
            })
        } else {
            const { username, password } = req.body
            const userExists = await User.findOne({ username })

            if (!userExists) {
                res.status(400).send({
                    error: "invalid credentials",
                    found: false
                })
            } else {
                if (!userExists.verified) {
                    res.status(401).send({
                        error: `${username} not verified, please check your email inbox and complete the verification process`,
                        verified: false
                    })
                    return
                }

                const passwordsMatch = await bcrypt.compare(password, userExists.password)

                if (passwordsMatch) {
                    token = jwtUtilities.generateToken(username)
    
                    res.status(200).send({
                        message: "successfully login for " + username,
                        username,
                        token,
                        name: userExists.name
                    })
                } else {
                    res.status(400).send({
                        error: "invalid credentials"
                    })
                    return
                }
            }
        }
    })


    app.get(`${routeBase}/username`, async (req, res, next) => {
        if (!jwtUtilities.verifyAuthorizationRequest(req.headers)) {
            res.status(401).send({
                error: "Invalid authorization headers, invalid / non existing token data."
            })
        } else {
            const expectedParamKeys = [
                "username"
            ]

            const missingParameterKeys = requestUtilities.validatedRequestObjectKeys(req.params, expectedParamKeys)

            if (missingParameterKeys.length > 0) {
                res.status(422).send({
                    error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                    found: false
                })
            } else {
                const {
                    username
                } = req.params

                const userExists = User.findOne({ username })

                if (!userExists) {
                    res.status(404).send({
                        error: 'The user does not exist',
                        found: false
                    })
                } else {
                    res.status(200).send({
                        found: true,
                        username: userExists.username,
                        name: userExists.name,
                        favcartoons: userExists.favcartoons,
                        watchlist: userExists.watchlist,
                        twatched: userExists.twatched
                    })
                }
            }
        }
    })


    app.get(`${routeBase}/email`, async (req, res, next) => {
        const expectedParamKeys = [
            "email"
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

            const userExists = User.findOne({ email })

            if (!userExists) {
                res.status(404).send({
                    error: 'The user does not exist',
                    found: false
                })
            } else {
                res.status(200).send({
                    found: true
                })
            }
        }
    
    })


}