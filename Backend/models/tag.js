const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for the "tag" collection
const tagSchema = new Schema({
    tag: {
        type: String, // Data type of 'tag' is string
        require: true // 'tag' field is required
    },
    clubs: {
        type: [Schema.Types.ObjectId], // 'clubs' is an array of ObjectIds, refers to club documents
        require: true, // 'clubs' field is required
        default: [] // Default value for 'clubs' is an empty array
    },
    members: {
        type: [Schema.Types.ObjectId], // 'members' is an array of ObjectIds, refers to user documents
        require: true, // 'members' field is required
        default: [] // Default value for 'members' is an empty array
    },
    events: {
        type: [Schema.Types.ObjectId], // 'events' is an array of ObjectIds, refers to event documents
        require: true, // 'events' field is required
        default: [] // Default value for 'events' is an empty array
    },
});

// Export the 'tag' model with the defined schema
module.exports = mongoose.model('tag', tagSchema);
