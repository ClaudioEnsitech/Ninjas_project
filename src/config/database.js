const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'ninja_library';

async function connectToMongo() {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  console.log("Connecté à MongoDB");
  return db;
}

module.exports = connectToMongo;
