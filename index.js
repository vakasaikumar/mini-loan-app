const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const loanRoutes = require('./routes/loanRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mini-loan-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use the loan routes
app.use('/api', loanRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
