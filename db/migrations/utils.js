const { MongoClient } = require('mongodb');

const mongoDBHost = 'mongodb://localhost:27017';

const connectDB = async () => {
  console.log('MongoDB: connecting...');
  const client = await MongoClient.connect(mongoDBHost);
  console.log('MongoDB: connected.');
  return client;
}

module.exports = {
  connectDB,
}