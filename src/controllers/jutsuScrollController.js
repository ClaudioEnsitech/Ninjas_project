const { jutsuScrollsCollection } = require('../models/jutsuScroll');
const { ObjectId } = require('mongodb');
const Joi = require('joi');

// Schéma de validation pour les rouleaux de jutsu
const jutsuScrollSchema = Joi.object({
  nom: Joi.string().required(),
  créateur: Joi.string().required(),
  rang: Joi.string().valid('D', 'C', 'B', 'A', 'S').required(),
  quantité: Joi.number().integer().min(0).required(),
  description: Joi.string().required(),
  catégorie: Joi.string().required(),
  techniques_associées: Joi.array().items(Joi.string()).required()
});

async function getJutsuScrolls(req, res) {
  const { db } = req.app.locals;
  const { page = 1, limit = 10, rang, créateur, sortField = 'nom', sortOrder = 'asc' } = req.query;
  const skip = (page - 1) * limit;

  const filter = {};
  if (rang) filter.rang = rang;
  if (créateur) filter.créateur = créateur;

  try {
    const scrolls = await jutsuScrollsCollection(db)
      .find(filter)
      .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 }) 
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .toArray();

    const totalScrolls = await jutsuScrollsCollection(db).countDocuments(filter);
    
    res.json({
      apiVersion: '1.0',
      data: scrolls,
      total: totalScrolls,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des rouleaux de jutsu');
  }
}

async function getJutsuScrollById(req, res) {
  const { db } = req.app.locals;
  try {
    const scroll = await jutsuScrollsCollection(db).findOne({ _id: new ObjectId(req.params.id) });
    if (!scroll) return res.status(404).send('JutsuScroll non trouvé');
    res.json(scroll);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération du JutsuScroll');
  }
}

async function createJutsuScroll(req, res) {
  try {
    const { error } = jutsuScrollSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { db } = req.app.locals;
    const newScroll = req.body;
    const result = await jutsuScrollsCollection(db).insertOne(newScroll);
    res.status(201).json({ id: result.insertedId, ...newScroll });
  } catch (err) {
    res.status(500).send('Erreur lors de la création du JutsuScroll');
  }
}

async function updateJutsuScroll(req, res) {
  const { db } = req.app.locals;
  try {
    const result = await jutsuScrollsCollection(db).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).send('JutsuScroll non trouvé');
    res.json({ message: 'JutsuScroll mis à jour avec succès' });
  } catch (err) {
    res.status(500).send('Erreur lors de la mise à jour du JutsuScroll');
  }
}

async function deleteJutsuScroll(req, res) {
  const { db } = req.app.locals;
  try {
    const result = await jutsuScrollsCollection(db).deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).send('JutsuScroll non trouvé');
    res.json({ message: 'JutsuScroll supprimé avec succès' });
  } catch (err) {
    res.status(500).send('Erreur lors de la suppression du JutsuScroll');
  }
}

module.exports = { getJutsuScrolls, getJutsuScrollById, createJutsuScroll, updateJutsuScroll, deleteJutsuScroll };
