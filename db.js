const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let mongoDB = 'mongodb://localhost:27017'

if (process.env.NODE_ENV === 'production') {
    console.log("It's in production" );
    console.log('MONGODB_PASSWORD', process.env.MONGODB_PASSWORD);
    console.log('MONGODB_USERNAME', process.env.MONGODB_USERNAME);
    mongoDB = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ddfbs.mongodb.net`
} else {
    console.log("It's in dev", process.env.NODE_ENV);
}

// no initial value inside
let _db;

// initDb simply points at a function which receives a callback
// to establish a connection

const initDb = async (callback) => {
    if (_db) {
        console.log('Database is already initialized!')
        return callback(null);
    }
    console.log('MongoDB: connecting...')
    try {
        const client = await MongoClient.connect(mongoDB);
        // get access to the client which allows you to simply store the database
        // access to the database which was created
        console.log('connected')
        _db = client;
        callback(null);
    } catch(err) {
        callback(err);
        console.log(err)
    }
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