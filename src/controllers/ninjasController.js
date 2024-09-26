const { ninjasCollection } = require('../models/ninjas');
const { ObjectId } = require('mongodb');


async function getNinjas(req, res) {
  const { db } = req.app.locals;
  const ninjas = await ninjasCollection(db).find().toArray();
  res.json(ninjas);
}

async function getNinjasById(req, res) {
  const { db } = req.app.locals;
  const ninjas = await ninjasCollection(db).findOne({ _id: new ObjectId(req.params.id) });
  if (!ninjas) return res.status(404).send('Ninja non trouvé');
  res.json(ninjas);
}

async function createNinja(req, res) {
  const { db } = req.app.locals;
  const newNinja = req.body;
  const result = await ninjasCollection(db).insertOne(newNinja);
  res.status(201).json(result.ops[0]);
}

async function updateNinja(req, res) {
  const { db } = req.app.locals;
  const result = await ninjasCollection(db).updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  if (result.matchedCount === 0) return res.status(404).send('Ninja non trouvé');
  res.json(result);
}

async function deleteNinja(req, res) {
  const { db } = req.app.locals;
  const result = await ninjasCollection(db).deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).send('Ninja non trouvé');
  res.json(result);
}

module.exports = { getNinjas, getNinjasById, createNinja, updateNinja, deleteNinja };
