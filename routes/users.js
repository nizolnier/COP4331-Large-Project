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

        const missingBodyKeys = requestUtilities.validatedRequestBody(req.body, expectedBodyKeys)

        if (missingBodyKeys.length > 0) {
            res.status(422).send({
                error: `Please provide all fields (${missingBodyKeys.join(',')})`,
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

        const missingBodyKeys = requestUtilities.validatedRequestBody(req.body, expectedBodyKeys)

        if (missingBodyKeys.length > 0) {
            res.status(422).send({
                error: `Please provide all fields (${missingBodyKeys.join(',')})`,
                created: false
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

}