const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event")
const Club = require("../models/club");
const Tag = ("../models/tag");

const { verifyRequest } = require("../common/auth");
const event = require('../models/event');

router.get('/all', async (req, res) => {
    try {
        const events = await Event.find()
        res.send(events)
    }
    catch (error) {
        return res.status(500).json({ message: err.message })
    }
})

router.patch('/going/:id', verifyRequest, async (req, res) => {
    const user = req.body.user;
    const event = await Event.findById(req.params.id);
    if (!event)
        res.status(404).json({ message: "Event Not Found" })

    if (!user.events.includes(event._id)) {
        user.events.push(event._id);
    } else {
        user.events = user.events.filter((e) => {
            e.toString() != event._id.toString()
        });
    }

    if (!event.attendees.includes(user._id)) {
        event.attendees.push(user._id);
    } else {
        event.attendees = event.attendees.filter((e) => e.toString() != user._id.toString());
    }

    try {
        const newE = await event.save()
        const newU = await user.save()
        res.status(200).json({ message: "Going To Event" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.patch('/notgoing/:id', verifyRequest, async (req, res) => {
    const user = req.body.user;
    const event = await Event.findById(req.params.id);
    if (!event)
        res.status(404).json({ message: "Event Not Found" })

    user.events = user.events.filter((e) => e != event._id);
    event.attendees = event.attendees.filter((e) => e != user._id);
    try {
        const newE = await event.save()
        const newU = await user.save()
        res.status(200).json({ message: "Not Going To Event" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// unregister from all events
router.patch('/notgoing', verifyRequest, async (req, res) => {
    const user = req.body.user;
    user.events = [];
    try {
        const newU = await user.save()
        res.status(200).json({ message: "Not Going To Any Event" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});

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
        console.log(req.params)
        event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: "Cannot Find Event" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.event = event;
    next();
};



router.put('/rsvp', verifyRequest, async (req, res) => {
    let eventId = req.body.id;
    const ev = await Event.find({ _id: eventId });
    const event = ev[0];

    let user_email = req.body.email;
    const us = await User.find({ email: user_email });
    const user = us[0];

    const attending = req.body.attending;

    try {
        if (attending) {
            if (!event.attendees.includes(user._id.toString())) {
                console.log('User is not an attendee.');

                event.attendees.push(user._id);
                console.log(event.attendees)

                user.events.push(event._id);
                console.log(user.events)

                await event.save();
                console.log('User added to attendees list.');

                await user.save();
                console.log('Event added to user events list.');


                res.send('Event added to user events list. User added to attendees list.');

            } else {
                console.log('User is already an attendee.');
                res.send('User is already an attendee.');
            }
        } else {
            if (event.attendees.includes(user._id.toString())) {
                console.log('User is an attendee.');

                event.attendees = event.attendees.filter(id => id.toString() !== user._id.toString());
                console.log(event.attendees)
                await event.save();
                console.log('User removed from attendees list.');

                user.events = user.events.filter(id => id.toString() !== eventId);
                console.log(user.events)
                await user.save();

                res.send('User removed from attendees list. Event removed from user events list.');
            } else {
                console.log('User is not an attendee.');
                res.send('User is not an attendee.');
            }
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


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
            return res.status(404).json({ message: "Cannnot Find Club" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.club = club;
    next();
};

module.exports = router;