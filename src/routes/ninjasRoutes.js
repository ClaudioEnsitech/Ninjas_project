const express = require('express');
const { getNinjas, getNinjasById, createNinja, updateNinja, deleteNinja } = require('../controllers/ninjasController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ninjas
 *   description: Gestion des ninjas
 */

/**
 * @swagger
 * /api/v1/ninjas:
 *   get:
 *     summary: Obtenir tous les ninjas
 *     tags: [Ninjas]
 *     responses:
 *       200:
 *         description: Liste des ninjas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   rank:
 *                     type: string
 *                   jutsus_maîtrisés:
 *                     type: array
 *                     items:
 *                       type: string
 *                   clan:
 *                     type: string
 * 
 *                   spécialité:
 *                     type: string
 *       500:
 *         description: Erreur interne
 */
router.get('/', getNinjas);

/**
 * @swagger
 * /api/v1/ninjas/{id}:
 *   get:
 *     summary: Obtenir un ninja par son ID
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du ninja
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informations sur le ninja
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 rank:
 *                   type: string
 *                 jutsus_maîtrisés:
 *                   type: array
 *                   items:
 *                     type: string
 *                 clan:
 *                   type: string
 *                 spécialité:
 *                   type: string
 *       404:
 *         description: Ninja non trouvé
 *       500:
 *         description: Erreur interne
 */
router.get('/:id', getNinjasById);

/**
 * @swagger
 * /api/v1/ninjas:
 *   post:
 *     summary: Créer un nouveau ninja
 *     tags: [Ninjas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               rank:
 *                 type: string
 *               jutsus_maîtrisés:
 *                 type: array
 *                 items:
 *                   type: string
 *               clan:
 *                 type: string
 *               spécialité:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ninja créé avec succès
 *       404:
 *         description: Données invalides
 *       500:
 *         description: Erreur lors de la création du ninja
 */
router.post('/', createNinja);

/**
 * @swagger
 * /api/v1/ninjas/{id}:
 *   put:
 *     summary: Mettre à jour un ninja
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du ninja
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               rank:
 *                 type: string
 *               jutsus_maîtrisés:
 *                 type: array
 *                 items:
 *                   type: string
 *               clan:
 *                 type: string
 *               spécialité:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ninja mis à jour avec succès
 *       404:
 *         description: Ninja non trouvé
 *       500:
 *         description: Erreur interne
 */
router.put('/:id', updateNinja);

/**
 * @swagger
 * /api/v1/ninjas/{id}:
 *   delete:
 *     summary: Supprimer un ninja
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du ninja
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ninja supprimé avec succès
 *       404:
 *         description: Ninja non trouvé
 *       500:
 *         description: Erreur interne
 */
router.delete('/:id', deleteNinja);

module.exports = router;
