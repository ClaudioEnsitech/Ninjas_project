const express = require('express');
const {
  getEmprunts,
  getEmpruntsById,
  createEmprunt,
  updateEmprunt,
  deleteEmprunt,
} = require('../controllers/empruntsController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Emprunts
 *   description: Gestion des emprunts de rouleaux de jutsu
 */

/**
 * @swagger
 * /api/v1/emprunts:
 *   get:
 *     summary: Obtenir tous les emprunts
 *     tags: [Emprunts]
 *     responses:
 *       200:
 *         description: Liste des emprunts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   ninjaId:
 *                     type: string
 *                   jutsuScrollId:
 *                     type: string
 *                   dateEmprunt:
 *                     type: string
 *                     format: date-time
 *                   dateRetourPrévue:
 *                     type: string
 *                     format: date-time
 *                   statut:
 *                     type: string
 *                   notes:
 *                     type: string
 *       500:
 *         description: Erreur interne
 */
router.get('/', getEmprunts);

/**
 * @swagger
 * /api/v1/emprunts/{id}:
 *   get:
 *     summary: Obtenir un emprunt par son ID
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'emprunt
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informations sur un emprunt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 ninjaId:
 *                   type: string
 *                 jutsuScrollId:
 *                   type: string
 *                 dateEmprunt:
 *                   type: string
 *                   format: date-time
 *                 dateRetourPrévue:
 *                   type: string
 *                   format: date-time
 *                 statut:
 *                   type: string
 *                 notes:
 *                   type: string
 *       404:
 *         description: Emprunt non trouvé
 *       500:
 *         description: Erreur interne
 */
router.get('/:id', getEmpruntsById);

/**
 * @swagger
 * /api/v1/emprunts:
 *   post:
 *     summary: Créer un emprunt
 *     tags: [Emprunts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ninjaId:
 *                 type: string
 *               jutsuScrollId:
 *                 type: string
 *               dateEmprunt:
 *                 type: string
 *                 format: date-time
 *               dateRetourPrévue:
 *                 type: string
 *                 format: date-time
 *               statut:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Emprunt créé avec succès
 *       404:
 *         description: Données invalides
 *       500:
 *         description: Erreur lors de la création de l'emprunt
 */
router.post('/', createEmprunt);

/**
 * @swagger
 * /api/v1/emprunts/{id}:
 *   put:
 *     summary: Mettre à jour un emprunt
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'emprunt
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ninjaId:
 *                 type: string
 *               jutsuScrollId:
 *                 type: string
 *               dateEmprunt:
 *                 type: string
 *                 format: date-time
 *               dateRetourPrévue:
 *                 type: string
 *                 format: date-time
 *               statut:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Emprunt mis à jour avec succès
 *       404:
 *         description: Emprunt non trouvé
 *       500:
 *         description: Erreur interne
 */
router.put('/:id', updateEmprunt);

/**
 * @swagger
 * /api/v1/emprunts/{id}:
 *   delete:
 *     summary: Supprimer un emprunt
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'emprunt
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Emprunt supprimé avec succès
 *       404:
 *         description: Emprunt non trouvé
 *       500:
 *         description: Erreur interne
 */
router.delete('/:id', deleteEmprunt);

module.exports = router;
