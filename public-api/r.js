const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Load MongoDB models
const User = require('../main_service/models/User'); 
const Candidate = require('../main_service/models/Candidate'); 

// Establish MongoDB connection
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Define function to retrieve all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    console.log('All Users:', users);
  } catch (error) {
    console.error('Error retrieving users:', error.message);
  }
};

// Define function to retrieve all candidates
const getAllCandidates = async () => {
  try {
    const candidates = await Candidate.find();
    console.log('All Candidates:', candidates);
  } catch (error) {
    console.error('Error retrieving candidates:', error.message);
  }
};

// Main function to run the script
const main = async () => {
  // Connect to the database
  await connectToDB();

  // Retrieve all users
  await getAllUsers();

  // Retrieve all candidates
  await getAllCandidates();

  // Disconnect from the database
  await mongoose.disconnect();
};

// Run the main function
main();
