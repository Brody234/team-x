const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tagSchema = new Schema({
    tag: {
        type: String,
        require: true
    },
    clubs: {
        type: [Schema.Types.ObjectId],
        require: true,
        default: []
    },
    members: {
        type: [Schema.Types.ObjectId],
        require: true,
        default: []
    },
    events: {
        type: [Schema.Types.ObjectId],
        require: true,
        default: []
    },
})

module.exports = mongoose.model('Tag', tagSchema);