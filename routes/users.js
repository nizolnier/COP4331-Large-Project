import { validatedRequestObjectKeys } from "../utilities/requestUtilities.js"
import { generateToken, getTokenData } from "../utilities/jwtUtilities.js"
import User from "../models/userModel.js"
import Show from "../models/showModel.js"
import Verification from "../models/verificationModel.js"
import authMiddleware from "../middlewares/auth.js"
import dotenv from "dotenv"
import log from "../utilities/logUtilities.js"
import bcrypt from "bcryptjs"
import sendEmail from "../utilities/emailUtilities.js"
import mongoose from "mongoose"

dotenv.config()

export default (app, routeBase) => {
    app.post(`${routeBase}/signup`, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
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
            log(routeBase, req)
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
                    const token = generateToken(username, userExists._id.toString())

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

    app.get(`${routeBase}/one/:id`, authMiddleware, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
        }

        const expectedParamKeys = [
            "id"
        ]

        const missingParameterKeys = validatedRequestObjectKeys(req.params, expectedParamKeys)

        if (missingParameterKeys.length > 0) {
            res.status(422).send({
                error: `There are missing fields: (${missingParameterKeys.join(',')})`,
                found: false
            })
        } else {
            const {
                id
            } = req.params

            const userExists = await User.findOne({ _id: id })

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

    app.get(`${routeBase}/oneuser/:username`, authMiddleware, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
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

            const userExists = await User.findOne({ username })

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

    app.get(`${routeBase}/watchlist/:showid`, authMiddleware, async (req, res) => {

        log(routeBase, req)

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
            const tokenData = getTokenData(req.headers.authorization)

            const inWatchlist = await User.findOne({ _id: new mongoose.Types.ObjectId(tokenData.id), "watchlist.showid": new mongoose.Types.ObjectId(showid) })

            if (!inWatchlist) {
                res.status(404).send({
                    error: 'Not in watchlist',
                    found: false
                })
            } else {
                res.status(200).send({
                    found: true
                })
            }
        }
    })

    app.patch(`${routeBase}/watchlist/:showid`, authMiddleware, async (req, res) => {
        log(routeBase, req)

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
            const tokenData = getTokenData(req.headers.authorization)

            try {
                const show = await Show.findOne({ _id: new mongoose.Types.ObjectId(showid) })

                const user = await User.findOne({ _id: new mongoose.Types.ObjectId(tokenData.id) })

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

    app.delete(`${routeBase}/watchlist/:showid`, authMiddleware, async (req, res) => {
        log(routeBase, req)

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
            const tokenData = getTokenData(req.headers.authorization)

            try {
                const user = await User.findOne({ _id: new mongoose.Types.ObjectId(tokenData.id) })

                await user.updateOne({
                    "$pull": { watchlist: { showid: new mongoose.Types.ObjectId(showid) } }
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

    app.get(`${routeBase}/favcartoons/:showid`, authMiddleware, async (req, res) => {

        log(routeBase, req)

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
            const tokenData = getTokenData(req.headers.authorization)

            const inFavcartoons = await User.findOne({ _id: new mongoose.Types.ObjectId(tokenData.id), "favcartoons.showid": new mongoose.Types.ObjectId(showid) })

            if (!inFavcartoons) {
                res.status(404).send({
                    error: 'Not in favcartoons',
                    found: false
                })
            } else {
                res.status(200).send({
                    found: true
                })
            }
        }
    })

    app.patch(`${routeBase}/favcartoons/:showid`, authMiddleware, async (req, res) => {
        log(routeBase, req)

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
            const tokenData = getTokenData(req.headers.authorization)

            try {
                const show = await Show.findOne({ _id: new mongoose.Types.ObjectId(showid) })

                const user = await User.findOne({ _id: new mongoose.Types.ObjectId(tokenData.id) })

                const newShow = {
                    showid: show._id,
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


    app.delete(`${routeBase}/favcartoons/:showid`, authMiddleware, async (req, res) => {
        log(routeBase, req)

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
            const tokenData = getTokenData(req.headers.authorization)

            try {
                const user = await User.findOne({ _id: new mongoose.Types.ObjectId(tokenData.id) })

                await user.updateOne({
                    "$pull": { favcartoons: { showid: new mongoose.Types.ObjectId(showid) } }
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
    app.get(`${routeBase}/oneemail/:email`, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
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

            const userExists = await User.findOne({ email })

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
            log(routeBase, req)
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

            let code = Math.floor(10000 + Math.random() * 90000)
            const subject = "Between Shows - Confirm Your Email Address"
            const output = 'Your verification code is ' + code

            try {
                const newVerification = await Verification.create({
                    email, code,
                    createdAt: Date.now(),
                    expiredAt: Date.now() + 1800000,
                })

                sendEmail(email, subject, output)
                res.status(200).send({ message: "Code sent", verification: newVerification })
            }
            catch (e) {
                try {
                    await Verification.deleteMany({ email })
                }
                catch (e) {
                    res.status(400).send({
                        error: e.message,
                    })
                }


                res.status(400).send({
                    error: e.message,
                })
                console.log(e.message)
            }


        }

    })

    app.post(`${routeBase}/verify`, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
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
            const { email, code } = req.body
            try {
                const verificationExists = await Verification.findOne({ email });

                if (!verificationExists) {
                    res.status(404).send({
                        error: "User does not exist",
                    })
                    return
                }


                if (verificationExists.expiredAt < Date.now()) {

                    await verification.deleteMany({ email })
                    await User.findOneAndRemove({ email })
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

                    await Verification.deleteMany({ email })


                    res.status(200).send({
                        message: "Successfully verified",
                        verified: true,
                    })
                }
            } catch (e) {
                res.status(400).send({
                    error: e.message,
                })
                console.log(e.message)
            }
        }
    })


    app.post(`${routeBase}/password`, async (req, res) => {

        if (!process.env.PROD) {
            log(routeBase, req)
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
            const { password, email } = req.body
            try {
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

                res.status(200).send({
                    message: "Password changed",
                    updated: true,
                })


            } catch (e) {
                res.status(400).send({
                    error: e.message,
                })
                console.log(e.message)
            }

        }
    })

}