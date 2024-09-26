const { jutsuScrollsCollection } = require('../models/jutsuScroll');
const { ObjectId } = require('mongodb');

async function getJutsuScrolls(req, res) {
  const { db } = req.app.locals;
  const scrolls = await jutsuScrollsCollection(db).find().toArray();
  res.json(scrolls);
}

async function getJutsuScrollById(req, res) {
  const { db } = req.app.locals;
  const scroll = await jutsuScrollsCollection(db).findOne({ _id: new ObjectId(req.params.id) });
  if (!scroll) return res.status(404).send('JutsuScroll non trouvé');
  res.json(scroll);
}

async function createJutsuScroll(req, res) {
  try {
    const { db } = req.app.locals;
    const newScroll = req.body;
    const result = await jutsuScrollsCollection(db).insertOne(newScroll);
    res.status(200).json({ id: result.insertedId, ...newScroll });
  } catch (err) {
    res.status(500).send('Erreur lors de la création du JutsuScroll');
  }
}


async function updateJutsuScroll(req, res) {
  const { db } = req.app.locals;
  const result = await jutsuScrollsCollection(db).updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  if (result.matchedCount === 0) return res.status(404).send('JutsuScroll non trouvé');
  res.json(result);
}

async function deleteJutsuScroll(req, res) {
  const { db } = req.app.locals;
  const result = await jutsuScrollsCollection(db).deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).send('JutsuScroll non trouvé');
  res.json(result);
}

module.exports = { getJutsuScrolls, getJutsuScrollById, createJutsuScroll, updateJutsuScroll, deleteJutsuScroll };
