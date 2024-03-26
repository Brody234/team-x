const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        default: "Unnamed Club"
    },
    tags: {
        type: [Schema.Types.ObjectId],
        require: true,
        default: []
    },
    events: {
        type: [Schema.Types.ObjectId],
        require: true,
        default: []
    },
    clubs: {
        type: [Schema.Types.ObjectId],
        require: true,
        default: []
    },
    clubsOwned: {
        type: [Schema.Types.ObjectId],
        require: true,
        default: []
    },
    email: {
        type: String,
        require: true,
        default: "notanemail@gmail.com"
    },
    pfp: {
        type: String,
        require: true,
        default: "notalink.com"
    },
    clubsAdministrated: {
        type: [Schema.Types.ObjectId],
        require: true,
        default: []
    },
    emailNotifications: {
        type: Boolean,
        require: true,
        default: true
    },
    hidden: {
        type: Boolean,
        require: true,
        default: true
    },
})

module.exports = mongoose.model('user', userSchema);