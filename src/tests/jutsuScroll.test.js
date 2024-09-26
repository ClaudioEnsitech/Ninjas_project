/* eslint-disable no-undef */
const { MongoClient } = require('mongodb');
const { jutsuScrollsCollection } = require('../models/jutsuScroll');

describe('JutsuScrolls CRUD operations', () => {
  let db, client;

  beforeAll(async () => {
    client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    db = client.db('ninja_library_test');
  });

  afterAll(async () => {
    await client.close();
  });

  it('devrait créer un nouveau JutsuScroll', async () => {
    const newJutsu = { nom: 'Katon', créateur: 'Uchiha', rang: 'A' };
    const result = await jutsuScrollsCollection(db).insertOne(newJutsu);
    expect(result.insertedCount).toBe(1);
  });
});
