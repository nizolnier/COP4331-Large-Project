import UsersRoutes from "./routes/users.js"
import ShowsRoutes from "./routes/shows.js"
import ReviewsRoutes from "./routes/reviews.js"


const setApp = function (app) {
    const routeBases = {
        "users": "api/users",
        "shows": "api/shows",
        "reviews": "api/reviews"
    }

    UsersRoutes(app, routeBases.users)
    ShowsRoutes(app, routeBases.shows)
    ReviewsRoutes(app, routeBases.reviews)
}

export default setApp 