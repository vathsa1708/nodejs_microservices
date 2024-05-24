const express = require('express');
const Candidate = require('../models/Candidate');
const { authenticateToken } = require('../middleware/authenticate');

const router = express.Router();

router.post('/candidate', authenticateToken, async (req, res) => {
  try {
    const { first_name, last_name, email ,user} = req.body;
    const newCandidate = new Candidate({ first_name, last_name, email, user});
    await newCandidate.save();
    res.status(201).send('Candidate added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/candidate', authenticateToken, async (req, res) => {
  try {
    const candidates = await Candidate.find({ user: req.user.api_key });
    res.json(candidates);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
