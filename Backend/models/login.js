const mongoose = require('mongoose');
const Schema = mongoose.Schema

const loginSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    saltedPasswordHash: {
        type: String,
        required: true,
    },
    // single session for now; TODO add multi-session auth
    lastValidJwt: {
        type: String,
        required: false,
        default: null
    },
})

module.exports = mongoose.model('Login', loginSchema);