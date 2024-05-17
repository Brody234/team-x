const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for the "user" collection
const userSchema = new Schema({
    name: {
        type: String, // Data type of 'name' is string
        required: true, // 'name' field is required
        default: "Unnamed Club" // Default value if 'name' is not specified
    },
    tags: {
        type: [Schema.Types.ObjectId], // 'tags' is an array of ObjectIds, refers to tag documents
        require: true, // 'tags' field is required
        default: [] // Default value for 'tags' is an empty array
    },
    events: {
        type: [Schema.Types.ObjectId], // 'events' is an array of ObjectIds, refers to event documents
        require: true, // 'events' field is required
        default: [] // Default value for 'events' is an empty array
    },
    clubs: {
        type: [Schema.Types.ObjectId], // 'clubs' is an array of ObjectIds, refers to club documents
        require: true, // 'clubs' field is required
        default: [] // Default value for 'clubs' is an empty array
    },
    clubsOwned: {
        type: [Schema.Types.ObjectId], // 'clubsOwned' is an array of ObjectIds, denotes clubs owned by the user
        require: true, // 'clubsOwned' field is required
        default: [] // Default value for 'clubsOwned' is an empty array
    },
    email: {
        type: String, // Data type of 'email' is string
        require: true, // 'email' field is required
        default: "notanemail@gmail.com" // Default value for 'email' is a placeholder (incorrectly formatted)
    },
    pfp: {
        type: String, // Data type of 'pfp' (profile picture) is string
        require: true, // 'pfp' field is required
        default: "notalink.com" // Default value for 'pfp' is a placeholder (formatted as a link)
    },
    clubsAdministrated: {
        type: [Schema.Types.ObjectId], // 'clubsAdministrated' is an array of ObjectIds, refers to clubs administrated by the user
        require: true, // 'clubsAdministrated' field is required
        default: [] // Default value for 'clubsAdministrated' is an empty array
    },
    emailNotifications: {
        type: Boolean, // Data type of 'emailNotifications' is boolean
        require: true, // 'emailNotifications' field is required
        default: true // Default value for 'emailNotifications' is true
    },
    hidden: {
        type: Boolean, // Data type of 'hidden' is boolean
        require: true, // 'hidden' field is required
        default: true // Default value for 'hidden' is true, indicating user is hidden by default
    },
});

// Export the 'user' model with the defined schema
module.exports = mongoose.model('user', userSchema);
