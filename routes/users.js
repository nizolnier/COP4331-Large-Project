import { validatedRequestObjectKeys } from "../utilities/requestUtilities.js"
import { generateToken, getTokenData } from "../utilities/jwtUtilities.js"
import User from "../models/userModel.js"
import Show from "../models/showModel.js"
import Verification from "../models/verificationModel.js"
import authMiddleware from "../middlewares/auth.js"
import dotenv from "dotenv"

dotenv.config()

export default (app, routeBase) => {
    app.post(`${routeBase}/signup`, async (req, res) => {

        if (!process.env.PROD) {
            logUtilities.log(routeBase, req)
        }

        const expectedBodyKeys = [
            "name",
            "username",
            "email",
            "password"
        ]

        const missingBodyKeys = validatedRequestObjectKeys(req.body, expectedBodyKeys)

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


    app.post(`${routeBase}/login`, async (req, res) => {

        if (!process.env.PROD) {
            logUtilities.log(routeBase, req)
        }

        const expectedBodyKeys = [
            "username",
            "password"
        ]

        const missingBodyKeys = validatedRequestObjectKeys(req.body, expectedBodyKeys)

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
                    token = generateToken(username, userExists._id.toString())

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


    app.get(`${routeBase}/oneuser`, authMiddleware, async (req, res) => {

        if (!process.env.PROD) {
            logUtilities.log(routeBase, req)
        }

        const expectedParamKeys = [
            "username"
        ]

        const missingParameterKeys = validatedRequestObjectKeys(req.params, expectedParamKeys)

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
    })

    app.patch(`${routeBase}/watchlist`, authMiddleware, async (req, res) => {
        logUtilities.log(routeBase, req)

        const expectedParamKeys = [
            "showid"
        ]

        const missingParameterKeys = validatedRequestObjectKeys(req.params, expectedParamKeys)

        if (missingParameterKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const { showid } = req.params
            const tokenData = getTokenData(req.header.auth)

            try {
                const show = await Show.findOne({ _id: mongoose.Types.ObjectId(showid) })

                const user = await User.findOne({ _id: mongoose.Types.ObjectId(tokenData.id) })

                const newShow = {
                    showid: show._id,
                    title: show.title,
                    picture: show.picture
                }

                await user.updateOne({
                    watchlist: [...user.watchlist, newShow],
                })

                res.status(200).send({ message: "Watchlist updated", created: true })


            } catch (err) {
                res.status(400).send({
                    error: err.message,
                    created: false
                })
            }
        }
    })

    app.delete(`${routeBase}/watchlist`, authMiddleware, async (req, res) => {
        logUtilities.log(routeBase, req)

        const expectedParamKeys = [
            "showid"
        ]

        const missingParameterKeys = validatedRequestObjectKeys(req.params, expectedParamKeys)

        if (missingParameterKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const { showid } = req.params
            const tokenData = getTokenData(req.header.auth)

            try {
                const user = await User.findOne({ _id: mongoose.Types.ObjectId(tokenData.id) })

                await user.update({
                    "$pull": { watchlist: { showid } }
                })

                res.status(200).send({ message: "Watchlist updated", created: true })


            } catch (err) {
                res.status(400).send({
                    error: err.message,
                    created: false
                })
            }
        }
    })

    app.patch(`${routeBase}/favcartoons`, authMiddleware, async (req, res) => {
        logUtilities.log(routeBase, req)

        const expectedParamKeys = [
            "showid"
        ]

        const missingParameterKeys = validatedRequestObjectKeys(req.params, expectedParamKeys)

        if (missingParameterKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const { showid } = req.params
            const tokenData = getTokenData(req.header.auth)

            try {
                const show = await Show.findOne({ _id: mongoose.Types.ObjectId(showid) })

                const user = await User.findOne({ _id: mongoose.Types.ObjectId(tokenData.id) })

                const newShow = {
                    _id: show._id,
                    title: show.title,
                    picture: show.picture
                }

                await user.updateOne({
                    favcartoons: [...user.favcartoons, newShow],
                })

                res.status(200).send({ message: "Favcartoons updated", created: true })


            } catch (err) {
                res.status(400).send({
                    error: err.message,
                    created: false
                })
            }
        }
    })


    app.delete(`${routeBase}/favcartoons`, authMiddleware, async (req, res) => {
        logUtilities.log(routeBase, req)

        const expectedParamKeys = [
            "showid"
        ]

        const missingParameterKeys = validatedRequestObjectKeys(req.params, expectedParamKeys)

        if (missingParameterKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const { showid } = req.params
            const tokenData = getTokenData(req.header.auth)

            try {
                const user = await User.findOne({ _id: mongoose.Types.ObjectId(tokenData.id) })

                await user.update({
                    "$pull": { favcartoons: { showid } }
                })

                res.status(200).send({ message: "Favcartoons updated", created: true })


            } catch (err) {
                res.status(400).send({
                    error: err.message,
                    created: false
                })
            }
        }

    })

    // password things =========
    app.get(`${routeBase}/oneemail`, async (req, res) => {

        if (!process.env.PROD) {
            logUtilities.log(routeBase, req)
        }

        const expectedParamKeys = [
            "email"
        ]

        const missingParameterKeys = validatedRequestObjectKeys(req.params, expectedParamKeys)

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

    app.post(`${routeBase}/send-email`, async (req, res) => {

        if (!process.env.PROD) {
            logUtilities.log(routeBase, req)
        }

        const expectedBodyKeys = [
            "email",
        ]

        const missingBodyKeys = validatedRequestObjectKeys(req.body, expectedBodyKeys)

        if (missingBodyKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingBodyKeys.join(',')})`,
                created: false
            })
        } else {

            const { email } = req.body;

            let code = code = Math.floor(100000 + Math.random() * 900000)
            const subject = "Between Shows - Confirm Your Email Address"
            const output = 'Your verification code is ' + code

            const newVerification = await Verification.create({
                email, code,
                createdAt: Date.now(),
                expiredAt: Date.now() + 1800000,
            })

            try {
                sendEmail(email, subject, output)
            }
            catch (e) {
                res.status(400).send({
                    error: e.message,
                })

            }

            res.status(200).send({ message: "Code sent", verification: newVerification })

        }

    })

    app.post(`${routeBase}/verify`, async (req, res) => {

        if (!process.env.PROD) {
            logUtilities.log(routeBase, req)
        }

        const expectedBodyKeys = [
            "email",
            "code"
        ]

        const missingBodyKeys = validatedRequestObjectKeys(req.body, expectedBodyKeys)

        if (missingBodyKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingBodyKeys.join(',')})`,
                created: false
            })
        } else {
            const { email } = req.body
            const verificationExists = await Verification.findOne({ email });

            if (!verificationExists) {
                res.status(404).send({
                    error: "User does not exist",
                })
                return
            }


            if (verificationExists.expiredAt < Date.now()) {
                await verification.deleteMany({ email });
                await User.findOneAndRemove({ email });
                res.status(400).send({
                    error: "Code expired, please try again later",
                })
            }

            if (code != verificationExists.code) {
                res.status(401).send({
                    error:
                        "Invalid verification code",
                    email: email,
                })

            } else {
                await User.updateOne(
                    { email: email },
                    {
                        $set: {
                            verified: true,
                        },
                    }
                )
                await Verification.deleteMany({ email });

                res.status(200).send({
                    message: "Successfully verified",
                    verified: true,
                })
            }
        }
    })


    app.post(`${routeBase}/password`, async (req, res) => {

        if (!process.env.PROD) {
            logUtilities.log(routeBase, req)
        }

        const expectedBodyKeys = [
            "email",
            "password"
        ]

        const missingBodyKeys = validatedRequestObjectKeys(req.body, expectedBodyKeys)

        if (missingBodyKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingBodyKeys.join(',')})`,
                created: false
            })
        } else {
            const { password } = req.body
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)

            await User.updateOne(
                { email: email },
                {
                    $set: {
                        password: hashed,
                    },
                }
            )

        }
    })

}