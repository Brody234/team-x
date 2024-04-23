const User = require("../models/user");

async function createUser(user) {
    try {
        return await User.create({
            name: user.name,
            email: user.email,
            events: [],
            emailNotifications: user.emailNotifications,
            tags: user.tags,
            hidden: user.hidden,
            clubs: [],
            clubsAdministrated: [],
            clubsOwned: [],
            pfp: user.pfp
        })
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createUser }