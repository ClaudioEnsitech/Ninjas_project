const { empruntsCollection } = require('../models/emprunts');
const { ObjectId } = require('mongodb');


async function getEmprunts(req, res) {
  const { db } = req.app.locals;
  const emprunts = await empruntsCollection(db).find().toArray();
  res.json(emprunts);
}

async function getEmpruntsById(req, res) {
  const { db } = req.app.locals;
  const emprunts = await empruntsCollection(db).findOne({ _id: new ObjectId(req.params.id) });
  if (!emprunts) return res.status(404).send('Emprunts non trouvé');
  res.json(emprunts);
}

async function createEmprunt(req, res) {
  const { db } = req.app.locals;
  const newEmprunt = req.body;
  const result = await empruntsCollection(db).insertOne(newEmprunt);
  res.status(201).json(result.ops[0]);
}

async function updateEmprunt(req, res) {
  const { db } = req.app.locals;
  const result = await empruntsCollection(db).updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  if (result.matchedCount === 0) return res.status(404).send('Emprunt non trouvé');
  res.json(result);
}

async function deleteEmprunt(req, res) {
  const { db } = req.app.locals;
  const result = await empruntsCollection(db).deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).send('Emprunt non trouvé');
  res.json(result);
}

module.exports = { getEmprunts, getEmpruntsById, createEmprunt, updateEmprunt, deleteEmprunt };
