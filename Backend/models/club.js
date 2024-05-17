const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for the "club" collection
const clubSchema = new Schema({
    name: {
        type: String, // Data type of 'name' is string
        required: true, // 'name' is a required field
        default: "Unnamed Club" // Default value if 'name' is not specified
    },
    tags: {
        type: [Schema.Types.ObjectId], // 'tags' is an array of ObjectIds
        require: true, // 'tags' field is required
        default: [] // Default value for 'tags' is an empty array
    },
    events: {
        type: [Schema.Types.ObjectId], // 'events' is an array of ObjectIds
        require: true, // 'events' field is required
        default: [] // Default value for 'events' is an empty array
    },
    owner: {
        type: Schema.Types.ObjectId, // 'owner' is an ObjectId
        require: true // 'owner' field is required
    },
    members: {
        type: [Schema.Types.ObjectId], // 'members' is an array of ObjectIds
        require: true, // 'members' field is required
        default: [] // Default value for 'members' is an empty array
    },
    admins: {
        type: [Schema.Types.ObjectId], // 'admins' is an array of ObjectIds
        require: true, // 'admins' field is required
        default: [] // Default value for 'admins' is an empty array
    },
});

// Export the 'club' model with the defined schema
module.exports = mongoose.model('club', clubSchema);
