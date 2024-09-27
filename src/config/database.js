const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'ninja_library';

let client;

async function connectToMongo() {
  if (!client) { 
    client = new MongoClient(url);
    try {
      await client.connect();
      console.log("Connecté à MongoDB");
    } catch (err) {
      console.error("Erreur lors de la connexion à MongoDB :", err);
    }
  }
  return client.db(dbName);
}

module.exports = connectToMongo;
