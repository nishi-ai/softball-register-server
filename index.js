const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create global app object
const app = express();

// import database
const db = require('./db')

// Enable All CORS Requests (issue from post request from web), so that the Reacct SPA is able to communicate with this server
app.use(cors());

// import all necessary routes
const playerRoutes = require('./routes/player');
const adminRoutes = require('./routes/admin');
const eventsRoutes = require('./routes/events');

// call body-parser and register a middleware by yielding with urlencoded
// pass an option to be able to parse non-default feature 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// call other routes and filter paths
app.use('/player', playerRoutes);
app.use('/admin', adminRoutes);
app.use('/events', eventsRoutes);

// app connects to the database when app starts up before it starts listning to incoming requests
db.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        // start a server, when the connection with database is established
        app.listen(process.env.PORT || 7000);
    }
})



