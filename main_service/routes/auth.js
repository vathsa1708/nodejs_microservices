const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid'); // Import the uuid module
const User = require('../models/User');
const { authenticateToken } = require('../middleware/authenticate');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    // Generate API key using uuid
    const apiKey = uuidv4();
    // Create new user with API key
    const newUser = new User({ first_name, last_name, email, password_hash: password, api_key: apiKey });
    await newUser.save();
    // Return API key in the response
    res.status(201).json({ message: 'User registered successfully', apiKey });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/protected', authenticateToken, (req, res) => {
  res.send('Protected data');
});

module.exports = router;
