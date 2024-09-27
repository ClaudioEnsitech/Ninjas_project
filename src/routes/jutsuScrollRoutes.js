const express = require('express');
const {
  getJutsuScrolls,
  getJutsuScrollById,
  createJutsuScroll,
  updateJutsuScroll,
  deleteJutsuScroll,
} = require('../controllers/jutsuScrollController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: JutsuScrolls
 *   description: Gestion des rouleaux de jutsu
 */

/**
 * @swagger
 * /api/v1/jutsuScrolls:
 *   get:
 *     summary: Obtenir tous les rouleaux de jutsu avec pagination, filtrage, et tri
 *     tags: [JutsuScrolls]
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
 *         description: Le nombre de rouleaux par page
 *       - in: query
 *         name: rang
 *         schema:
 *           type: string
 *         description: |
 *           Filtrer par rang du jutsu.
 *           Par exemple: A, S.
 *       - in: query
 *         name: catégorie
 *         schema:
 *           type: string
 *         description: |
 *           Filtrer par catégorie.
 *           Par exemple: Ninjutsu, Genjutsu.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: nom:asc
 *         description: |
 *           Trier les résultats.
 *           Par exemple: nom:asc, rang:desc.
 *     responses:
 *       200:
 *         description: Liste paginée des rouleaux de jutsu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jutsuScrolls:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       nom:
 *                         type: string
 *                       créateur:
 *                         type: string
 *                       rang:
 *                         type: string
 *                       quantité:
 *                         type: integer
 *                       description:
 *                         type: string
 *                       catégorie:
 *                         type: string
 *                       techniques_associées:
 *                         type: array
 *                         items:
 *                           type: string
 *                 total:
 *                   type: integer
 *                   description: Nombre total de rouleaux de jutsu
 *                 page:
 *                   type: integer
 *                   description: Page actuelle
 *                 totalPages:
 *                   type: integer
 *                   description: Nombre total de pages
 *       500:
 *         description: Erreur interne
 */

router.get('/', getJutsuScrolls);

/**
 * @swagger
 * /api/v1/jutsuScrolls/{id}:
 *   get:
 *     summary: Obtenir un rouleau de jutsu par son ID
 *     tags: [JutsuScrolls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du rouleau de jutsu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informations sur un rouleau de jutsu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nom:
 *                   type: string
 *                 créateur:
 *                   type: string
 *                 rang:
 *                   type: string
 *                 quantité:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 catégorie:
 *                   type: string
 *                 techniques_associées:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Rouleau de jutsu non trouvé
 *       500:
 *         description: Erreur interne
 */
router.get('/:id', getJutsuScrollById);

/**
 * @swagger
 * /api/v1/jutsuScrolls:
 *   post:
 *     summary: Créer un rouleau de jutsu
 *     tags: [JutsuScrolls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               créateur:
 *                 type: string
 *               rang:
 *                 type: string
 *               quantité:
 *                 type: integer
 *               description:
 *                 type: string
 *               catégorie:
 *                 type: string
 *               techniques_associées:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Rouleau de jutsu créé avec succès
 *       404:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne
 */
router.post('/', createJutsuScroll);

/**
 * @swagger
 * /api/v1/jutsuScrolls/{id}:
 *   put:
 *     summary: Mettre à jour un rouleau de jutsu
 *     tags: [JutsuScrolls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du rouleau de jutsu
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               créateur:
 *                 type: string
 *               rang:
 *                 type: string
 *               quantité:
 *                 type: integer
 *               description:
 *                 type: string
 *               catégorie:
 *                 type: string
 *               techniques_associées:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Rouleau de jutsu mis à jour avec succès
 *       404:
 *         description: Rouleau de jutsu non trouvé
 *       500:
 *         description: Erreur interne
 */
router.put('/:id', updateJutsuScroll);

/**
 * @swagger
 * /api/v1/jutsuScrolls/{id}:
 *   delete:
 *     summary: Supprimer un rouleau de jutsu
 *     tags: [JutsuScrolls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du rouleau de jutsu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rouleau de jutsu supprimé avec succès
 *       404:
 *         description: Rouleau de jutsu non trouvé
 *       500:
 *         description: Erreur interne
 */
router.delete('/:id', deleteJutsuScroll);

module.exports = router;
