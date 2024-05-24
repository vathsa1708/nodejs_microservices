const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  user: { type: String, required: true } // Reference to 'api_key' field in the User model
});

module.exports = mongoose.model('Candidate', CandidateSchema);
