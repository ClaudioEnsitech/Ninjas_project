require('mongodb');

const jutsuScrollsCollection = (db) => db.collection('jutsuScrolls');

module.exports = { jutsuScrollsCollection };
