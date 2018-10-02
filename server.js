const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set the port to 3000 OR let the process set the port (if deployed to Heroku)
const PORT = process.env.PORT || 3000;
mongoose.set('useCreateIndex', true);

// Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));
app.use(bodyParser.json());

// Connect to the Mongo DB using the todolistapp database (will be created if it doesn't exist)
mongoose.connect('mongodb://localhost/todolistapp', { useNewUrlParser: true });

// Routes
// -----------------

// API Routes (require from routes file and pass in Express app)
require('./routes/api-routes')(app);

// HTML Routes (require from routes file and pass in Express app)
//require('./routes/html-routes')(app);

// Starts our server on the predefined PORT
app.listen(PORT, function () {
  console.log(`App running on port ${PORT}`);
});