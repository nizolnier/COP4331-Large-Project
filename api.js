require('express');
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Show = require("../models/showModel");

exports.setApp = function (app, client) {
    app.post('/api/signup', async (req, res, next) => {

        // "name" : "Zain",
        // 	"username" : "zainh",
        // 	"password" : "qwerty123"


        const { name, username, password, email } = req.body;

        if (!username || !password || !email) {
            res.status(422).json({
                error: "please provide all fields (username, password, email)",
            })
            return
        }

        const userExists = await User.findOne({ username })

        if (userExists) {
            res.status(400).json({ error: "user already exists" })
            return;
        }

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const newUser = { name: name, username: username, password: hashed, email: email, verified: false }

        try {
            await User.create(newUser)
        }
        catch (e) {
            let error = e.toString()

            res.status(400).json(error)
        }

        res.status(200).json({ message: "User created" })
    })

    app.post('/api/login', async (req, res, next) => {
        // "username" : "zainh",
        // "password" : "qwerty"
        const { username, password } = req.body;

        const userCur = await User.findOne({ username });

        if (!userCur) {
            res.status(400).json({
                error: "invalid credentials",
            });

            return;
        }

        if (!userCur.verified) {
            res.status(401).json({
                error: `${username} not verified, please check your email inbox and complete the verification process`,
            })
            return
        }


        if (await bcrypt.compare(password, userCur.password)) {
            const token = require("./utils/token.js")
            tk = token.generateToken(username)

            res.status(200).json({
                message: "successfully login for " + username,
                username: userCur.username,
                name: userCur.name,
                token: tk,
            })
        } else {
            res.status(400).json({ error: "invalid credentials" })
            return;
        }


    })




}