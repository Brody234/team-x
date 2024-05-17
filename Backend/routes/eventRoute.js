const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event")
const Club = require("../models/club");
const Tag = require("../models/tag");

const { verifyRequest } = require("../common/auth");
const event = require('../models/event');

// GET route to retrieve all events
router.get('/all', async (req, res) => {
    try {
        const events = await Event.find(); // Fetches all events from the database
        res.send(events); // Sends the events as a response
    }
    catch (error) {
        return res.status(500).json({ message: error.message }); // Error handling for database query
    }
})

// PATCH route to toggle the attendance status of a user for an event
router.patch('/going/:id', verifyRequest, async (req, res) => {
    const user = req.body.user;
    const event = await Event.findById(req.params.id); // Find event by ID
    if (!event)
        res.status(404).json({ message: "Event Not Found" }) // Event not found

    // Toggle attendance for the user and event
    if (!user.events.includes(event._id)) {
        user.events.push(event._id); // Add event to user's events if not already included
    } else {
        user.events = user.events.filter((e) => {
            e.toString() != event._id.toString()
        });
    }

    if (!event.attendees.includes(user._id)) {
        event.attendees.push(user._id); // Add user to event's attendees if not already included
    } else {
        event.attendees = event.attendees.filter((e) => e.toString() != user._id.toString());
    }

    try {
        const newE = await event.save() // Save updated event
        const newU = await user.save() // Save updated user
        res.status(200).json({ message: "Going To Event" }) // Success message
    }
    catch (err) {
        res.status(500).json({ message: err.message }) // Error handling for saving changes
    }
})

// PATCH route to mark user as not going to a specific event
router.patch('/notgoing/:id', verifyRequest, async (req, res) => {
    const user = req.body.user;
    const event = await Event.findById(req.params.id);
    if (!event)
        res.status(404).json({ message: "Event Not Found" }) // Event not found

    // Remove user from event attendees and user's events list
    user.events = user.events.filter((e) => e != event._id);
    event.attendees = event.attendees.filter((e) => e != user._id);
    try {
        const newE = await event.save() // Save event updates
        const newU = await user.save() // Save user updates
        res.status(200).json({ message: "Not Going To Event" }) // Success message
    }
    catch (err) {
        res.status(500).json({ message: err.message }) // Error handling for saving changes
    }
});

// PATCH route to remove a user from all events they are attending
router.patch('/notgoing', verifyRequest, async (req, res) => {
    const user = req.body.user;
    user.events = []; // Clear all events from user's list
    try {
        const newU = await user.save() // Save the user with no events
        res.status(200).json({ message: "Not Going To Any Event" }) // Success message
    }
    catch (err) {
        res.status(500).json({ message: err.message }) // Error handling for database operations
    }
});

// PATCH route to update an event's details
router.patch('/:id', verifyRequest, getEvent, async (req, res) => {
    // Update event details based on provided body parameters
    if (req.body.name != null) {
        res.user.name = req.body.name;
    };
    if (req.body.clubPosting != null) {
        res.user.clubPosting = req.body.clubPosting;
    };
    if (req.body.description != null) {
        res.user.description = req.body.description;
    };
    if (req.body.image != null) {
        res.user.image = req.body.image;
    };
    if (req.body.startTime != null) {
        res.user.startTime = req.body.startTime;
    };
    if (req.body.tags != null) {
        res.user.tags = req.body.tags;
    };
    if (req.body.location != null) {
        res.user.location = req.body.location;
    };
    if (req.body.attendees != null) {
        res.user.attendees = req.body.attendees;
    };

    try {
        const updatedEvent = await res.event.save(); // Save the updated event
        res.json({ message: "Event Updated" }); // Success message
    }
    catch (err) {
        return res.status(500).json({ message: err.message }); // Error handling for database operations
    }
});

// POST route to create a new event
router.post('/create', verifyRequest, getClub, async (req, res) => {
    const event = new Event({
        name: req.body.name,
        tags: req.body.tags,
        image: req.body.image,
        clubPosting: req.body.clubPosting,
        description: req.body.description,
        startTime: req.body.startTime,
        attendees: req.body.attendees,
        location: req.body.location,
    });
    try {
        const newEvent = await event.save(); // Save the new event
        res.club.events.push(newEvent._id) // Add new event to club's event list
        const saveClub = await res.club.save() // Save the updated club
        res.status(201).json(newEvent); // Success message

    }
    catch (err) {
        res.status(400).json({ message: err.message }); // Error handling for creating the event
    }
});

// GET route to retrieve specific event by ID
router.get('/:id', getEvent, (req, res) => {
    res.json(res.event); // Return the specific event details
});

// Middleware to retrieve an event by ID
async function getEvent(req, res, next) {
    let event
    try {
        console.log(req.params)
        event = await Event.findById(req.params.id); // Attempt to find the event by ID
        if (event == null) {
            return res.status(404).json({ message: "Cannot Find Event" }); // Event not found
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message }); // Error handling for database operations
    }
    res.event = event; // Attach event to response object
    next();
};

// RSVP route to update attendance status
router.put('/rsvp', verifyRequest, async (req, res) => {
    let eventId = req.body.id;
    const ev = await Event.find({ _id: eventId }); // Find event by ID
    const event = ev[0];

    let user_email = req.body.email;
    const us = await User.find({ email: user_email }); // Find user by email
    const user = us[0];

    const attending = req.body.attending;

    try {
        if (attending) {
            if (!event.attendees.includes(user._id.toString())) {
                console.log('User is not an attendee.');

                event.attendees.push(user._id); // Add user to attendees if not already included
                console.log(event.attendees)

                user.events.push(event._id); // Add event to user's list of events
                console.log(user.events)

                await event.save(); // Save the updated event
                console.log('User added to attendees list.');

                await user.save(); // Save the updated user
                console.log('Event added to user events list.');


                res.send('Event added to user events list. User added to attendees list.');

            } else {
                console.log('User is already an attendee.');
                res.send('User is already an attendee.');
            }
        } else {
            if (event.attendees.includes(user._id.toString())) {
                console.log('User is an attendee.');

                event.attendees = event.attendees.filter(id => id.toString() !== user._id.toString()); // Remove user from attendees
                console.log(event.attendees)
                await event.save(); // Save the updated event
                console.log('User removed from attendees list.');

                user.events = user.events.filter(id => id.toString() !== eventId); // Remove event from user's events
                console.log(user.events)
                await user.save(); // Save the updated user

                res.send('User removed from attendees list. Event removed from user events list.');
            } else {
                console.log('User is not an attendee.');
                res.send('User is not an attendee.');
            }
        }

    } catch (err) {
        res.status(500).json({ message: err.message }); // Error handling for RSVP updates
    }
})

// Middleware to retrieve a user by ID
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.body.userId); // Find user by ID
        if (user == null) {
            return res.status(404).json({ message: "Cannot Find User" }); // User not found
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message }); // Error handling for database operations
    }
    res.user = user; // Attach user to response object
    next();
};

// Middleware to retrieve a club by ID
async function getClub(req, res, next) {
    let club
    try {
        club = await Club.findById(req.body.clubPosting); // Find club by ID from clubPosting field
        if (club == null) {
            return res.status(404).json({ message: "Cannnot Find Club" }); // Club not found
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message }); // Error handling for database operations
    }
    res.club = club; // Attach club to response object
    next();
};

module.exports = router; // Export the router to be used in other parts of the application
