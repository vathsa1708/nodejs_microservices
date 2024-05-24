// routes/user.js
const express = require('express');
const mongoose = require('mongoose');
const { authenticateToken } = require('../middleware/authenticate');

const router = express.Router();

router.get('/user', authenticateToken, async (req, res) => {
  try {
    const { apiKey } = req.query;
    console.log(`Received API Key: ${apiKey}`);

    // Ensure mongoose connection is ready before proceeding
    if (mongoose.connection.readyState !== 1) {
      console.log('Mongoose connection is not ready');
      return res.status(500).send('Database connection is not ready');
    }

    // Directly access the MongoDB collection
    const db = mongoose.connection.db;
    const user = await db.collection('users').findOne({ api_key: apiKey }, { projection: { password_hash: 0 } });
    console.log(`Queried User: ${user}`);

    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
