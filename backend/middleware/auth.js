const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        res.json({
            error: "No TOKEN found in the header"
        })
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, authUser) => {
        if(error){
            res.json({
                error: "Received token, but it is not valid"
            })
            return;
        };


        req.body.authUser = authUser;

        next();
    })  
});

module.exports = { protect };