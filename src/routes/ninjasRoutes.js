const express = require('express');
const { getNinjas, getNinjasById, createNinja, updateNinja, deleteNinja } = require('../controllers/ninjasController');

const router = express.Router();

router.get('/', getNinjas);
router.get('/:id', getNinjasById);
router.post('/', createNinja);
router.put('/:id', updateNinja);
router.delete('/:id', deleteNinja);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Ninjas
 *   description: Gestion des ninjas
 */

/**
 * @swagger
 * /ninjas:
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
 *       500:
 *         description: Erreur interne
 */
router.get('/', getNinjas);

/**
 * @swagger
 * /ninjas:
 *   post:
 *     summary: Créer un ninja
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
 *     responses:
 *       201:
 *         description: Ninja créé
 *       500:
 *         description: Erreur interne
 */
router.post('/', createNinja);
