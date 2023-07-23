const User = require("../models/userModel")
const Show = require("../models/showModel")
const UsersRoutes = require("./routes/users")
const ShowsRoutes = require("./routes/shows")

exports.setApp = function (app, client) {
    const routeBases = {
        "users": "api/users",
        "shows": "api/shows"
    }

    UsersRoutes(app, routeBases.users)
    ShowsRoutes(app, routeBases.shows)
}