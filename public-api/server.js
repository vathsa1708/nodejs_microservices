const express = require('express');
// const dotenv = require('dotenv');
require("dotenv").config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const publicRoutes = require('./routes/public');

// dotenv.config();

const app = express();
app.use(bodyParser.json());
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


app.use('/api/public', publicRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Public API running on port ${PORT}`);
});
