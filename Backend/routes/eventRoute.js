const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event")
const Club = require("../models/club");
const Tag = ("../models/tag");

router.get('/all', async (req, res) =>{
    try{
        const events = await Event.find()
        res.send(events)
    }
    catch(error){
        return res.status(500).json({message: err.message})
    }
})

router.patch('/:id', getEvent, async (req, res) => {
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
        const updatedEvent = await res.event.save();
        res.json({ message: "Event Updated" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post('/create', async (req, res) => {
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
        
        const newUser = await event.save();
        res.status(201).json(newUser);
        
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', getEvent, (req, res) => {
    res.json(res.event);
});

async function getEvent(req, res, next) {
    let event
    try {
        event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: "Cannot Find Club" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.event = event;
    next();
};

module.exports = router;