const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for the "Login" collection
const loginSchema = new Schema({
    email: {
        type: String, // Data type of 'email' is string
        required: true // 'email' is a required field, must be provided for each entry
    },
    saltedPasswordHash: {
        type: String, // Data type of 'saltedPasswordHash' is string
        required: true, // 'saltedPasswordHash' is a required field, stores the hashed password with salt
    }
});

// Export the 'Login' model with the defined schema
module.exports = mongoose.model('Login', loginSchema);
