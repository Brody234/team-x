const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event")
const Club = require("../models/club");
const Tag = ("../models/tag");

const { verifyRequest } = require("../common/auth");

router.get('/all', async (req, res) =>{
    try{
        const clubs = await Club.find()
        res.send(clubs)
    }
    catch(error){
        return res.status(500).json({message: err.message})
    }
})

router.patch('/:id', verifyRequest, getClub, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    };
    if (req.body.admins != null) {
        res.user.admins = req.body.admins;
    };
    if (req.body.owner != null) {
        res.user.owner = req.body.owner;
    };
    if (req.body.events != null) {
        res.user.events = req.body.events;
    };
    if (req.body.members != null) {
        res.user.members = req.body.members;
    };
    if (req.body.tags != null) {
        res.user.tags = req.body.tags;
    };
    try {
        const updatedClub = await res.club.save();
        res.json({ message: "Club Updated" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post('/create', verifyRequest, unique, async (req, res) => {
    const club = new Club({
        name: req.body.name,
        tags: req.body.tags,
        events: [],
        admins: req.body.admins,
        owner: req.body.owner,
        members: req.body.members,
    });
    try {
        if (res.issue === "None") {
            const newUser = await club.save();
            res.status(201).json(newUser);
        }
        else {
            res.status(400).json({ message: res.issue })
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', getClub, (req, res) => {
    res.json(res.club);
});


async function unique(req, res, next) {
    try {
        let x = await Club.findOne({ name: req.body.name });

        if (x) {

            res.issue = "Name";
        }
        
        if (x === null) {
            res.issue = "None";
        }
    }
    catch {

    }
    next()
}

async function getClub(req, res, next) {
    let club
    try {
        club = await Club.findById(req.params.id);
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