const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Login = require("../models/login");

const { createUser } = require("../common/users");

const saltRounds = 12;
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await Login.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.saltedPasswordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Issue JWT token
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '21d' });

        //TODO remove user return--it is just for testing.
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({message: 'Passwords do not match.'});
        }

        // hard code email check for now
        if(!email.endsWith("@umass.edu"))
        {
            return res.status(400).json({message: 'Email must be a valid UMass email.'});
        }

        // Check if email is already registered
        const existingUser = await Login.findOne({ email: email.trim() });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Generate salt and hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        Login.create({
            email: email.trim(),
            saltedPasswordHash: hashedPassword,
        }).catch((err) => {
            return res.status(400).json({ message: err.message });
        });

        //create user info for new user
        const user = await createUser(req.body);

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;