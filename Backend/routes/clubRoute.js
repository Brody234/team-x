const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event")
const Club = require("../models/club");
const Tag = require("../models/tag");

const { verifyRequest } = require("../common/auth");

// Route to get all clubs
router.get('/all', async (req, res) =>{
    try{
        const clubs = await Club.find();  // Fetch all clubs from the database
        res.send(clubs);  // Send fetched clubs as a response
    }
    catch(error){
        return res.status(500).json({message: err.message});  // Handle any errors that occur during fetch
    }
})

// Route to update a club's details
router.patch('/:id', verifyRequest, getClub, async (req, res) => {
    // Update fields if they are provided in the request body
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
        const updatedClub = await res.club.save();  // Save updated club info to the database
        res.json({ message: "Club Updated" });  // Respond with success message
    }
    catch (err) {
        return res.status(500).json({ message: err.message });  // Handle save errors
    }
});

// Route to create a new club
router.post('/create', verifyRequest, unique, async (req, res) => {
    const club = new Club({
        name: req.body.name,
        tags: req.body.tags,
        events: [],
        admins: [req.body.user._id],
        owner: req.body.user._id,
        members: [req.body.user._id],
    });
    // Attempt to update user details with new club information
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
            const newUser = await club.save();  // Save the new club if no issue found
            res.status(201).json(newUser);
        }
        else {
            res.status(400).json({ message: res.issue })  // If issue found, respond with an error
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to fetch a specific club by ID
router.get('/:id', getClub, (req, res) => {
    res.json(res.club);  // Return the club data
});

// Route to handle a user joining a club
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

        res.json({ message: "Joined club successfully" });  // Confirm successful joining
    } catch (err) {
        res.status(500).json({ message: err.message });  // Handle errors in joining process
    }
});

// Middleware to ensure the uniqueness of the club name
async function unique(req, res, next) {
    try {
        let x = await Club.findOne({ name: req.body.name });

        if (x) {
            res.issue = "Name";  // Set issue if name already exists
        }
        
        if (x === null) {
            res.issue = "None";  // No issue if name does not exist
        }
    }
    catch {

    }
    next()
}

// Middleware to fetch a club by ID
async function getClub(req, res, next) {
    let club
    try {
        club = await Club.findById(req.params.id);
        if (club == null) {
            return res.status(404).json({ message: "Cannnot Find Club" });  // Handle not found error
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });  // Handle other errors
    }
    res.club = club;  // Attach found club to the response
    next();
};

module.exports = router;  // Export the router for use in other parts of the application
