const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

const router = express.Router();

// Load environment variables from .env file
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const API_KEY = process.env.API_KEY;

console.log('Public API API_KEY:', API_KEY);

let db;

// Establish MongoDB connection
const connectToDB = async () => {
  try {
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await client.connect();
    db = client.db();  
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectToDB();

const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  console.log(`Received API Key: '${apiKey}'`);
  console.log(`Expected API Key: '${API_KEY}'`);

  if (apiKey.trim() !== API_KEY.trim()) {
    console.log('Forbidden: Invalid API Key');
    return res.sendStatus(403);
  }
  next();
};

router.post('/profile', authenticateApiKey, async (req, res) => {
  try {
    const { api_key } = req.body;
    console.log(`Received API Key: ${api_key}`);

    // Retrieve user directly from MongoDB
    const user = await db.collection('users').findOne({ api_key }, { projection: { password_hash: 0 } });
    console.log(user);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send(error.message);
  }
});

router.get('/candidate', authenticateApiKey, async (req, res) => {
  try {
    const { api_key } = req.query;
    console.log(`Received API Key: ${api_key}`);

    
    const candidates = await db.collection('candidates').find({ user: api_key }).toArray();
    console.log(candidates);

    res.json(candidates);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
