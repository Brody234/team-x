const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for the "event" collection
const eventSchema = new Schema({
    name: {
        type: String, // Data type of 'name' is string
        required: true, // 'name' is a mandatory field
        default: "Unnamed Club" // Default value if 'name' is not specified
    },
    tags: {
        type: [String], // 'tags' is an array of strings
        require: true, // 'tags' field is required
        default: [] // Default value for 'tags' is an empty array
    },
    attendees: {
        type: [Schema.Types.ObjectId], // 'attendees' is an array of ObjectIds
        require: true, // 'attendees' field is required
        default: [] // Default value for 'attendees' is an empty array
    },
    clubPosting: {
        type: [Schema.Types.ObjectId], // 'clubPosting' is an array of ObjectIds, referring to clubs posting the event
        require: true, // 'clubPosting' field is required
        default: [] // Default value for 'clubPosting' is an empty array
    },
    startTime: {
        type: Date, // 'startTime' is a date field
        require: true, // 'startTime' field is required
        default: Date.now() // Default value for 'startTime' is the current date and time
    },
    location: {
        type: String, // Data type of 'location' is string
        require: true, // 'location' field is required
        default: "notanemail@gmail.com" // Default value for 'location' is a placeholder (incorrectly formatted as an email)
    },
    image: {
        type: String, // Data type of 'image' is string
        require: true, // 'image' field is required
        default: "notalink.com" // Default value for 'image' is a placeholder (formatted as a link)
    },
    description: {
        type: String, // Data type of 'description' is string
        require: true, // 'description' field is required
        default: "This event is cool" // Default description text
    }
});

// Export the 'event' model with the defined schema
module.exports = mongoose.model('event', eventSchema);
