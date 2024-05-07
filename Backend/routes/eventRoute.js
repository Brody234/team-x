const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event")
const Club = require("../models/club");
const Tag = ("../models/tag");

const { verifyRequest } = require("../common/auth");

router.get('/all', async (req, res) =>{
    try{
        const events = await Event.find()
        res.send(events)
    }
    catch(error){
        return res.status(500).json({message: err.message})
    }
})

router.patch('/going/:id', verifyRequest, getEvent, async(req, res)=>{
    res.event.attendees.push(req.body.user)
    res.user.events.push(res.event)
    try{
        const newE = await res.event.save()
        const newU = await res.user.save()
        res.status(200).json({message: "Going To Event"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

router.patch('/:id', verifyRequest, getEvent, async (req, res) => {
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
        
        const newEvent = await event.save();
        res.club.events.push(newEvent._id)
        const saveClub = await res.club.save()
        res.status(201).json(newEvent);
        
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

router.put('/rsvp/:id', verifyRequest, getEvent, getUser, async (req, res) => {
    const eventId = req.params.eventId;
    const user = req.body.email;
    const attending = req.body.attending; // Boolean value. True if attending, False if not attending

    try {
        if (attending) {
            if (!res.event.attendees.includes(user)) {
                res.event.attendees.push(user);
            }
            if (!res.user.events.includes(eventId)) {
                res.user.events.push(eventId);
            }
        } else { // if attednig is false
            res.event.attendees = res.event.attendees.filter(id => id.toString() !== user);
            res.user.events = res.user.events.filter(id => id.toString() !== eventId);
        }

        await res.event.save();
        await res.user.save();
        res.json({ message: attending ? "RSVP to event as attending" : "RSVP to event as not attending" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.body.userId);
        if (user == null) {
            return res.status(404).json({ message: "Cannot Find User" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
};

async function getClub(req, res, next) {
    let club
    try {
        club = await Club.findById(req.body.clubPosting);
        if (club == null) {
            return res.status(404).json({ message: "Cannot Find Club" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.club = club;
    next();
};

module.exports = router;