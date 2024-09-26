require('mongodb');

const empruntsCollection = (db) => db.collection('emprunts');

module.exports = { empruntsCollection };
