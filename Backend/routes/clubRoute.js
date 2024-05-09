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
        admins: [req.body.user._id],
        owner: req.body.user._id,
        members: [req.body.user._id],
    });
    //update user to be owner of club and an admin
    try {
        req.body.user.clubs.push(club._id);
        req.body.user.clubsAdministrated.push(club._id);
        req.body.user.clubsOwned.push(club._id);
        await req.body.user.save();
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
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

router.put('/join', verifyRequest, async (req, res) => {
    let clubId = req.body.clubId;
    const cl = await Club.find({ _id: clubId });
    const club = cl[0];

    let user_email = req.body.email;
    const us = await User.find({ email: user_email });
    const user = us[0];

    try {
        if (!cl) {
            return res.status(404).json({ message: "Club not found" });
        }

        if (club.members.includes(user._id.toString())) {
            return res.status(200).json({ message: "User already a member of this club" });
        }

        // Add user to the club
        club.members.push(user._id);
        await club.save();
        
        if (!user.clubs.includes(club._id.toString())) {
            user.clubs.push(club._id);
            await user.save();
        }

        res.json({ message: "Joined club successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
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

