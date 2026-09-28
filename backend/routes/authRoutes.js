const express = require('express');
const router = express.Router();

// 1. User Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Dummy Login Check (Can be connected to the database after creating the User Model)
    if (email === "user@gmail.com" && password === "123456") {
        return res.status(200).json({
            message: 'Login Successful!',
            token: 'sample_jwt_token_12345'
        });
    } else {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }
});

// 2. User Register Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    return res.status(201).json({ message: 'User registered successfully!' });
});

module.exports = router;