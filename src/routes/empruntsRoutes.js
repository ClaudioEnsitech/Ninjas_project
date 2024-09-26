const express = require('express');
const { getEmprunts, getEmpruntsById, createEmprunt, updateEmprunt, deleteEmprunt } = require('../controllers/empruntsController');

const router = express.Router();

router.get('/', getEmprunts);
router.get('/:id', getEmpruntsById);
router.post('/', createEmprunt);
router.put('/:id', updateEmprunt);
router.delete('/:id', deleteEmprunt);

module.exports = router;
