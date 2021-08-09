// const mongoose = require('mongoose');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//Set up default mongoose connection
var mongoDBLocal = 'mongodb://localhost:27017'
var mongoDB = 'mongodb+srv://root:supersecret@cluster0.ddfbs.mongodb.net/softball'
// mongoose.connect(mongoDB || mongoDBLocal, { useNewUrlParser: true, useUnifiedTopology: true })

//Get the default connection
// var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// no initial value inside
let _db;

// initDb simply points at a function which receives a callback
// to establish a connection
const initDb = callback => {
    // check if db is uninitialized or not
    if (_db) {
        console.log('Database is already initialized!')
        return callback(null, _db);
    }
    MongoClient.connect(mongoDBLocal)
        // get access to the client which allows you to simply store the database
        .then(client => {
            // access to the database which was created
            console.log('connected')
            _db = client;
            callback(null, _db);
        })
        .catch(err => {
        // execute callback and pass the error as the first argument
        callback(err);
    });
}

// getDb, to get access to this established existing database
const getDb = () => {
    // if db is not initialized, throw error
    if (!_db) {
        throw Error('Database not initialized!')
    }
    return _db
}

module.exports = {
    initDb,
    getDb
}