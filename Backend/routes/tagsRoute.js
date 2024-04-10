const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event")
const Club = require("../models/club");
const Tag = ("../models/tag");

const { verifyRequest } = require("../common/auth");

router.get('/all', async (req, res) =>{
    try{
        const tags = await Tag.find()
        res.send(tags)
    }
    catch(error){
        return res.status(500).json({message: err.message})
    }
})

router.patch('/:id', verifyRequest, getTag, async (req, res) => {
    if (req.body.tag != null) {
        res.user.tag = req.body.tag;
    };
    if (req.body.members != null) {
        res.user.members = req.body.members;
    };
    if (req.body.clubs != null) {
        res.user.clubs = req.body.clubs;
    };
    if (req.body.events != null) {
        res.user.events = req.body.events;
    };
    
    
    try {
        const newTag = await res.tag.save();
        res.json({ message: "Tag Updated" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post('/create', verifyRequest, unique, async (req, res) => {
    const tag = new Tag({
        tag: req.body.tag,
        members: req.body.members,
        clubs: req.body.clubs,
        events: req.body.events,
        
    });
    try {
        if (res.issue === "None") {
            const newTag = await tag.save();
            res.status(201).json(newTag);
        }
        else {
            res.status(400).json({ message: res.issue })
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', getTag, (req, res) => {
    res.json(res.tag);
});


async function unique(req, res, next) {
    try {
        let x = await Tag.findOne({ tag: req.body.tag });

        if (x) {

            res.issue = "Tag";
        }
        
        if (x === null) {
            res.issue = "None";
        }
    }
    catch {

    }
    next()
}

async function getTag(req, res, next) {
    let tag
    try {
        tag = await Tag.findById(req.params.id);
        if (tag == null) {
            return res.status(404).json({ message: "Cannot Find Club" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.tag = tag;
    next();
};

module.exports = router;