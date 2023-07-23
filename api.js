const UsersRoutes = require("./routes/users")
const ShowsRoutes = require("./routes/shows")
const ReviewsRoutes = require("./routes/reviews")


exports.setApp = function (app, client) {
    const routeBases = {
        "users": "api/users",
        "shows": "api/shows",
        "reviews": "api/reviews"
    }

    UsersRoutes(app, routeBases.users)
    ShowsRoutes(app, routeBases.shows)
    ReviewsRoutes(app, routeBases.reviews)
}