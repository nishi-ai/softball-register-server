// //Set up default mongoose connection
// var mongoDB = 'mongodb://localhost:27017'
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

// //Get the default connection
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const mongoDbUrl = 
    'mongodb+srv://root:superserect@cluster0.ddfbs.mongodb.net/softball'

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
    // use mongoclient and call connect and use that mongoDbUrL
    MongoClient.connect(mongoDbUrl)
        // get access to the client which allows you to simply store the database
        .then(client => {
            // access to the database which was created
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