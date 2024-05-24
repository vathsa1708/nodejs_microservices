const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const candidateRoutes = require('./routes/candidate');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Configure CORS to allow requests from any origin (or specify the allowed origins)
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Routes
app.use('/api', authRoutes);
app.use('/api', candidateRoutes);
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
