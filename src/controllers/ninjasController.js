const { ninjasCollection } = require('../models/ninjas');
const { ObjectId } = require('mongodb');
const Joi = require('joi');

const ninjaSchema = Joi.object({
  name: Joi.string().required(),
  rank: Joi.string().valid('Genin', 'Chunin', 'Jonin', 'ANBU', 'Sannin', 'Kage').required(),
  jutsus_maîtrisés: Joi.array().items(Joi.string()).required(),
  clan: Joi.string().required(),
  spécialité: Joi.string().required()
});

async function getNinjas(req, res) {
  const { db } = req.app.locals;
  const { page = 1, limit = 10, rank, clan, sortField = 'name', sortOrder = 'asc' } = req.query;
  const skip = (page - 1) * limit;

  const filter = {};
  if (rank) filter.rank = rank;
  if (clan) filter.clan = clan;

  try {
    const ninjas = await ninjasCollection(db)
      .find(filter)
      .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 }) 
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .toArray();

    const totalNinjas = await ninjasCollection(db).countDocuments(filter);
    
    res.json({
      apiVersion: '1.0',
      data: ninjas,
      total: totalNinjas,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des ninjas');
  }
}

async function getNinjasById(req, res) {
  const { db } = req.app.locals;
  try {
    const ninja = await ninjasCollection(db).findOne({ _id: new ObjectId(req.params.id) });
    if (!ninja) return res.status(404).send('Ninja non trouvé');
    res.json(ninja);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération du ninja');
  }
}

async function createNinja(req, res) {
  try {
    const { error } = ninjaSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { db } = req.app.locals;
    const newNinja = req.body;
    const result = await ninjasCollection(db).insertOne(newNinja);
    res.status(201).json({ id: result.insertedId, ...newNinja });
  } catch (err) {
    res.status(500).send('Erreur lors de la création du ninja');
  }
}

async function updateNinja(req, res) {
  const { db } = req.app.locals;
  try {
    const result = await ninjasCollection(db).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).send('Ninja non trouvé');
    res.json({ message: 'Ninja mis à jour avec succès' });
  } catch (err) {
    res.status(500).send('Erreur lors de la mise à jour du ninja');
  }
}

async function deleteNinja(req, res) {
  const { db } = req.app.locals;
  try {
    const result = await ninjasCollection(db).deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).send('Ninja non trouvé');
    res.json({ message: 'Ninja supprimé avec succès' });
  } catch (err) {
    res.status(500).send('Erreur lors de la suppression du ninja');
  }
}

module.exports = { getNinjas, getNinjasById, createNinja, updateNinja, deleteNinja };
