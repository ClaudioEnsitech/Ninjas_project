const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'cuisine';

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

async function insertUser() {
  const db = await connectToMongo();
  try {
    const result = await db.collection('users').insertOne(
      { name: "Fullmetal", age: 33, email: "FMA@example.com" },
    );
    console.log("Document inséré avec l'ID :", result.insertedId);
  } catch (err) {
    console.error("Erreur lors de l'insertion :", err);
  }
}

async function getAllUsers() {
  const db = await connectToMongo();
  try {
    const result = await db.collection('users').find({ age: { $gt: 25 } }).toArray();
    console.log("Utilisateurs de plus de 25 ans :", result);
  } catch (err) {
    console.error("Erreur lors de la lecture :", err);
  }
}

async function findUser() {
  const db = await connectToMongo();
  try {
    const result = await db.collection('users').findOne({name: 'Gazo'});
    console.log('Utilisateur trouvé :', result);
  } catch (err) {
    console.error('Erreur:', err);
  }
}

findUser();

async function updateUser(name, newAge) {
  const db = await connectToMongo();
  try {
    const result = await db.collection('users').updateOne(
      { name: name },
      { $set: { age: newAge } }
    );
    console.log("Nombre de documents modifiés :", result.modifiedCount);
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
  }
}

async function deleteUser(name) {
  const db = await connectToMongo();
  try {
    const result = await db.collection('users').deleteOne({ name: name });
    console.log("Nombre de documents supprimés :", result.deletedCount);
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
  }
}

async function closeConnection() {
  if (client) {
    await client.close();
    console.log("Connexion à MongoDB fermée");
  }
}

(async function main() {
  await insertUser();
  await findUser("2clooo")
  await getAllUsers();
  await updateUser("Fullmetal", 27); 
  await deleteUser();
  await closeConnection(); 

})();


