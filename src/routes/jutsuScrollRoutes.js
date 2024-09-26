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
 *     summary: Obtenir tous les rouleaux de jutsu
 *     tags: [JutsuScrolls]
 *     responses:
 *       200:
 *         description: Liste des rouleaux de jutsu
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nom:
 *                     type: string
 *                   créateur:
 *                     type: string
 *                   rang:
 *                     type: string
 *                   quantité:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   catégorie:
 *                     type: string
 *                   techniques_associées:
 *                     type: array
 *                     items:
 *                       type: string
 *       500:
 *         description: Erreur interne
 */
router.get('/', getJutsuScrolls);

/**
 * @swagger
 * /jutsuScrolls/{id}:
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
 * /jutsuScrolls:
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
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne
 */
router.post('/', createJutsuScroll);

/**
 * @swagger
 * /jutsuScrolls/{id}:
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
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne
 */
router.put('/:id', updateJutsuScroll);

/**
 * @swagger
 * /jutsuScrolls/{id}:
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
