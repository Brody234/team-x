const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event");
const Club = require("../models/club");
const Tag = require("../models/tag"); // Note: There's a syntax error here, should be require("../models/tag");
const { createUser } = require("../common/users");

// Middleware that ensures all requests are authenticated
const { verifyRequest } = require("../common/auth");

// GET route to retrieve all users; requires authentication
router.get('/all', verifyRequest, async (req, res) =>{
    try {
        const users = await User.find(); // Fetch all users from the database
        res.send(users); // Send response with user data
    }
    catch(error) {
        return res.status(500).json({message: error.message}); // Error handling if fetching users fails
    }
})

// PATCH route to update current user's information; requires authentication
router.patch('/me', verifyRequest, async (req, res) => {
    // Update user fields if they are provided in the request body
    if (req.body.name != null) {
        req.body.user.name = req.body.name;
    }
    if (req.body.email != null) {
        req.body.user.email = req.body.email;
    }
    if (req.body.events != null) {
        req.body.user.events = req.body.events;
    }
    if (req.body.emailNotifications != null) {
        req.body.user.emailNotifications = req.body.emailNotifications;
    }
    if (req.body.tags != null) {
        req.body.user.tags = req.body.tags;
    }
    if (req.body.hidden != null) {
        req.body.user.hidden = req.body.hidden;
    }
    if (req.body.clubs != null) {
        req.body.user.clubs = req.body.clubs;
    }
    if (req.body.pfp != null) {
        req.body.user.pfp = req.body.pfp;
    }
    if (req.body.clubsOwned != null) {
        req.body.user.clubsOwned = req.body.clubsOwned;
    }
    if (req.body.clubsAdministrated != null) {
        req.body.user.clubsAdministrated = req.body.clubsAdministrated;
    }
    try {
        const updatedUser = await req.body.user.save(); // Save the updated user information
        res.json({ message: "User Updated" }); // Send success message
    }
    catch (err) {
        return res.status(500).json({ message: err.message }); // Error handling if update fails
    }
});

// POST route to create a new user; requires unique email and authentication
router.post('/create', verifyRequest, unique, async (req, res) => {
    try {
        if (res.issue === "None") {
            const newUser = await createUser(req.body); // Create a new user with provided details
            res.status(201).json(newUser); // Send success response with new user data
        }
        else {
            res.status(400).json({ message: res.issue }); // Handle failure if email is not unique
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message }); // Error handling if creation fails
    }
});

// GET route to retrieve current user's information; requires authentication
router.get('/me', verifyRequest, (req, res) => {
    res.json(req.body.user); // Send response with current user's data
});

// Middleware to ensure the uniqueness of the user's email
async function unique(req, res, next) {
    try {
        let x = await User.findOne({ email: req.body.email });

        if (x) {
            res.issue = "Email"; // Set issue if email already exists
        }
        
        if (x === null) {
            res.issue = "None"; // Set no issue if email is unique
        }
    }
    catch {
    }
    next(); // Proceed to next middleware or route
}

// Middleware to retrieve a user by ID
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id); // Fetch user by ID
        if (user == null) {
            return res.status(404).json({ message: "Cannot Find User" }); // Handle user not found
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message }); // Handle other errors
    }
    res.user = user; // Attach user to response object
    next(); // Proceed to next middleware or route
};

module.exports = router; // Export router to use in other parts of the application
