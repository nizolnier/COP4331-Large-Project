require('express');
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Show = require("../models/showModel");
const UsersRoutes = require("./routes/users")

exports.setApp = function (app, client) {
    const routeBases = {
        "users": "api/users"
    }

    UsersRoutes(app, routeBases.users)
}