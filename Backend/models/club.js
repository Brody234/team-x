const mongoose = require('mongoose');
const Schema = mongoose.Schema

const clubSchema = new Schema({
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
    owner: {
        type: Schema.Types.ObjectId,
        require: true
    },
    members: {
        type: [Schema.Types.ObjectId],
        require: true,
        default: []
    },
    admins: {
        type: [Schema.Types.ObjectId],
        require: true,
        default: []
    },
})

module.exports = mongoose.model('club', clubSchema);