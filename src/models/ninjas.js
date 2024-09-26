require('mongodb');

const ninjasCollection = (db) => db.collection('ninjas');

module.exports = { ninjasCollection };
