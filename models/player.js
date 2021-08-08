const mongoose = require('mongoose');

const players = [];

// create Player schema and pass an object for each field in the table
var PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Please enter your name"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Please enter your email"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true
    }
}, {timestamps: true});


// use class instead contructor function
// define a shape of a Player in this class
module.exports = class Player {
    // create property like a variable in the class
    // allows to create an object based on this class, where the name, email can be passed to the constructor
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    // store player to an array of players
    save() {
        players.push(this);
        console.log('player array', players)
        // const db = getDb();
        // db.save(players)
    }
    // fetch all existing players
    // static makes to call this fetchAll method directly on the class, not on an instantiated object
    static fetchAll() {
        return players;
    }
}

// export the schema so it can be used later
mongoose.model('Player', PlayerSchema);