const players = [];

// use class instead contructor function
// define a shape of a Player in this class
module.exports = class Player {
    // create property like a variable in the class
    // allows to create an object based on this class, where the name, email can be passed to the constructor
    constructor(n, e) {
        this.name = n;
        this.email = e
    }

    // store player to an array of players
    save() {
        players.push(this);
    }
    // fetch all existing players
    // static makes to call this fetchAll method directly on the class, not on an instantiated object
    static fetchAll() {
        return players;
    }
}