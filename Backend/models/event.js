const mongoose = require('mongoose');
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name:{
        type: String,
        required: true,
        default: "Unnamed Club"
    },
    tags: {
        type: [String],
        require: true,
        default: []
    },
    attendees: {
        type: [Schema.Types.ObjectId],
        require: true,
        default: []
    },
    clubPosting: {
        type: [Schema.Types.ObjectId],
        require: true,
        default: []
    },
    startTime: {
        type: Date,
        require: true,
        default: Date.now()
    },
    location: {
        type: String,
        require: true,
        default: "notanemail@gmail.com"
    },
    image: {
        type: String,
        require: true,
        default: "notalink.com"
    },
    description: {
        type: String,
        require: true,
        default: "This event is cool"
    }
})

module.exports = mongoose.model('event', eventSchema);