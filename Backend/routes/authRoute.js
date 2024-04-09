const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Login = require("../models/login");

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
        user.lastValidJwt = token;
        await user.save();

        //TODO remove user return--it is just for testing.
        res.status(200).json({ token, user });
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

        // Check if email is already registered
        const existingUser = await Login.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Generate salt and hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new Login({
            email,
            saltedPasswordHash: hashedPassword,

        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;