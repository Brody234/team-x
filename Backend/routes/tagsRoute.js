const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event")
const Club = require("../models/club");
const Tag = require("../models/tag");

const { verifyRequest } = require("../common/auth");

// Route to get all tags
router.get('/all', async (req, res) =>{
    try{
        const tags = await Tag.find();  // Fetch all tags from the database
        res.send(tags);  // Send fetched tags as a response
    }
    catch(error){
        return res.status(500).json({message: error.message});  // Handle any errors that occur during fetch
    }
})

// Route to update a tag's details
router.patch('/:id', verifyRequest, getTag, async (req, res) => {
    // Update fields if they are provided in the request body
    if (req.body.tag != null) {
        res.user.tag = req.body.tag;
    }
    if (req.body.members != null) {
        res.user.members = req.body.members;
    }
    if (req.body.clubs != null) {
        res.user.clubs = req.body.clubs;
    }
    if (req.body.events != null) {
        res.user.events = req.body.events;
    }

    try {
        const newTag = await res.tag.save();  // Save updated tag info to the database
        res.json({ message: "Tag Updated" });  // Respond with success message
    }
    catch (err) {
        return res.status(500).json({ message: err.message });  // Handle save errors
    }
});

// Route to create a new tag
router.post('/create', verifyRequest, unique, async (req, res) => {
    const tag = new Tag({
        tag: req.body.tag,
        members: req.body.members,
        clubs: req.body.clubs,
        events: req.body.events,
    });
    try {
        if (res.issue === "None") {
            const newTag = await tag.save();  // Save the new tag if no issue found
            res.status(201).json(newTag);
        }
        else {
            res.status(400).json({ message: res.issue })  // If issue found, respond with an error
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to fetch a specific tag by ID
router.get('/:id', getTag, (req, res) => {
    res.json(res.tag);  // Return the tag data
});

// Middleware to ensure the uniqueness of the tag
async function unique(req, res, next) {
    try {
        let x = await Tag.findOne({ tag: req.body.tag });

        if (x) {
            res.issue = "Tag";  // Set issue if tag already exists
        }
        
        if (x === null) {
            res.issue = "None";  // No issue if tag does not exist
        }
    }
    catch {

    }
    next();
}

// Middleware to fetch a tag by ID
async function getTag(req, res, next) {
    let tag;
    try {
        tag = await Tag.findById(req.params.id);
        if (tag == null) {
            return res.status(404).json({ message: "Cannot Find Tag" });  // Handle not found error
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });  // Handle other errors
    }
    res.tag = tag;  // Attach found tag to the response
    next();
};

module.exports = router;  // Export the router for use in other parts of the application
