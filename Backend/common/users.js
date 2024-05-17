const User = require("../models/user");

async function createUser(user) {
    try {
        return await User.create({
            name: user.name,
            email: user.email,
            events: [],
            emailNotifications: user.emailNotifications,
            tags: [],
            hidden: user.hidden,
            clubs: [],
            clubsAdministrated: [],
            clubsOwned: [],
            pfp: user.pfp | ""
        })
    }
    catch (error) {
        console.log("error in createUser:");
        throw new Error(error.message);
    }
}

module.exports = { createUser }