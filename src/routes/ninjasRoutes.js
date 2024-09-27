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
 *     summary: Obtenir tous les ninjas avec pagination, filtrage, et tri
 *     tags: 
 *       - Ninjas
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Le numéro de page pour la pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Le nombre de ninjas par page
 *       - in: query
 *         name: rank
 *         schema:
 *           type: string
 *         description: |
 *           Filtrer par rang de ninja.
 *           Par exemple: Genin, Jonin, Kage.
 *       - in: query
 *         name: clan
 *         schema:
 *           type: string
 *         description: |
 *           Filtrer par clan.
 *           Par exemple: Uzumaki, Senju.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: rank:asc
 *         description: |
 *           Trier les résultats.
 *           Par exemple: name:asc, rank:desc.
 *     responses:
 *       200:
 *         description: Liste paginée des ninjas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ninjas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       rank:
 *                         type: string
 *                       jutsus_maîtrisés:
 *                         type: array
 *                         items:
 *                           type: string
 *                       clan:
 *                         type: string
 *                       spécialité:
 *                         type: string
 *                 total:
 *                   type: integer
 *                   description: Nombre total de ninjas
 *                 page:
 *                   type: integer
 *                   description: Page actuelle
 *                 totalPages:
 *                   type: integer
 *                   description: Nombre total de pages
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
 *       201:
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
