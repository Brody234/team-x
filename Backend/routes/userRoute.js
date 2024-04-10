const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event")
const Club = require("../models/club");
const Tag = ("../models/tag");
const { createUser } = require("../common/users");

//for now every request requires you to be logged in
const { verifyRequest } = require("../common/auth")

router.get('/all', verifyRequest, async (req, res) =>{
    try{
        const users = await User.find()
        res.send(users)
    }
    catch(error){
        return res.status(500).json({message: err.message})
    }
})

router.patch('/:id', verifyRequest, getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    };
    if (req.body.email != null) {
        res.user.email = req.body.email;
    };
    if (req.body.events != null) {
        res.user.events = req.body.events;
    };
    if (req.body.emailNotifications != null) {
        res.user.emailNotifications = req.body.emailNotifications;
    };
    if (req.body.tags != null) {
        res.user.tags = req.body.tags;
    };
    if (req.body.hidden != null) {
        res.user.hidden = req.body.hidden;
    };
    if (req.body.clubs != null) {
        res.user.clubs = req.body.clubs;
    };
    if (req.body.pfp != null) {
        res.user.pfp = req.body.pfp;
    };
    if (req.body.clubsOwned != null){
        res.user.clubsOwned = req.body.clubsOwned;
    };
    if (req.body.clubsAdministrated != null){
        res.user.clubsAdministrated = req.body.clubsAdministrated;
    };
    try {
        const updatedUser = await res.user.save();
        res.json({ message: "User Updated" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post('/create', verifyRequest, unique, async (req, res) => {
    try {
        if (res.issue === "None") {
            const newUser = await createUser(req.body);
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

router.get('/:id', verifyRequest, getUser, (req, res) => {
    res.json(res.user);
});


async function unique(req, res, next) {
    try {
        let x = await User.findOne({ email: req.body.email });

        if (x) {

            res.issue = "Email";
        }
        
        if (x === null) {
            res.issue = "None";
        }
    }
    catch {
    }
    next()
}

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id);
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

module.exports = router;