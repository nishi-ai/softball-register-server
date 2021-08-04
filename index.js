const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// Create global app object
const app = express();

// Enable All CORS Requests (issue from post request from web) 
app.use(cors());

// import player routes
const playerRoutes = require('./routes/player')

// call body-parser and register a middleware by yielding with urlencoded
// pass an option to be able to parse non-default feature 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// call other routes and filter paths
app.use('/player', playerRoutes);

// Connect to db
// mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })

// start a server
// const server = http.createServer(app);
// server.listen(3000) instead of these two line and require('http')
app.listen(process.env.PORT || 7000);

